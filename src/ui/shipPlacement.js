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
  const directionButton = document.getElementById("direction");
  const currentShipLabel = document.getElementById("current-ship");

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
      // render both boards
      renderGame(game.getState());
      attachEventListeners(game);
    });
  };

  const toggleDirection = () => {
    // switch between horizontal and vertical
    direction = direction === "horizontal" ? "vertical" : "horizontal";
  };

  const handleHover = (event) => {
    // get the hovered cell coordinates
    // calculate which cells the current ship would occupy
    // highlight them green if valid, red if invalid
    // clear highlights when mouse leaves
  };

  const handlePlacementClick = (event) => {
    if (!event.target.classList.contains("cell")) return;

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
      startGame();
      return;
    }

    // update message to show which ship is being placed next
    const nextShip = getCurrentShip();
    currentShipLabel.textContent = `Place the following ship: ${nextShip[1]} (${nextShip[0]})`;
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

  document
    .getElementById("human-board")
    .addEventListener("click", handlePlacementClick);
  randomizeButton.addEventListener("click", randomizePlacement);
  directionButton.addEventListener("click", toggleDirection);
  currentShipLabel.textContent = `Place the following ship: ${SHIPS[currentShipIndex][1]} (Lenght: ${SHIPS[currentShipIndex][0]})`;
};
