import { renderGame } from "./ui/renderGame.js";

// handles what happens when the human clicks a cell on the computer's board
const handleCellClick = (event, game) => {
  if (!event.target.classList.contains("cell")) return;
  let coord = [Number(event.target.dataset.x), Number(event.target.dataset.y)];
  const result = game.playRound(coord);
  if (result.gameOver === true) {
    renderGame(game.getState());
    alert(`Game over! ${result.winner} wins!`);
    return;
  } else {
    renderGame(game.getState());
  }
};

const attachEventListeners = (game) => {
  const compBoard = document.getElementById("comp-board");
  compBoard.addEventListener("click", (event) => {
    handleCellClick(event, game);
  });
};

export { handleCellClick, attachEventListeners };
