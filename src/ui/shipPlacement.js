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
  const placementContainer = document.getElementById("placement-buttons");
  const randomizeButton = document.getElementById("randomize");
  const directionButton = document.getElementById("direction");
  const clearButton = document.getElementById("clear");
  const currentShipLabel = document.getElementById("messagearea");

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
      compBoardContainer.classList.remove("hide");
      placementContainer.classList.add("hide");
      currentShipLabel.textContent = "Game started!";
      // render both boards
      renderGame(game.getState());
      attachEventListeners(game);
    });
  };

  const toggleDirection = () => {
    // switch between horizontal and vertical
    direction = direction === "horizontal" ? "vertical" : "horizontal";
  };

  const clearHighlights = () => {
    document.querySelectorAll(".cell").forEach((cell) => {
      cell.classList.remove("valid", "invalid");
    });
  };

  const handleHover = (event) => {
    if (!event.target.classList.contains("cell")) return;

    clearHighlights();

    const coord = [
      Number(event.target.dataset.x),
      Number(event.target.dataset.y),
    ];

    const currentShip = getCurrentShip();
    const length = currentShip[0];

    // calculate which cells the ship would occupy
    const coords = [];
    for (let i = 0; i < length; i++) {
      coords.push(
        direction === "horizontal"
          ? [coord[0] + i, coord[1]]
          : [coord[0], coord[1] + i],
      );
    }

    // check if all coords are valid
    const isValid = coords.every(
      ([x, y]) =>
        x >= 0 &&
        x < 10 &&
        y >= 0 &&
        y < 10 &&
        !game.humanBoard.isOccupied([x, y]),
    );

    // highlight each cell
    coords.forEach(([x, y]) => {
      const cell = document.querySelector(`[data-x="${x}"][data-y="${y}"]`);
      if (cell) {
        cell.classList.add(isValid ? "valid" : "invalid");
      }
    });
  };

  const handlePlacementClick = (event) => {
    if (!event.target.classList.contains("cell")) return;
    clearButton.classList.remove("hide");

    const coord = [
      Number(event.target.dataset.x),
      Number(event.target.dataset.y),
    ];

    const currentShip = getCurrentShip();
    const result = game.humanBoard.placeShip(
      currentShip[0],
      currentShip[1],
      coord,
      direction,
    );

    if (!result.success) {
      // invalid placement — do nothing or show a message
      return;
    }

    // placement was successful — move to next ship
    currentShipIndex++;

    // re-render to show the newly placed ship
    const state = game.getState();
    renderBoard(
      state.humanBoard,
      state.missedAttacks.human,
      state.attackedCoords.human,
      "human-board",
      false,
    );

    // check if all ships have been placed
    if (currentShipIndex >= SHIPS.length) {
      currentShipLabel.textContent = `All ships placed! Ready for the game!`;
      document
        .getElementById("human-board")
        .removeEventListener("click", handlePlacementClick);
      cleanupPlacementListeners();
      startGame();
      return;
    }

    // update message to show which ship is being placed next
    const nextShip = getCurrentShip();
    currentShipLabel.textContent = `Place the following ship: ${nextShip[1]} (Length: ${nextShip[0]})`;
  };

  const randomizePlacement = () => {
    randomizeButton.disabled = true;
    directionButton.disabled = true;
    clearButton.classList.remove("hide");

    cleanupPlacementListeners();
    // place all remaining ships randomly on the human board
    SHIPS.slice(currentShipIndex).forEach((ship) => {
      let result;
      do {
        let startCoord = randomCoord();
        const dir = Math.random() < 0.5 ? "horizontal" : "vertical";
        result = game.humanBoard.placeShip(ship[0], ship[1], startCoord, dir); //(length, name, startCoord, direction
      } while (!result.success);
    });
    document
      .getElementById("human-board")
      .removeEventListener("click", handlePlacementClick);
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

  // render the empty human board and attach listeners to kick things off
  const state = game.getState();
  renderBoard(
    state.humanBoard,
    state.missedAttacks.human,
    state.attackedCoords.human,
    "human-board",
    false,
  );

  const cleanupPlacementListeners = () => {
    const humanBoard = document.getElementById("human-board");
    humanBoard.removeEventListener("mouseover", handleHover);
    humanBoard.removeEventListener("mouseleave", clearHighlights);
    humanBoard.removeEventListener("click", handlePlacementClick);
    document.getElementById("human-board").classList.remove("placement-active");
    clearHighlights(); // clear any remaining highlights
  };

  const clearPlacement = () => {
    // reset ship index back to beginning
    currentShipIndex = 0;

    // reset the human board completely by creating a fresh one
    game.humanBoard.reset();

    // re-render the empty board
    const state = game.getState();
    renderBoard(
      state.humanBoard,
      state.missedAttacks.human,
      state.attackedCoords.human,
      "human-board",
      false,
    );

    // hide start button again
    startButton.classList.add("hide");

    // re-enable randomize and direction buttons
    randomizeButton.disabled = false;
    directionButton.disabled = false;

    // re-attach placement click listener in case it was removed
    document
      .getElementById("human-board")
      .addEventListener("click", handlePlacementClick);

    // update ship label
    currentShipLabel.textContent = `Place the following ship: ${getCurrentShip()[1]} (Length: ${getCurrentShip()[0]})`;
  };

  const humanBoard = document.getElementById("human-board");
  humanBoard.addEventListener("mouseover", handleHover);
  humanBoard.addEventListener("mouseleave", clearHighlights);
  humanBoard.addEventListener("click", handlePlacementClick);

  document
    .getElementById("human-board")
    .addEventListener("mouseover", handleHover);
  document
    .getElementById("human-board")
    .addEventListener("mouseleave", clearHighlights);
  document
    .getElementById("human-board")
    .addEventListener("click", handlePlacementClick);
  document.getElementById("human-board").classList.add("placement-active");
  randomizeButton.addEventListener("click", randomizePlacement);
  directionButton.addEventListener("click", toggleDirection);
  clearButton.addEventListener("click", clearPlacement);
  currentShipLabel.textContent = `Place the following ship: ${SHIPS[currentShipIndex][1]} (Length: ${SHIPS[currentShipIndex][0]})`;
};
