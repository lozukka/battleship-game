import { renderBoard, renderGame } from "./renderBoard.js";
import { Game } from "../game.js";
import { initPlacementPhase } from "../ui/shipPlacement.js";

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
    renderGame(game.getState());
    showGameOver(result.winner, game);
    return;
  }

  setTimeout(() => {
    const compResult = game.playRound();
    renderGame(game.getState());

    if (compResult.attackResult.result === "hit") {
      showMessage(
        compResult.attackResult.sunk
          ? `Computer sunk your ${compResult.attackResult.sunkShipName}!`
          : "Computer hit your ship!",
      );
    } else {
      showMessage("Computer missed!");
    }

    if (compResult.gameOver) {
      renderGame(game.getState());
      showGameOver(compResult.winner);
      return;
    }
  }, 500);

  if (result.attackResult.result === "hit") {
    showMessage(
      result.attackResult.sunk
        ? `You sunk the ${result.attackResult.sunkShipName}!`
        : "You hit a ship!",
    );
  } else {
    showMessage("You missed!");
  }
};

const showMessage = (message) => {
  const container = document.getElementById("messagearea");
  container.innerHTML = `<p>${message}</p>`;
};

const attachEventListeners = (game) => {
  const compBoard = document.getElementById("computer-board");
  compBoard.addEventListener("click", (event) => {
    handleCellClick(event, game);
  });
};

const showGameOver = (winner) => {
  const container = document.getElementById("messagearea");
  container.innerHTML = "";

  const message = document.createElement("p");
  message.textContent = `${winner} won the game!`;

  const button = document.createElement("button");
  button.textContent = "Play Again";
  button.addEventListener("click", playAgain);

  container.appendChild(message);
  container.appendChild(button);
};

const playAgain = () => {
  // clear game over message
  document.getElementById("messagearea").innerHTML = "";

  // remove old event listeners by replacing the board
  const compBoard = document.getElementById("computer-board");
  const freshBoard = compBoard.cloneNode(true);
  compBoard.parentNode.replaceChild(freshBoard, compBoard);

  const humanBoard = document.getElementById("human-board");
  const freshHuman = humanBoard.cloneNode(true);
  humanBoard.parentNode.replaceChild(freshHuman, humanBoard);

  const startButton = document.getElementById("startgame");
  const freshStart = startButton.cloneNode(true);
  startButton.parentNode.replaceChild(freshStart, startButton);

  // hide computer board again
  document.getElementById("computer-board-container").classList.add("hide");

  // show placement UI again
  document.getElementById("placement").classList.remove("hide");

  // re-enable placement buttons
  document.getElementById("randomize").disabled = false;
  document.getElementById("direction").disabled = false;

  // hide start button until ships are placed
  document.getElementById("startgame").classList.add("hide");

  // start fresh
  const game = Game();
  initPlacementPhase(game);
};

export { handleCellClick, attachEventListeners };
