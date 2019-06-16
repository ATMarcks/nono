import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import * as downloadjs from 'downloadjs';

import { GameData } from '../constants/game';

@Injectable({
  providedIn: 'root',
})
export class SettingsService {
  private currentGameState: GameData;
  public currentGameStateSub = new Subject<GameData>();
  public currentGameState$ = this.currentGameStateSub.asObservable();

  constructor() {
    this.currentGameState$.subscribe((gameState) => {
      this.currentGameState = gameState;
    });
  }

  exportPuzzle(): void {
    downloadjs(
      JSON.stringify(this.currentGameState.squareProperties.map(x => x.map(y => y.squareSolution ? 1 : 0))),
      'puzzle dl!',
      'application/json'
    );
  }
}
