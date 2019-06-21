import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';
import { debounce, map, unzip } from 'lodash';

import { GameData, GameSquare, KeyboardMove, SquareOptions } from '../constants/game';

@Injectable({
  providedIn: 'root',
})
export class GameService {
  private gameData: GameData;
  private savedGameDataStorageKey = 'savedGameData';

  private gameSub = new BehaviorSubject<GameData>(null);
  public game$ = this.gameSub.asObservable();

  private assistSub = new Subject<boolean>();
  public assist$ = this.assistSub.asObservable();

  gameCellMouseLeave = debounce(() => {
    this.gameData.hoverCursor.x = null;
    this.gameData.hoverCursor.y = null;
    this.gameStateChange();
  }, 35);

  constructor() {
    try {
      const loadedGameData = JSON.parse(localStorage.getItem(this.savedGameDataStorageKey));

      if (loadedGameData) {
        this.gameData = loadedGameData;
        this.gameStateChange();
      }
    } catch (ex) {
      this.clearGameData();
    }
  }

  saveGame = debounce(() => {
    localStorage.setItem(this.savedGameDataStorageKey, JSON.stringify(this.gameData));
  }, 500);

  clearGameData() {
    this.gameData = null;
    localStorage.removeItem(this.savedGameDataStorageKey);
    this.gameSub.next(this.gameData);
  }

  gameStateChange() {
    this.saveGame();
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

    // TODO: SET COL NUMS, ROW NUMS, UPDATE GAME DATA, CALL STATE CHANGE

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

  newGame(cols: number, rows: number): void {
    const newGame: GameData = this.createNewGame(cols, rows);

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

      newGame.rowNumbers.push(this.generateDisplayNumbers(...row.map(r => r.squareSolution).reverse()));
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
    this.gameStateChange();
  }

  createNewGame(cols?: number, rows?: number): GameData {
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
      assist: false,
    };
  }

  generateDisplayNumbers(...values: boolean[]) {
    const numbers = [];

    let counting = false;
    values.forEach((cell) => {
      if (cell) {
        if (counting === false) {
          counting = true;
          numbers.push(1);
        } else {
          numbers[numbers.length - 1]++;
        }
      } else {
        if (counting === true) {
          counting = false;
        }
      }
    });

    return numbers;
  }

  gameCellClick(squareProps: GameSquare): void {
    if ([SquareOptions.Selected, SquareOptions.Crossed].includes(squareProps.currentSelectionType)) {
      squareProps.currentSelectionType = null;
    } else if ([null, SquareOptions.Marked, SquareOptions.Error].includes(squareProps.currentSelectionType)) {
      if (this.gameData.assist && !squareProps.squareSolution) {
        squareProps.currentSelectionType = SquareOptions.Error;
      } else {
        squareProps.currentSelectionType = SquareOptions.Selected;
      }
    }

    this.checkIfSolved();
    this.gameStateChange();
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
  }

  gameCellMiddleClick(squareProps: GameSquare): void {
    if (![SquareOptions.Selected, SquareOptions.Crossed].includes(squareProps.currentSelectionType)) {
      if (squareProps.currentSelectionType === null) {
        squareProps.currentSelectionType = SquareOptions.Marked;
      } else {
        squareProps.currentSelectionType = null;
      }
    }
    this.gameStateChange();
  }

  gameCellRightClick(squareProps: GameSquare): void {
    if ([SquareOptions.Selected, SquareOptions.Crossed].includes(squareProps.currentSelectionType)) {
      squareProps.currentSelectionType = null;
    } else if ([SquareOptions.Marked, null, SquareOptions.Error].includes(squareProps.currentSelectionType)) {
      if (this.gameData.assist && squareProps.squareSolution) {
        squareProps.currentSelectionType = SquareOptions.Error;
      } else {
        squareProps.currentSelectionType = SquareOptions.Crossed;
      }
    }
    this.gameStateChange();
  }

  gameCellMouseEnter(colIndex: number, rowIndex: number): void {
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

  keyPress(event: KeyboardEvent) {
    if (this.gameData) {
      const hoverCursorX = this.gameData.hoverCursor.x;
      const hoverCursorY = this.gameData.hoverCursor.y;
      const keyboardCursorX = this.gameData.keyboardCursor.x;
      const keyboardCursorY = this.gameData.keyboardCursor.y;

      if (hoverCursorX !== null && hoverCursorY !== null) {
        if (event.code === 'KeyZ') {
          this.gameCellClick(this.getSquareProps(hoverCursorX, hoverCursorY));
        } else if (event.code === 'KeyX') {
          this.gameCellRightClick(this.getSquareProps(hoverCursorX, hoverCursorY));
        } else if (event.code === 'KeyC') {
          this.gameCellMiddleClick(this.getSquareProps(hoverCursorX, hoverCursorY));
        }
      }

      if (!this.gameData.keyboardCursor.hidden) {
        if (event.code === 'KeyA') {
          this.gameCellClick(this.getSquareProps(keyboardCursorX, keyboardCursorY));
        } else if (event.code === 'KeyS') {
          this.gameCellRightClick(this.getSquareProps(keyboardCursorX, keyboardCursorY));
        } else if (event.code === 'KeyD') {
          this.gameCellMiddleClick(this.getSquareProps(keyboardCursorX, keyboardCursorY));
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

  getSquareProps(colIndex: number, rowIndex: number) {
    try {
      return this.gameData.gameSquare[rowIndex][colIndex];
    } catch (e) {
      console.error(e);
      return null;
    }
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

    this.checkIfSolved();

    this.gameData.assist = !this.gameData.assist;
    this.assistSub.next(this.gameData.assist);
    this.gameStateChange();
  }
}
