/****************************************************************************
  FileName      [ reveal.js ]
  PackageName   [ src/util ]
  Author        [ Cheng-Hua Lu ]
  Synopsis      [ This file states the reaction when left clicking a cell. ]
  Copyright     [ 2022 10 ]
****************************************************************************/

export const revealed = (board, x, y, newNonMinesCount) => {
  

    // Advanced TODO: reveal cells in a more intellectual way.
    // Useful Hint: If the cell is already revealed, do nothing.
    //              If the value of the cell is not 0, only show the cell value.
    //              If the value of the cell is 0, we should try to find the value of adjacent cells until the value we found is not 0.
    //              The input variables 'newNonMinesCount' and 'board' may be changed in this function.
    if (board[x][y].value !== 0) {
      board[x][y].revealed = true;
      newNonMinesCount--;
    }
    else {
      const cells = [];
      cells.push([x, y]);
      while (cells.length != 0) {
        const cell = cells[0];
        if (board[cell[0]][cell[1]].revealed) {
          cells.shift();
          continue;
        } 
        for (let i = -1; i <= 1; i++) {  // x
          for (let j = -1; j <= 1; j++) {  // y
            if ((cell[0] + i < 0) || (cell[0] + i >= board.length) || (cell[1] + j < 0) || (cell[1] + j >= board[0].length) || (i == 0 && j == 0) || board[cell[0] + i][cell[1] + j].revealed) // the cell itself
              continue;
            if (board[cell[0] + i][cell[1] + j].value === 0) 
              cells.push([cell[0] + i, cell[1] + j]);
            else if (board[cell[0] + i][cell[1] + j].value !== '💣') {
              board[cell[0] + i][cell[1] + j].revealed = true;
              newNonMinesCount--;
            }
          }
        }
        board[cell[0]][cell[1]].revealed = true;
        newNonMinesCount--;
        cells.shift();
      }
    }
    return { board, newNonMinesCount };
};
