const header = document.querySelector(".header");
const board = document.querySelector(".board");

const title = document.createElement("h1");
const text = document.createTextNode("Tic Tac Toe");

title.appendChild(text);
header.appendChild(title);

const rows = 3;
const boardSize = rows * rows;
const boardRows = boardSize / rows;

const boardDimentions = 400; //px
const tileDimentions = boardDimentions / boardRows;

board.style.width = `${boardDimentions}px`;
board.style.height = `${boardDimentions}px`;
board.style.maxWidth = `${boardDimentions}px`;

let tileCount = 1;
let tiles = {};
let emptyBoard = Array(boardSize);
let linearBoard = emptyBoard.fill("null");

// HTML Board render
const boardRender = () => {
  for (var i = 0; i < boardSize; i++) {
    let tile = document.createElement("div");
    tile.classList.add("tile", "num" + tileCount.toString());

    tile.style.width = `${tileDimentions - 5}px`;
    tile.style.height = `${tileDimentions - 5}px`;
    tile.style.lineHeight = `${tileDimentions - 5}px`;

    board.appendChild(tile);

    tiles[tileCount] = tile;
    tileCount++;
  }
};

// Winner count
const winCount = {
  X: document.querySelector(".xCount"),
  O: document.querySelector(".oCount"),
};

const updateWinCount = (winner) => {
  let currentTally = Number(winCount[winner].innerHTML);
  winCount[winner].innerHTML = `${currentTally + 1}`;
};

// Pick name
const pickNameEnableBtn = document.querySelector(".nameEnablerBtn");
const nameFields = document.querySelector(".nameContainer");
const pickNameBtn = document.querySelector(".pickNameBtn");
const xName = document.querySelector(".choosenXName");
const oName = document.querySelector(".choosenOName");
nameFields.style.visibility = "hidden";

const enableNameChange = () => {
  nameFields.style.visibility = "";
};
pickNameEnableBtn.onclick = () => {
  enableNameChange();
};

const names = {
  X: document.querySelector(".xName"),
  O: document.querySelector(".oName"),
};
const addNames = () => {
  names.X.innerHTML = `X: ${xName.value}`;
  names.O.innerHTML = `O: ${oName.value}`;
  nameFields.style.visibility = "hidden";
};

pickNameBtn.onclick = () => {
  addNames();
};
