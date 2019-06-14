import {Component, HostListener, OnDestroy} from '@angular/core';
import {Subscription} from 'rxjs';

import {fadeAnimation} from '../../animations/animations';
import {GameService} from '../../services/game.service';
import {GameData, SquareOptions} from '../../constants/game';

@Component({
  selector: 'app-start-page',
  templateUrl: './start-page.component.html',
  styleUrls: ['./start-page.component.scss'],
  animations: [fadeAnimation]
})
export class StartPageComponent implements OnDestroy {
  public newGameSub: Subscription;
  public currentGameData: GameData;
  public squareOptionsEnum = SquareOptions;

  public hideCursorTimerTimeout: ReturnType<typeof setTimeout>;

  public startPageOpen = true;
  public rowCount: string;
  public columnCount: string;

  constructor(private gameService: GameService) {
    this.newGameSub = this.gameService.newGame$.subscribe((newGameData) => {
      this.currentGameData = newGameData;
    });
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
      } else {
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
    } else if (squareProps.currentSelectionType === null || squareProps.currentSelectionType === SquareOptions.Marked) {
      squareProps.currentSelectionType = SquareOptions.Selected;
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
    } else if (squareProps.currentSelectionType === null || squareProps.currentSelectionType === SquareOptions.Marked) {
      squareProps.currentSelectionType = SquareOptions.Crossed;
    }
  }

  gameCellMouseEnter(colIndex, rowIndex) {
    this.currentGameData.hoverCursor.y = rowIndex;
    this.currentGameData.hoverCursor.x = colIndex;
  }

  gameCellMouseLeave() {
    this.currentGameData.hoverCursor.x = null;
    this.currentGameData.hoverCursor.y = null;
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
    for (let i = 0; i < this.currentGameData.squareProperties.length; i++) {
      for (let j = 0; j < this.currentGameData.squareProperties[i].length; i++) {
        const squareProps = this.currentGameData[i][j];

        if (!(squareProps.currentSelectionType === SquareOptions.Selected && squareProps.squareSolution === true)) {
          return false;
        }
      }
    }

    return true;
  }

  getCellBorderColor(colIndex: number, rowIndex: number): string {
    if (
      this.currentGameData.hoverCursor.x === colIndex &&
      this.currentGameData.hoverCursor.y === rowIndex
    ) {
      return '#FF9A69';
    }

    if (
      this.currentGameData.keyboardCursor.x === colIndex &&
      this.currentGameData.keyboardCursor.y === rowIndex &&
      !this.currentGameData.keyboardCursor.hidden
    ) {
      return '#FFCCB5';
    }

    return '#000000';
  }

  startClick(): void {
    this.startPageOpen = false;
    this.gameService.newGame(
      parseInt(this.columnCount, 10),
      parseInt(this.rowCount, 10)
    );
  }
}
