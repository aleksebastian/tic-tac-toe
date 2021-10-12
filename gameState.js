// Game mechanics

let x = true;

const currentPlayer = document.querySelector(".current-player");

const updateCurrentPlayer = () => {
  if (x) {
    currentPlayer.innerHTML = "O's turn";
  } else {
    currentPlayer.innerHTML = "X's turn";
  }
};

const play = (tile, i) => {
  updateCurrentPlayer();
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

// JS board render - Rows
const jsRowRender = (linearBoard) => {
  let copy = linearBoard.slice();
  let renderedRows = [];
  while (copy.length) {
    let row = copy.splice(0, boardRows);
    renderedRows.push(row);
  }
  return renderedRows;
};

// Refactor to be dynamic
// JS board render - Columns
const jsColumnRender = (linearBoard) => {
  let renderedColumns = [];
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

// Check for win or tie function
const checkGame = (rowBoard, columnBoard) => {
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
      break;
    }
    if (currentRow.every(oIsWinner) || currentColumn.every(oIsWinner)) {
      winOrTieResponse("O");
      break;
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
    return;
  } else if (
    oMajorDiagonalCount === rowBoard.length ||
    oMinorDiagonalCount === rowBoard.length
  ) {
    winOrTieResponse("O");
    return;
  } else if (tieCheck === rowBoard.length) {
    winOrTieResponse();
    return;
  }
};

// Win or tie elements and functionality
const winOrTieBanner = document.querySelector(".game-result");
const HTMLBoard = document.querySelector(".board");

const winOrTieResponse = (winner) => {
  if (!winner) {
    winOrTieBanner.innerHTML = "Cat's Game!";
  } else {
    updateWinCount(winner);
    winOrTieBanner.innerHTML = `${winner} wins!`;
    Object.values(tiles).forEach((tile) => {
      tile.onclick = null;
    });
  }
};
