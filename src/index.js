import { Game } from "./game.js";
import "./styles.css";
import { renderBoard } from "./ui/renderBoard.js";

const humanBoard = document.getElementById("human-board");

const game = Game();
game.placeShips();

renderBoard(humanBoard);

// DOM rendering and event handlers will be imported and initialized here
