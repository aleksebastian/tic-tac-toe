// Tile click event handler
const activateTiles = () => {
  Object.values(tiles).forEach((tile, i) => {
    tile.onclick = () => {
      play(tile, i);
    };
  });
};

// Reset button
resetButton = document.querySelector(".reset");
resetButton.onclick = () => {
  Object.values(tiles).forEach((tile) => {
    tile.innerHTML = "";
  });
  winOrTieBanner.innerHTML = "";
  emptyBoard = Array(boardSize);
  linearBoard = emptyBoard.fill("null");
  activateTiles();
  updateCurrentPlayer();
  // x = true;
  // Allow for winner to make the first move on next round
  x = !x;
};
