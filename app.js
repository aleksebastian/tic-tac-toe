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

// Game mechanics
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
  let rows = jsRowRender(linearBoard);
  let columns = jsColumnRender(rows);

  checkGame(rows, columns);
};

// Tile click event handler
let activateTiles = () => {
  Object.values(tiles).forEach((tile, i) => {
    tile.onclick = function () {
      play(tile, i);
    };
  });
};
activateTiles();

// JS board render - Rows
let jsRowRender = (linearBoard) => {
  let copy = linearBoard.slice();
  let renderedRows = [];
  while (copy.length) {
    let row = copy.splice(0, boardRows);
    renderedRows.push(row);
  }
  return renderedRows;
};

// To refactor if time permits
// JS board render - Columns
let jsColumnRender = (linearBoard) => {
  let renderedColumns = [];
  let columnCount = 0;
  let column1 = [];
  let column2 = [];
  let column3 = [];
  for (var i = 0; i < linearBoard.length; i++) {
    let currentRow = linearBoard[i];

    for (var j = 0; j < currentRow.length; j++) {
      let currentTile = currentRow[j];
      if (j === 0) {
        column1.push(currentTile);
      }
      if (j === 1) {
        column2.push(currentTile);
      }
      if (j === 2) {
        column3.push(currentTile);
      }
    }
  }
  renderedColumns.push(column1, column2, column3);

  return renderedColumns;
};

// Horizontal and vertical condition
const xIsWinner = (currentTile) => currentTile === "x";
const oIsWinner = (currentTile) => currentTile === "o";

// tie check!!

// Check for win or tie function
let checkGame = (rowBoard, columnBoard) => {
  let xMajorDiagonalCount = 0;
  let xMinorDiagonalCount = 0;
  let oMajorDiagonalCount = 0;
  let oMinorDiagonalCount = 0;
  let tieCheck = 0;

  for (var i = 0; i < rowBoard.length; i++) {
    let currentRow = rowBoard[i];
    let currentColumn = columnBoard[i];
    if (currentRow.every(xIsWinner) || currentColumn.every(xIsWinner)) {
      winOrTieResponse("X");
    }
    if (currentRow.every(oIsWinner) || currentColumn.every(oIsWinner)) {
      winOrTieResponse("O");
    }
    if (currentRow[i] === "x") {
      xMajorDiagonalCount++;
    }
    if (currentRow[i] === "o") {
      oMajorDiagonalCount++;
    }
    if (currentRow[currentRow.length - (i + 1)] === "x") {
      xMinorDiagonalCount++;
    }
    if (currentRow[currentRow.length - (i + 1)] === "o") {
      oMinorDiagonalCount++;
    }
    if (!currentRow.includes("null")) {
      tieCheck++;
    }
  }
  if (
    xMajorDiagonalCount === rowBoard.length ||
    xMinorDiagonalCount === rowBoard.length
  ) {
    winOrTieResponse("X");
  } else if (
    oMajorDiagonalCount === rowBoard.length ||
    oMinorDiagonalCount === rowBoard.length
  ) {
    winOrTieResponse("O");
  } else if (tieCheck === rowBoard.length) {
    winOrTieResponse();
  }
};

// Win or tie elements and functionality
const winOrTieBanner = document.createElement("h1");
const resetInfoElement = document.createElement("h3");
const resetInfo = (resetInfoElement.innerHTML =
  "Click the reset button below to play again");
const HTMLBoard = document.querySelector(".board");

let winOrTieResponse = (winner) => {
  if (!winner) {
    winOrTieBanner.innerHTML = "Cat's Game!";
    winOrTieBanner.style.float = "left";
    HTMLBoard.appendChild(winOrTieBanner);
  } else {
    winOrTieBanner.innerHTML = `${winner} wins!`;
    HTMLBoard.prepend(winOrTieBanner);
    Object.values(tiles).forEach((tile) => {
      tile.onclick = null;
    });
  }
};

// Reset button
let resetButton = document.querySelector(".reset");
resetButton.onclick = () => {
  Object.values(tiles).forEach((tile) => {
    tile.innerHTML = "";
  });
  winOrTieBanner.innerHTML = "";
  emptyBoard = Array(boardSize);
  linearBoard = emptyBoard.fill("null");
  activateTiles();
  x = true;
};
