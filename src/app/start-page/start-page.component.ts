import {Component, HostListener, OnDestroy} from '@angular/core';
import {Subscription} from 'rxjs';
import * as debounce from 'lodash.debounce';

import {GameService} from '../../services/game.service';
import {GameData, SquareOptions} from '../../constants/game';

@Component({
  selector: 'app-start-page',
  templateUrl: './start-page.component.html',
  styleUrls: ['./start-page.component.scss']
})
export class StartPageComponent implements OnDestroy {
  public newGameSub: Subscription;
  public currentGameData: GameData;
  public squareOptionsEnum = SquareOptions;

  public hideCursorTimerTimeout: ReturnType<typeof setTimeout>;

  public startPageOpen = true;

  public startPage = {
    rowCountInput: null as string,
    columnCountInput: null as string,
    startInputsErrorMessage: null as string,
  };

  constructor(private gameService: GameService) {
    this.newGameSub = this.gameService.newGame$.subscribe((newGameData) => {
      this.currentGameData = newGameData;
    });
  }

  gameCellMouseLeave = debounce(() => {
    this.currentGameData.hoverCursor.x = null;
    this.currentGameData.hoverCursor.y = null;
  }, 35);

  gameCellMouseEnter(colIndex, rowIndex) {
    this.gameCellMouseLeave.cancel();
    this.currentGameData.hoverCursor.y = rowIndex;
    this.currentGameData.hoverCursor.x = colIndex;
  }

  ngOnDestroy(): void {
    this.newGameSub.unsubscribe();
  }

  @HostListener('document:keydown', ['$event'])
  keyPress(event: KeyboardEvent) {
    if (this.currentGameData) {
      const hoverCursorX = this.currentGameData.hoverCursor.x;
      const hoverCursorY = this.currentGameData.hoverCursor.y;
      const keyboardCursorX = this.currentGameData.keyboardCursor.x;
      const keyboardCursorY = this.currentGameData.keyboardCursor.y;

      if (hoverCursorX !== null && hoverCursorY !== null) {
        if (event.code === 'KeyZ') {
          this.gameCellClick(this.getSquareProps(hoverCursorX, hoverCursorY));
        } else if (event.code === 'KeyX') {
          this.gameCellRightClick(this.getSquareProps(hoverCursorX, hoverCursorY));
        } else if (event.code === 'KeyC') {
          this.gameCellMiddleClick(this.getSquareProps(hoverCursorX, hoverCursorY));
        }
      }

      if (!this.currentGameData.keyboardCursor.hidden) {
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

      if (event.code === 'ArrowRight') {
        this.moveKeyboardCursor('right');
      } else if (event.code === 'ArrowDown') {
        this.moveKeyboardCursor('down');
      } else if (event.code === 'ArrowLeft') {
        this.moveKeyboardCursor('left');
      } else if (event.code === 'ArrowUp') {
        this.moveKeyboardCursor('up');
      }
    }
  }

  keyPressAnyKeyboardControl(eventCode) {
    return ['ArrowRight', 'ArrowLeft', 'ArrowDown', 'ArrowUp', 'KeyA', 'KeyS', 'KeyD'].includes(eventCode);
  }

  moveKeyboardCursor(direction: string) {
    if (direction === 'right' && this.currentGameData.cols - 1 !== this.currentGameData.keyboardCursor.x) {
      this.currentGameData.keyboardCursor.x++;
    } else if (direction === 'left' && this.currentGameData.keyboardCursor.x !== 0) {
      this.currentGameData.keyboardCursor.x--;
    } else if (direction === 'down' && this.currentGameData.rows - 1 !== this.currentGameData.keyboardCursor.y) {
      this.currentGameData.keyboardCursor.y++;
    } else if (direction === 'up' && this.currentGameData.keyboardCursor.y !== 0) {
      this.currentGameData.keyboardCursor.y--;
    }

    this.showKeyboardCursor();
  }

  getSquareProps(colIndex: number, rowIndex: number) {
    try {
      return this.currentGameData.squareProperties[rowIndex][colIndex];
    } catch (e) {
      console.error(e);
      return null;
    }
  }

  showKeyboardCursor() {
    if (this.currentGameData.keyboardCursor.hidden) {
      this.currentGameData.keyboardCursor.hidden = false;

      clearTimeout(this.hideCursorTimerTimeout);
      this.hideCursorTimerTimeout = null;

      this.hideCursorTimerTimeout = setTimeout(() => {
        this.currentGameData.keyboardCursor.hidden = true;

      }, 20000);
    }
  }

  gameCellClick(squareProps): void {
    if ([SquareOptions.Selected, SquareOptions.Crossed].includes(squareProps.currentSelectionType)) {
      squareProps.currentSelectionType = null;
    } else if ([null, SquareOptions.Marked, SquareOptions.Error].includes(squareProps.currentSelectionType)) {
      if (this.currentGameData.assist && !squareProps.squareSolution) {
        squareProps.currentSelectionType = SquareOptions.Error;
      } else {
        squareProps.currentSelectionType = SquareOptions.Selected;
      }
    }

    // check if solved
    for (const row of this.currentGameData.squareProperties) {
      for (const cell of row) {
        if (
          (!cell.squareSolution && cell.currentSelectionType === SquareOptions.Selected) ||
          (cell.squareSolution && cell.currentSelectionType !== SquareOptions.Selected)) {
          this.currentGameData.solved = false;
          return;
        }
      }
    }

    this.currentGameData.solved = true;
  }

  gameCellMiddleClick(squareProps): void {
    if (![SquareOptions.Selected, SquareOptions.Crossed].includes(squareProps.currentSelectionType)) {
      if (squareProps.currentSelectionType === null) {
        squareProps.currentSelectionType = SquareOptions.Marked;
      } else {
        squareProps.currentSelectionType = null;
      }
    }
  }

  gameCellRightClick(squareProps): void {
    if ([SquareOptions.Selected, SquareOptions.Crossed].includes(squareProps.currentSelectionType)) {
      squareProps.currentSelectionType = null;
    } else if ([SquareOptions.Marked, null, SquareOptions.Error].includes(squareProps.currentSelectionType)) {
      if (this.currentGameData.assist && squareProps.squareSolution) {
        squareProps.currentSelectionType = SquareOptions.Error;
      } else {
        squareProps.currentSelectionType = SquareOptions.Crossed;
      }
    }
  }

  getBackgroundColor(squareProps, rowIndex) {
    if (squareProps.currentSelectionType === SquareOptions.Selected) {
      return '#0079B8';
    } else {
      if (rowIndex % 2 === 0) {
        return '#B7C5CE';
      }
      return '#919FA8';
    }
  }

  checkIfSolved() {
    for (const squarePropsRow of this.currentGameData.squareProperties) {
      for (const squareProps of squarePropsRow) {
        if (squareProps.currentSelectionType === SquareOptions.Selected && squareProps.squareSolution !== true) {
          return false;
        }
      }
    }

    return true;
  }

  getCellBorderColor(colIndex: number, rowIndex: number): string {
    // Hover color takes precedence over keyboard color
    if (
      this.currentGameData.hoverCursor.x === colIndex &&
      this.currentGameData.hoverCursor.y === rowIndex
    ) {
      return '#cd3517';
    }

    if (
      this.currentGameData.keyboardCursor.x === colIndex &&
      this.currentGameData.keyboardCursor.y === rowIndex &&
      !this.currentGameData.keyboardCursor.hidden
    ) {
      return '#aa4500';
    }

    return '#000000';
  }

  getTopNumberCellBackgroundImage(colIndex: number): string {
    if (this.currentGameData.hoverCursor.x === colIndex) {
      return 'linear-gradient(to bottom, rgba(205,53,23,0), rgba(205,53,23,1))';
    } else if (!this.currentGameData.keyboardCursor.hidden && this.currentGameData.keyboardCursor.x === colIndex) {
      return 'linear-gradient(to bottom, rgba(170,69,0,0), rgba(170,69,0,1))';
    } else {
      return 'linear-gradient(to bottom, rgba(37,51,61,0), rgba(37,51,61,1))';
    }
  }

  getLeftNumberCellBackgroundImage(rowIndex: number): string {
    if (this.currentGameData.hoverCursor.y === rowIndex) {
      return 'linear-gradient(to right, rgba(205,53,23,0), rgba(205,53,23,1))';
    } else if (!this.currentGameData.keyboardCursor.hidden && this.currentGameData.keyboardCursor.y === rowIndex) {
      return 'linear-gradient(to right, rgba(170,69,0,0), rgba(170,69,0,1))';
    } else {
      return 'linear-gradient(to right, rgba(37,51,61,0), rgba(37,51,61,1))';
    }
  }

  getGameCellImageSrc(squareProps): string {
    if (squareProps.currentSelectionType === SquareOptions.Marked) {
      return 'assets/baseline-help_outline-24px.svg';
    } else if (squareProps.currentSelectionType === SquareOptions.Crossed) {
      return 'assets/baseline-clear-24px.svg';
    } else if (squareProps.currentSelectionType === SquareOptions.Error) {
      return 'assets/baseline-highlight_off-24px.svg';
    }
  }

  assistToggle(): void {
    // If we are toggling it on, do a check on all cells
    // Otherwise remove all error tagged squares

    for (const squarePropsRow of this.currentGameData.squareProperties) {
      for (const squareProps of squarePropsRow) {
        if (!this.currentGameData.assist) {
          if ((squareProps.currentSelectionType === SquareOptions.Selected && squareProps.squareSolution !== true) ||
            (squareProps.currentSelectionType === SquareOptions.Crossed && squareProps.squareSolution !== false)) {
            squareProps.currentSelectionType = SquareOptions.Error;
          }
        } else {
          if (squareProps.currentSelectionType === SquareOptions.Error) {
            squareProps.currentSelectionType = null;
          }
        }
      }
    }

    this.currentGameData.assist = !this.currentGameData.assist;
  }

  startClick(): void {
    const colCountInt = parseInt(this.startPage.columnCountInput, 10);
    const rowCountInt = parseInt(this.startPage.rowCountInput, 10);

    const checkValid = (countInput: number, minValue: number, maxValue: number, typeStr: string): boolean => {
      const generalError = ` input must be a whole number greater than or equal to ${minValue} and less than or equal to ${maxValue}`;
      const lessThanError = ` input must be greater than or equal to ${minValue}`;
      const greaterThanError = ` input must be less than or equal to ${maxValue}`;

      if (!Number.isInteger(colCountInt)) {
        this.startPage.startInputsErrorMessage = `${typeStr} ${generalError}`;
      } else if (colCountInt < minValue) {
        this.startPage.startInputsErrorMessage = `${typeStr} ${lessThanError}`;
      } else if (colCountInt > maxValue) {
        this.startPage.startInputsErrorMessage = `${typeStr} ${greaterThanError}`;
      } else {
        this.startPage.startInputsErrorMessage = null;
      }

      return this.startPage.startInputsErrorMessage === null;
    };

    if (!checkValid(rowCountInt, 1, 20, 'Row')) {
      return;
    } else if (!checkValid(colCountInt, 1, 20, 'Column')) {
      return;
    }

    this.startPageOpen = false;
    this.gameService.newGame(
      parseInt(this.startPage.columnCountInput, 10),
      parseInt(this.startPage.rowCountInput, 10)
    );
  }
}
