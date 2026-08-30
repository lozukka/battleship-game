import { Game } from "./game.js";
import { renderBoard, renderGame } from "./ui/renderBoard.js";
import { attachEventListeners } from "./ui/eventHandlers.js";
import { initPlacementPhase } from "./ui/shipPlacement.js";
import "./styles.css";

const init = () => {
  // create a new game instance
  const game = Game();
  // place ships
  initPlacementPhase(game);
  document.body.classList.add("loaded");
};

init();
