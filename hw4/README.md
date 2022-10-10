# Web Programming HW#4
## Basic Requirements
### Initial Layout
There is a "startGame" state in MineSweeper.js which decides to display HomePage or Board. If "startGame" == false, HomePage will be displayed. Otherwise, Board will be displayed.
### Start Button
Once the start button be clicked, the "startGame" will be set to true.
### FreshBoard
Create a newBoard using "createBoard" function, and set the board, mineLocations, nonMineCount, remainFlagNum accordingly.
### Construct the Board using "map"
Using nested map calling \<Cell> function to construct a 2-D map.
### Update Flag
Once the cell is clicked by right click, the "updateFlag" function in Board.js will be called.
1. If the cell has been revealed, nothing will happen and the function will return. 
2. If the cell hasn't be revealed and it hasn't be flagged either, its flagged state will be set to true and the remainFlagNum will decrease by one.
3. If the cell hasn't be revealed but it has be flagged, its flagged state will be set to false and the remainFlagNum will increase by one.
### Reveal Cell
Once the cell is clicked by left click, the "revealCell" function in Board.js will be called.
1. If the cell.value === '💣', "gameOver" state will be set to true.
2. Otherwise, it will call "revealed" function to update the board. If "nonMineCount" = 0, it will set "gameOver" and "win" to true.
