import { ElementRef, Component, HostListener, OnDestroy, ViewChild, AfterViewInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { debounce, get } from 'lodash';

import { GameService } from '../../services/game.service';
import { GameData, SquareOptions } from '../../constants/game';

@Component({
  selector: 'app-start-page',
  templateUrl: './start-page.component.html',
  styleUrls: ['./start-page.component.scss']
})
export class StartPageComponent implements OnDestroy, AfterViewInit {
  @ViewChild('gameTable', { static: false }) gameTableRef: ElementRef;

  public gameSub: Subscription;
  public currentGameData: GameData;
  public squareOptionsEnum = SquareOptions;

  public gameTablePoll: ReturnType<typeof setInterval>;

  public gameTableWidth = 100;
  public startPageOpen = true;

  public startPage = {
    rowCountInput: null as string,
    columnCountInput: null as string,
    startInputsErrorMessage: null as string,
  };

  constructor(private gameService: GameService) {
    this.gameSub = this.gameService.game$.subscribe((gameData) => {
      this.currentGameData = gameData;
    });
  }

  ngAfterViewInit() {
    this.gameTableWidth = get(this.gameTableRef, 'nativeElement.clientWidth', 300);

    this.gameTablePoll = setInterval(() => {
      if (this.gameTableRef) {
       this.gameTableWidth = get(this.gameTableRef, 'nativeElement.clientWidth', 300);
      }
    }, 400);
  }

  ngOnDestroy(): void {
    this.gameSub.unsubscribe();

    // Making sure this stops polling
    clearInterval(this.gameTablePoll);
    this.gameTablePoll = null;
  }

  @HostListener('document:keydown', ['$event'])
  keyPress(event: KeyboardEvent) {
    this.gameService.keyPress(event);
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
