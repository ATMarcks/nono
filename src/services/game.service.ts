import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { GameData } from '../constants/game';

@Injectable({
  providedIn: 'root',
})
export class GameService {
  public gameData: GameData = this.createNewGame(0, 0);

  private newGameSub = new Subject<GameData>();
  public newGame$ = this.newGameSub.asObservable();

  constructor() {

  }

  newGame(cols: number, rows: number) {
    const newGame: GameData = this.createNewGame(cols, rows);

    const newGameSquareProperties = [];

    newGame.rowNumbers = [];
    for (let i = 0; i < rows; i++) {
      const row = [];
      for (let j = 0; j < cols; j++) {
        row.push({
          squareSolution: Math.random() < .5,
          currentSelectionType: null,
        });
      }
      newGame.rowNumbers.push(this.generateDisplayNumbers(...row.map(r => r.squareSolution).reverse()));
      console.log(newGame.rowNumbers);
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

    newGame.squareProperties = newGameSquareProperties;

    this.gameData = newGame;
    this.newGameSub.next(this.gameData);
  }

  createNewGame(cols: number, rows: number): GameData {
    return {
      rows,
      cols,
      squareProperties: [[]],
      colNumbers: [[]],
      rowNumbers: [[]],
      hoverCursor: {
        x: null,
        y: null,
      },
      keyboardCursor: {
        x: 0,
        y: 0,
        hidden: true
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
}
