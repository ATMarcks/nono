export const MAX_GAME_ROWS = 20;
export const MIN_GAME_ROWS = 1;
export const MAX_GAME_COLS = 20;
export const MIN_GAME_COLS = 1;

export const GAME_SERVICE_TICK = 75; // milliseconds

export const COL_SIZES = [
  5,
  10,
  15,
  20
];

export const ROW_SIZES = [
  5,
  10,
  15,
  20
];

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

export interface GameSquare {
  currentSelectionType: SquareOptions;
  squareSolution: boolean;
}

export interface DisplayNumber {
  solved: boolean;
  value: number;
}

export interface GameData {
  rows: number;
  cols: number;
  gameSquare: GameSquare[][];
  colNumbers: DisplayNumber[][];
  rowNumbers: DisplayNumber[][];
  hoverCursor: {
    x: number; // Will be null if not on gameSquare
    y: number; // Will be null if not on gameSquare
  };
  keyboardCursor: {
    x: number;
    y: number;
    hidden: boolean;
    hideCursorTimerTimeout: ReturnType<typeof setTimeout>;
  };
  solved: boolean;
  everSolved: boolean; // Flagged true if the puzzle has been finished, but squares were changed
  assist: boolean;
  timer: {
    startTime: number,
    msElapsed: number,
    formattedTime: string,
  };
}
