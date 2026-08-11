import { renderBoard, renderGame } from "./renderBoard.js";
import { attachEventListeners } from "./eventHandlers.js";
import { randomCoord } from "../utils.js";

const SHIPS = [
  [5, "Carrier"],
  [4, "Battleship"],
  [3, "Destroyer"],
  [3, "Submarine"],
  [2, "Patrol Boat"],
];

export const initPlacementPhase = (game) => {
  // index tracking which ship is currently being placed
  let currentShipIndex = 0;
  let direction = "horizontal";

  const startButton = document.getElementById("startgame");
  const compBoardContainer = document.getElementById(
    "computer-board-container",
  );
  const placementContainer = document.getElementById("placement");
  const randomizeButton = document.getElementById("randomize");

  const getCurrentShip = () => SHIPS[currentShipIndex];

  const startGame = () => {
    // place computer ships randomly
    SHIPS.forEach((ship) => {
      let result;
      do {
        const startCoord = randomCoord();
        const dir = Math.random() < 0.5 ? "horizontal" : "vertical";
        result = game.compBoard.placeShip(ship[0], ship[1], startCoord, dir);
      } while (!result.success);
    });

    startButton.classList.remove("hide");
    startButton.addEventListener("click", () => {
      // show computer board
      compBoardContainer.classList.remove("hide");
      // hide placement buttons
      placementContainer.classList.add("hide");
      // render both boards
      renderGame(game.getState());
      // attach game event listeners
      attachEventListeners(game);
    });
  };

  const toggleDirection = () => {
    // switch between horizontal and vertical
  };

  const handleHover = (event) => {
    // get the hovered cell coordinates
    // calculate which cells the current ship would occupy
    // highlight them green if valid, red if invalid
    // clear highlights when mouse leaves
  };

  const handlePlacementClick = (event) => {
    // get the clicked cell coordinates
    // try to place the current ship on the human board
    // if successful, move to the next ship
    // if all ships are placed, call startGame()
  };

  const randomizePlacement = () => {
    // place all remaining ships randomly on the human board
    SHIPS.forEach((ship) => {
      let result;
      do {
        let startCoord = randomCoord();
        const direction = Math.random() < 0.5 ? "horizontal" : "vertical";
        result = game.humanBoard.placeShip(
          ship[0],
          ship[1],
          startCoord,
          direction,
        ); //(length, name, startCoord, direction
      } while (!result.success);
    });

    const state = game.getState();
    renderBoard(
      state.humanBoard,
      state.missedAttacks.human,
      state.attackedCoords.human,
      "human-board",
      false,
    );

    startGame();
  };
  randomizeButton.addEventListener("click", randomizePlacement);

  // const startGame = (humanBoard) => {
  // place computer ships randomly
  // hide placement UI
  // show game area
  // render initial board state
  // attach game event listeners
  // };

  const attachPlacementListeners = () => {
    // attach hover listener to human board
    // attach click listener to human board
    // attach click listener to direction toggle button
    // attach click listener to randomize button
  };

  // render the empty human board and attach listeners to kick things off
  const state = game.getState();
  renderBoard(
    state.humanBoard,
    state.missedAttacks.human,
    state.attackedCoords.human,
    "human-board",
    false,
  );
};
