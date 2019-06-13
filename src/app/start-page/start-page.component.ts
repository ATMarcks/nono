import { Component, OnDestroy } from '@angular/core';
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

  gameCellClick(col): void {
    col.currentSelectionType = SquareOptions.Selected;
  }

  gameCellRightClick(col): void {
    col.currentSelectionType = SquareOptions.Crossed;
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

  gameCellMiddleClick(col): void {
    col.currentSelectionType = SquareOptions.Marked;
  }

  startClick(): void {
    this.startPageOpen = false;
    this.gameService.newGame(
      parseInt(this.columnCount, 10),
      parseInt(this.rowCount, 10)
    );
  }
}
