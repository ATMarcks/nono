import { Injectable, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import * as downloadjs from 'downloadjs';

import { GameService } from './game.service';
import { GameData } from '../constants/game';

@Injectable({
  providedIn: 'root',
})
export class SettingsService implements OnDestroy {
  private currentGameState: GameData;
  private gameSub: Subscription;

  constructor(private gameService: GameService) {
    this.gameSub = this.gameService.game$.subscribe((gameState) => {
      this.currentGameState = gameState;
    });
  }

  ngOnDestroy() {
    this.gameSub.unsubscribe();
  }

  exportPuzzle(): void {
    downloadjs(
      JSON.stringify(this.currentGameState.squareProperties.map(x => x.map(y => y.squareSolution ? 1 : 0))),
      'puzzle dl!',
      'application/json'
    );
  }
}
