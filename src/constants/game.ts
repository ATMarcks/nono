export enum SquareOptions {
  Selected,
  Crossed,
  Marked
}


export interface GameData {
  rows: number;
  cols: number;
  squareProperties: {
    currentSelectionType: SquareOptions | null,
    squareSolution: boolean
  }[][];
  colNumbers: number[][];
  rowNumbers: number[][];
}
