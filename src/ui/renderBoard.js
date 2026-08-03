import { positionKey } from "./utils.js";

export const renderBoard = (
  boardData,
  missedAttacks,
  elementId,
  hideShips = false,
) => {
  const container = document.getElementById(elementId);
  container.innerHTML = ""; // clear before re-rendering

  boardData.forEach((row, y) => {
    row.forEach((cell, x) => {
      const cellEl = document.createElement("div");
      cellEl.classList.add("cell");
      cellEl.dataset.x = x;
      cellEl.dataset.y = y;
      //add class based on state
      const key = positionKey([x, y]);
      if (missedAttacks.has(key)) {
        cellEl.classList.add("miss");
      } else if (cell && attackedCoords.has(key)) {
        cellEl.classList.add("hit");
      } else if (cell && !hideShips) {
        cellEl.classList.add("ship");
      }

      container.appendChild(cellEl);
    });
  });
};

export const renderGame = (state) => {
  renderBoard(
    state.humanBoard,
    state.missedAttacks.human,
    state.attackedCoords.human,
    "human-board",
    false,
  );
  renderBoard(
    state.compBoard,
    state.missedAttacks.comp,
    state.attackedCoords.comp,
    "comp-board",
    true,
  );
};
