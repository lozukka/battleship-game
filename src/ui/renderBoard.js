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

      container.appendChild(cellEl);
    });
  });

  const renderGame = (state) => {};
  return { renderBoard, renderGame };
};
