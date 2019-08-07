import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject, timer } from 'rxjs';
import { debounce as rxjsDebounce } from 'rxjs/operators';
import { debounce, get, map, set, throttle, unzip } from 'lodash';

import { msTimeFormat } from '../utils/utils';
import { GameData, KeyboardMove, SquareOptions, GAME_SERVICE_TICK, DisplayNumber } from '../constants/game';

@Injectable({
  providedIn: 'root',
})
export class GameService {
  private timerInterval: number = null;

  private gameData: GameData;
  private savedGameDataStorageKey = 'savedGameData';

  private gameSub = new BehaviorSubject<GameData>(null);
  public game$ = this.gameSub.asObservable().pipe(rxjsDebounce(() => timer(GAME_SERVICE_TICK)));

  private assistSub = new Subject<boolean>();
  public assist$ = this.assistSub.asObservable();

  private webWorkerSupported = true;
  private checkRowColNumberWorker: Worker = null;

  gameCellMouseLeave = debounce(() => {
    this.gameData.hoverCursor.x = null;
    this.gameData.hoverCursor.y = null;
    this.gameStateChange();
  }, 35);

  constructor() {
    if (typeof Worker === 'undefined') {
      this.webWorkerSupported = false;
    }

    // Start worker to update display number color on row/col "solved"
    // ref this.checkIfRowOrColNumbersSolved
    // If web workers aren't supported, disable feature
    if (this.webWorkerSupported) {
      this.checkRowColNumberWorker = new Worker('../workers/check-row-col-number-solved.worker', { type: 'module' });
      this.checkRowColNumberWorker.onmessage = ({ data }) => {
        this.gameData.rowNumbers = data.rowDisplayNumbers;
        this.gameData.colNumbers = data.colDisplayNumbers;

        this.gameStateChange();
      };
    }

    this.startTimer();

    try {
      const loadedGameData: GameData = JSON.parse(localStorage.getItem(this.savedGameDataStorageKey));

      if (loadedGameData) {
        // We can't just load the data, we have to also update the timer
        set(
          loadedGameData,
          'timer.startTime',
          Date.now() - get(loadedGameData, 'timer.msElapsed', 0)
        );

        set(
          loadedGameData,
          'timer.formattedTime',
          msTimeFormat(get(loadedGameData, 'timer.msElapsed', 0))
        );

        this.gameData = loadedGameData;

        if (get(loadedGameData, 'everSolved', false)) {
          this.stopTimer();
        }

        this.gameStateChange();
      }
    } catch (ex) {
      this.clearGameData();
    }
  }

  saveGame = throttle(() => {
    localStorage.setItem(this.savedGameDataStorageKey, JSON.stringify(this.gameData));
  }, 1000);

  clearGameData() {
    this.gameData = null;
    localStorage.removeItem(this.savedGameDataStorageKey);
    this.gameSub.next(this.gameData);
  }

  gameStateChange(saveGame = true) {
    if (saveGame) {
      this.saveGame();
    }

    this.assistSub.next(this.gameData.assist);
    this.gameSub.next(this.gameData);
  }

  // Assuming it is properly formatted, with 2d array of only 1 (filled) or 0 (not filled)
  newGameFromImport(importData: number[][]) {
    const newGame: GameData = this.createNewGame();

    newGame.rows = importData.length;
    newGame.cols = importData[0].length;
    newGame.gameSquare = importData.map((row) => {
      return map(row, col => {
        return { squareSolution: col, currentSelectionType: null };
      });
    });

    newGame.rowNumbers =
      newGame.gameSquare.map((row) => {
        return this.generateDisplayNumbers(...row.map(col => col.squareSolution));
      });

    newGame.colNumbers =
      unzip(newGame.gameSquare).map((col) => {
        return this.generateDisplayNumbers(...col.map(row => row.squareSolution));
      });

    this.gameData = newGame;
    this.gameStateChange();
  }

  newGame(cols: number, rows: number, assist: boolean = false): void {
    const newGame: GameData = this.createNewGame(cols, rows, assist);

    const newGameSquareProperties = [];

    // There must be at least one gameSquare filled in
    let anySquareASolution = false;

    newGame.rowNumbers = [];
    for (let i = 0; i < rows; i++) {
      const row = [];
      for (let j = 0; j < cols; j++) {
        let squareSolution = Math.random() < .5;

        if (squareSolution) {
          anySquareASolution = true;
        }

        if (!anySquareASolution && i === rows - 1 && j === cols - 1) {
          squareSolution = true;
        }

        row.push({
          squareSolution,
          currentSelectionType: null
        });
      }

      newGame.rowNumbers.push(this.generateDisplayNumbers(...row.map(r => r.squareSolution)));
      newGameSquareProperties.push(row);
    }

    newGame.colNumbers = [];
    for (let i = 0; i < newGameSquareProperties[0].length; i++) {
      const colArr = [];

      newGameSquareProperties.forEach((row) => {
        colArr.push(row[i].squareSolution);
      });

      newGame.colNumbers.push(this.generateDisplayNumbers(...colArr));
    }

    newGame.gameSquare = newGameSquareProperties;

    this.gameData = newGame;
    this.startTimer();
    this.gameStateChange();
  }

  createNewGame(cols?: number, rows?: number, assist: boolean = false): GameData {
    return {
      rows,
      cols,
      gameSquare: [[]],
      colNumbers: [[]],
      rowNumbers: [[]],
      hoverCursor: {
        x: null,
        y: null,
      },
      keyboardCursor: {
        x: 0,
        y: 0,
        hidden: true,
        hideCursorTimerTimeout: null,
      },
      solved: false,
      everSolved: false,
      assist: !!assist,
      timer: {
        startTime: Date.now(),
        msElapsed: 0,
        formattedTime: '00:00:00',
      },
    };
  }

  generateDisplayNumbers(...values: boolean[]): DisplayNumber[] {
    const numbers: DisplayNumber[] = [];

    let counting = false;
    values.forEach((cell) => {
      if (cell) {
        if (!counting) {
          counting = true;
          numbers.push({
            value: 1,
            solved: false,
          });
        } else {
          numbers[numbers.length - 1].value++;
        }
      } else {
        if (counting) {
          counting = false;
        }
      }
    });

    return numbers;
  }

  gameCellClick(rowIndex: number, colIndex: number): void {
    const squareProps = this.getSquareProps(rowIndex, colIndex);

    if ([SquareOptions.Selected, SquareOptions.Crossed].includes(squareProps.currentSelectionType)) {
      squareProps.currentSelectionType = null;
    } else if ([null, SquareOptions.Marked, SquareOptions.Error].includes(squareProps.currentSelectionType)) {
      if (this.gameData.assist && !squareProps.squareSolution) {
        squareProps.currentSelectionType = SquareOptions.Error;
      } else {
        squareProps.currentSelectionType = SquareOptions.Selected;
      }
    }

    this.checkIfRowOrColNumbersSolved({ rowIndex, colIndex });

    this.checkIfSolved();
    this.gameStateChange();
  }

  startTimer(): void {
    if (this.timerInterval === null) {
      this.timerInterval = setInterval(() => {
        if (this.gameData) {
          const newMsElapsed = this.gameData.timer.msElapsed = Date.now() - this.gameData.timer.startTime;
          this.gameData.timer.msElapsed = newMsElapsed;
          this.gameData.timer.formattedTime = msTimeFormat(newMsElapsed);
          this.gameStateChange();
        }
      }, 125);
    }
  }

  stopTimer(): void {
    clearInterval(this.timerInterval);
    this.timerInterval = null;
  }

  checkIfSolved(): void {
    // check if solved
    for (const row of this.gameData.gameSquare) {
      for (const cell of row) {
        if (
          (!cell.squareSolution && cell.currentSelectionType === SquareOptions.Selected) ||
          (cell.squareSolution && cell.currentSelectionType !== SquareOptions.Selected)) {
          this.gameData.solved = false;
          return;
        }
      }
    }

    this.gameData.solved = true;
    this.gameData.everSolved = true;
    this.stopTimer(); // Stop timer after puzzle solve
  }

  gameCellMiddleClick(rowIndex: number, colIndex: number): void {
    const squareProps = this.getSquareProps(rowIndex, colIndex);

    if (![SquareOptions.Selected, SquareOptions.Crossed].includes(squareProps.currentSelectionType)) {
      if (squareProps.currentSelectionType === null) {
        squareProps.currentSelectionType = SquareOptions.Marked;
      } else {
        squareProps.currentSelectionType = null;
      }
    }
    this.gameStateChange();
  }

  gameCellRightClick(rowIndex: number, colIndex: number): void {
    const squareProps = this.getSquareProps(rowIndex, colIndex);

    if ([SquareOptions.Selected, SquareOptions.Crossed].includes(squareProps.currentSelectionType)) {
      squareProps.currentSelectionType = null;
    } else if ([SquareOptions.Marked, null, SquareOptions.Error].includes(squareProps.currentSelectionType)) {
      if (this.gameData.assist && squareProps.squareSolution) {
        squareProps.currentSelectionType = SquareOptions.Error;
      } else {
        squareProps.currentSelectionType = SquareOptions.Crossed;
      }
    }

    this.checkIfRowOrColNumbersSolved({ rowIndex, colIndex });
    this.gameStateChange();
  }

  gameCellMouseEnter(rowIndex: number, colIndex: number): void {
    this.gameCellMouseLeave.cancel();
    this.gameData.hoverCursor.y = rowIndex;
    this.gameData.hoverCursor.x = colIndex;
    this.gameStateChange();
  }

  showKeyboardCursor() {
    if (this.gameData.keyboardCursor.hidden) {
      this.gameData.keyboardCursor.hidden = false;

      clearTimeout(this.gameData.keyboardCursor.hideCursorTimerTimeout);
      this.gameData.keyboardCursor.hideCursorTimerTimeout = null;

      this.gameData.keyboardCursor.hideCursorTimerTimeout = setTimeout(() => {
        this.gameData.keyboardCursor.hidden = true;
        this.gameStateChange();
      }, 20000);
      this.gameStateChange();
    }
  }

  moveKeyboardCursor(direction: KeyboardMove): void {
    // Move keyboard cursor, rollover
    if (direction === KeyboardMove.Right) {
      if (this.gameData.cols - 1 === this.gameData.keyboardCursor.x) {
        this.gameData.keyboardCursor.x = 0;
      } else {
        this.gameData.keyboardCursor.x++;
      }
    } else if (direction === KeyboardMove.Left) {
      if (this.gameData.keyboardCursor.x === 0) {
        this.gameData.keyboardCursor.x = this.gameData.cols - 1;
      } else {
        this.gameData.keyboardCursor.x--;
      }
    } else if (direction === KeyboardMove.Down) {
      if (this.gameData.rows - 1 === this.gameData.keyboardCursor.y) {
        this.gameData.keyboardCursor.y = 0;
      } else {
        this.gameData.keyboardCursor.y++;
      }
    } else if (direction === KeyboardMove.Up) {
      if (this.gameData.keyboardCursor.y === 0) {
        this.gameData.keyboardCursor.y = this.gameData.rows - 1;
      } else {
        this.gameData.keyboardCursor.y--;
      }
    }

    this.showKeyboardCursor();
    this.gameStateChange();
  }

  keyPress(event: KeyboardEvent): void {
    if (this.gameData) {
      const hoverCursorX = this.gameData.hoverCursor.x;
      const hoverCursorY = this.gameData.hoverCursor.y;
      const keyboardCursorX = this.gameData.keyboardCursor.x;
      const keyboardCursorY = this.gameData.keyboardCursor.y;

      if (hoverCursorX !== null && hoverCursorY !== null) {
        if (event.code === 'KeyZ') {
          this.gameCellClick(hoverCursorY, hoverCursorX);
        } else if (event.code === 'KeyX') {
          this.gameCellRightClick(hoverCursorY, hoverCursorX);
        } else if (event.code === 'KeyC') {
          this.gameCellMiddleClick(hoverCursorY, hoverCursorX);
        }
      }

      if (!this.gameData.keyboardCursor.hidden) {
        if (event.code === 'KeyA') {
          this.gameCellClick(keyboardCursorY, keyboardCursorX);
        } else if (event.code === 'KeyS') {
          this.gameCellRightClick(keyboardCursorY, keyboardCursorX);
        } else if (event.code === 'KeyD') {
          this.gameCellMiddleClick(keyboardCursorY, keyboardCursorX);
        }
      } else if (this.keyPressAnyKeyboardControl(event.code)) {
        this.showKeyboardCursor();
      }

      if (event.code === KeyboardMove.Right) {
        this.moveKeyboardCursor(KeyboardMove.Right);
      } else if (event.code === KeyboardMove.Down) {
        this.moveKeyboardCursor(KeyboardMove.Down);
      } else if (event.code === KeyboardMove.Left) {
        this.moveKeyboardCursor(KeyboardMove.Left);
      } else if (event.code === KeyboardMove.Up) {
        this.moveKeyboardCursor(KeyboardMove.Up);
      }
    }
  }

  keyPressAnyKeyboardControl(eventCode: string): boolean {
    return [KeyboardMove.Right, KeyboardMove.Left, KeyboardMove.Down, KeyboardMove.Up, 'KeyA', 'KeyS', 'KeyD'].includes(eventCode);
  }

  getSquareProps(rowIndex: number, colIndex: number) {
    try {
      return this.gameData.gameSquare[rowIndex][colIndex];
    } catch (e) {
      console.error(e);
      return null;
    }
  }

  // rowIndex and colIndex are both optional - if both are null/undefined, will check entire game
  // "Solved" is a bit of a misnomer, as it doesn't actually indicate if the correct squares are solved
  checkIfRowOrColNumbersSolved(
    { rowIndex, colIndex }: { rowIndex?: number, colIndex?: number } = { rowIndex: null, colIndex: null}
  ) {

    if (this.webWorkerSupported && this.checkRowColNumberWorker) {
      this.checkRowColNumberWorker.postMessage({
        colIndex,
        rowIndex,
        gameSquares: this.gameData.gameSquare,
        colDisplayNumbers: this.gameData.colNumbers,
        rowDisplayNumbers: this.gameData.rowNumbers
      });
    }

    this.gameStateChange();
  }

  assistToggle(): void {
    // If we are toggling it on, do a check on all cells
    // Otherwise remove all error tagged squares

    for (const squarePropsRow of this.gameData.gameSquare) {
      for (const squareProps of squarePropsRow) {
        if (!this.gameData.assist) {
          if ((squareProps.currentSelectionType === SquareOptions.Selected && !squareProps.squareSolution) ||
            (squareProps.currentSelectionType === SquareOptions.Crossed && squareProps.squareSolution)) {
            squareProps.currentSelectionType = SquareOptions.Error;
          }
        } else {
          if (squareProps.currentSelectionType === SquareOptions.Error) {
            squareProps.currentSelectionType = null;
          }
        }
      }
    }

    // Update if display numbers are marked as solved
    this.checkIfRowOrColNumbersSolved();

    this.checkIfSolved();

    this.gameData.assist = !this.gameData.assist;
    this.assistSub.next(this.gameData.assist);
    this.gameStateChange();
  }
}
