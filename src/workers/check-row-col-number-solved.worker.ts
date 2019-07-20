import { clone, get, unzip } from 'lodash';

import { DisplayNumber, GameSquare, SquareOptions } from '../constants/game';

// https://stackoverflow.com/a/50420456/4600224
const ctx: Worker = self as any;

// { rowIndex, colIndex, gameSquares, colDisplayNumbers, rowDisplayNumbers }
ctx.addEventListener('message', (message) => {
  const colIndex: number = get(message, 'data.colIndex ', null);
  const rowIndex: number = get(message, 'data.rowIndex', null);
  const gameSquares: GameSquare[][] = get(message, 'data.gameSquares', []);
  const colDisplayNumbers: DisplayNumber[][] = get(message, 'data.colDisplayNumbers', []);
  const rowDisplayNumbers: DisplayNumber[][] = get(message, 'data.rowDisplayNumbers', []);

  const checker = (gameCells: GameSquare[], displayNumbers: DisplayNumber[], runReversed = true): void => {
    const solutionNumbers = displayNumbers.map(x => x.value);

    // First, check if all numbers are completed
    // Check only if solution sum is equal to number of cells marked as selected
    // runReversed === false exists so that this code only runs once
    if (runReversed === false) {
      const solutionNumbersSum = solutionNumbers.reduce((a, b) => a + b, 0);
      const selectedCellsSum = gameCells.reduce((a, b) => a + (b.currentSelectionType === SquareOptions.Selected ? 1 : 0), 0);
      if (solutionNumbersSum === selectedCellsSum) {
        let lastCheckedIndexA = -1;
        let selectedCellIndexStartA = null;
        let allCorrect = true;
        for (let i = 0; i <= gameCells.length; i++) {
          if (
            (i === gameCells.length || gameCells[i].currentSelectionType !== SquareOptions.Selected) && selectedCellIndexStartA !== null
          ) {
            // If the end of a series of consecutively selected cells is reached
            const consecutiveSum = i - selectedCellIndexStartA;
            if (consecutiveSum !== solutionNumbers[lastCheckedIndexA + 1]) {
              allCorrect = false;
              break;
            } else {
              lastCheckedIndexA++;
              selectedCellIndexStartA = null;
            }
          } else if (
            i !== gameCells.length && gameCells[i].currentSelectionType === SquareOptions.Selected && selectedCellIndexStartA === null
          ) {
            selectedCellIndexStartA = i;
          }
        }
        if (allCorrect) {
          displayNumbers.map(x => x.solved = true);
          // No need to check in other direction
          return;
        }
      } else if (selectedCellsSum > solutionNumbersSum) {
        // If more items are selected than should exist
        // Set all to false
        displayNumbers.map(x => x.solved = false);
        return;
      }
    }
    // End checking if all numbers are completed

    // When a solution number is successfully validated, increment this up by 1
    let lastCheckedIndex = -1;

    // When a cell is selected, this index gets set
    // If the next cell is selected, it says the same; otherwise, it gets set to null
    let selectedCellIndexStart: number = null;

    // While iterating across the cells, this is flagged to be the last cell that has been marked
    // Starts at -1 because the a cell at index -1 is effectively a marked square
    let lastMarkedCellIndex = -1;

    for (let currentCellIndex = 0; currentCellIndex < gameCells.length; currentCellIndex++) {
      const gameCell = gameCells[currentCellIndex];
      if (gameCell.currentSelectionType === SquareOptions.Crossed) {
        if (selectedCellIndexStart !== null) {
          // If we are traversing over a set of consecutively selected cells,
          // and come across a marked cell, then check if solution is correct
          if (solutionNumbers[lastCheckedIndex + 1] === currentCellIndex - selectedCellIndexStart) {
            // Set solved
            displayNumbers[lastCheckedIndex + 1].solved = true;
            lastCheckedIndex++;
          } else {
            // Set rest to unsolved unless we are on a second pass
            if (runReversed) {
              for (let i = lastCheckedIndex + 1; i < displayNumbers.length; i++) {
                displayNumbers[i].solved = false;
              }
              checker(clone(gameCells).reverse(), clone(displayNumbers).reverse(), false);
            }
            return;
          }
        }
        lastMarkedCellIndex = currentCellIndex;
        selectedCellIndexStart = null;
      } else if (gameCell.currentSelectionType === SquareOptions.Selected) {
        if (selectedCellIndexStart === null) {
          selectedCellIndexStart = currentCellIndex;
        }
        // Otherwise continue
      } else if ([null, SquareOptions.Error].includes(gameCell.currentSelectionType)) {
        if (runReversed) {
          for (let i = lastCheckedIndex + 1; i < displayNumbers.length; i++) {
            displayNumbers[i].solved = false;
          }
          checker(clone(gameCells).reverse(), clone(displayNumbers).reverse(), false);
        }
        return;
      }
    }

    if (runReversed === true) {
      checker(clone(gameCells).reverse(), clone(displayNumbers).reverse(), false);
    } else {
      return;
    }
  };

  const noVals = [null, undefined];

  // Check row(s)
  if (noVals.includes(rowIndex)) {
    gameSquares.forEach((gameRow, i) => {
      checker(gameRow, rowDisplayNumbers[i]);
    });
  } else {
    const gameRowData = get(gameSquares, `[${rowIndex}]`);
    const gameRowNumbers = get(rowDisplayNumbers, `[${rowIndex}]`);

    if (![gameRowData, gameRowNumbers].includes(undefined)) {
      checker(gameRowData, gameRowNumbers);
    } else {
      console.error('Bad row index');
    }
  }

  if (noVals.includes(colIndex)) {
    unzip(gameSquares).forEach((gameCol, i) => {
      checker(gameCol, colDisplayNumbers[i]);
    });
  } else {
    const transposedGameData = unzip(gameSquares);
    const gameColData = get(transposedGameData, `[${colIndex}]`);
    const gameColNumbers = get(colDisplayNumbers, `[${colIndex}]`);

    if (![gameColData, gameColNumbers].includes(undefined)) {
      checker(gameColData, gameColNumbers);
    } else {
      console.error('Bad col index');
    }
  }

  ctx.postMessage({ rowDisplayNumbers, colDisplayNumbers });
});
