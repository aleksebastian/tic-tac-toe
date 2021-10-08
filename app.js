const header = document.querySelector(".header");
const board = document.querySelector(".board");

const title = document.createElement("h1");
const text = document.createTextNode("Tic Tac Toe");

title.appendChild(text);
header.appendChild(title);

const boardSize = 3 * 3;
const boardRows = boardSize / 3;
let tileCount = 1;
let tiles = {};
let emptyBoard = Array(boardSize);
let linearBoard = emptyBoard.fill("null");

// HTML Board render
for (var i = 0; i < boardSize; i++) {
  let tile = document.createElement("div");
  tile.classList.add("tile", "num" + tileCount.toString());
  board.appendChild(tile);

  tiles[tileCount] = tile;
  tileCount++;
}

var x = true;

let play = (tile, i) => {
  if (x) {
    if (tile.innerHTML === "o") {
      return;
    } else {
      tile.innerHTML = "x";
      linearBoard[i] = "x";
      x = false;
    }
  } else {
    if (tile.innerHTML === "x") {
      return;
    } else {
      tile.innerHTML = "o";
      linearBoard[i] = "o";
      x = true;
    }
  }
  let board = jsBoardRender(linearBoard);
  checkGame(board);
};

// Tile click event handler
Object.values(tiles).forEach((tile, i) => {
  tile.onclick = function () {
    play(tile, i);
  };
});

// JS board render
let jsBoardRender = (linearBoard) => {
  let copy = linearBoard.slice();
  let renderedBoard = [];
  while (copy.length) {
    let row = copy.splice(0, boardRows);
    renderedBoard.push(row);
  }
  return renderedBoard;
};

// horizontal check
const xIsWinner = (currentTile) => currentTile === "x";
const oIsWinner = (currentTile) => currentTile === "o";

// vertical check

// diagonal check

// check for win or tie function
let checkGame = (board) => {
  for (var i = 0; i < board.length; i++) {
    let currentRow = board[i];
    if (currentRow.every(xIsWinner)) {
      console.log("x wins!");
    }
    if (currentRow.every(oIsWinner)) {
      console.log("o wins!");
    }
  }
};
