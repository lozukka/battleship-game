import { renderGame } from "./renderBoard.js";

// handles what happens when the human clicks a cell on the computer's board
const handleCellClick = (event, game) => {
  if (!event.target.classList.contains("cell")) return;

  if (game.getState().turn !== "human") return;

  const coord = [
    Number(event.target.dataset.x),
    Number(event.target.dataset.y),
  ];
  const result = game.playRound(coord);

  renderGame(game.getState());

  if (result.gameOver) {
    alert(`Game over! ${result.winner} wins!`);
    return;
  }

  setTimeout(() => {
    const compResult = game.playRound();
    renderGame(game.getState());

    if (compResult.gameOver) {
      alert(`Game over! ${compResult.winner} wins!`);
    }
  }, 500);
};

const attachEventListeners = (game) => {
  const compBoard = document.getElementById("computer-board");
  compBoard.addEventListener("click", (event) => {
    handleCellClick(event, game);
  });
};

export { handleCellClick, attachEventListeners };
