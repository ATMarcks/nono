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
  hoverCursor: {
    x: number; // Will be null if not on square
    y: number; // Will be null if not on square
  };
  keyboardCursor: {
    x: number;
    y: number;
    hidden: boolean;
  };
  solved: boolean;
}
