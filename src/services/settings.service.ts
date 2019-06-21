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

  importPuzzle(jsonString: string): { success: boolean, error: string } {
    const arrError = 'Error parsing file - it must be a two dimensional array';

    try {
      // Begin file validation
      const importObject = JSON.parse(jsonString);
      if (Array.isArray(importObject)) {
        let rowLength = -1;

        // tslint:disable-next-line:prefer-for-of
        for (let i = 0; i < importObject.length; i++) {
          const row = importObject[i];
          if (Array.isArray(row)) {
            if (rowLength === -1) {
              rowLength = row.length;
            } else if (row.length !== rowLength) {
              return {
                success: false,
                error: 'Error parsing file - all rows must be the same length'
              };
            }
            for (const square of row) {
              if (![0, 1].includes(square)) {
                return {
                  success: false,
                  error: 'Error parsing file - square values must be 1 or 0'
                };
              }
            }
          } else {
            return {
              success: false,
              error: arrError
            };
          }
        }
        this.gameService.newGameFromImport(importObject);
        return {
          success: true,
          error: null
        };
      } else {
        return {
          success: false,
          error: arrError
        };
      }
    } catch (e) {
      return {
        success: false,
        error: 'Error parsing file - ensure it is a valid game file.'
      };
    }
  }

  exportPuzzle(filename: string): void {
    downloadjs(
      JSON.stringify(this.currentGameState.gameSquare.map(x => x.map(y => y.squareSolution ? 1 : 0))),
      `${filename ? filename : 'Nonogram Export'}.json`,
      'application/json'
    );
  }
}
