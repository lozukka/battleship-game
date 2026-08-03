import { Game } from "./game.js";
import { renderBoard, renderGame } from "./ui/renderBoard.js";
import { attachEventListeners } from "./ui/eventHandlers.js";
import "./styles.css";

const init = () => {
  // create a new game instance
  const game = Game();
  // place ships
  game.placeShips();
  // render the initial board state
  renderGame(game.getState());
  // attach event listeners
  attachEventListeners(game);
};

init();
