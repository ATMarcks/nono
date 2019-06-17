export enum SquareOptions {
  Selected, // Square is selected
  Crossed, // Square is marked out
  Marked, // Square has a note symbol on it
  Error // Selection made in error
}

export enum KeyboardMove {
  Up = 'ArrowUp',
  Down = 'ArrowDown',
  Right = 'ArrowRight',
  Left = 'ArrowLeft'
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
    hideCursorTimerTimeout: ReturnType<typeof setTimeout>;
  };
  solved: boolean;
  assist: boolean;
}
