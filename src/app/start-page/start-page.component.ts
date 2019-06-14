import { Component, OnDestroy, HostListener } from '@angular/core';
import { Subscription } from 'rxjs';

import { fadeAnimation } from '../../animations/animations';
import { GameService } from '../../services/game.service';
import { GameData, SquareOptions } from '../../constants/game';

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
    console.log({event});
  }

  gameCellClick(col): void {
    if (col.currentSelectionType === SquareOptions.Selected || col.currentSelectionType === SquareOptions.Crossed) {
      col.currentSelectionType = null;
    } else if (col.currentSelectionType === null || col.currentSelectionType === SquareOptions.Marked) {
      col.currentSelectionType = SquareOptions.Selected;
    }
  }

  gameCellMiddleClick(col): void {
    if (![SquareOptions.Selected, SquareOptions.Crossed].includes(col.currentSelectionType)) {
      if (col.currentSelectionType === null) {
        col.currentSelectionType = SquareOptions.Marked;
      } else {
        col.currentSelectionType = null;
      }
    }
  }

  gameCellRightClick(col): void {
    if ([SquareOptions.Selected, SquareOptions.Crossed].includes(col.currentSelectionType)) {
      col.currentSelectionType = null;
    } else if (col.currentSelectionType === null || col.currentSelectionType === SquareOptions.Marked) {
      col.currentSelectionType = SquareOptions.Crossed;
    }
  }

  getBackgroundColor(col, rowIndex) {
    if (col.currentSelectionType === SquareOptions.Selected) {
      return '#0079B8';
    } else {
      if (rowIndex % 2 === 0) {
        return '#B7C5CE';
      }
      return '#919FA8';
    }
  }

  gameKeypress(e) {
    console.log({e});
  }

  startClick(): void {
    this.startPageOpen = false;
    this.gameService.newGame(
      parseInt(this.columnCount, 10),
      parseInt(this.rowCount, 10)
    );
  }
}
