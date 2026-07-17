const renderBoard = (boardData, gamearea) => {
  const container = document.getElementById(gamearea);
  container.innerHTML = ""; // clear before re-rendering

  boardData.forEach((row, y) => {
    row.forEach((cell, x) => {
      const cellEl = document.createElement("div");
      cellEl.classList.add("cell");
      cellEl.dataset.x = x;
      cellEl.dataset.y = y;
      container.appendChild(cellEl);
    });
  });
};
