import { Player } from "../src/player.js";
import { Gameboard } from "../src/gameboard.js";
import { randomCoord } from "./utils.js";

export const Game = () => {
  // create two players — one human, one computer
  const humanPlayer = Player("Human", "human");
  const compPlayer = Player("Computer", "computer");
  // create two gameboards — one for each player
  const humanBoard = Gameboard(); //human places ships here, comp attacks this
  const compBoard = Gameboard(); //computer places ships here, human attacks this
  // track whose turn it is
  let turn = "human";

  const placeShips = () => {
    humanPlacesShips();
    compPlacesShips();
  };

  // place ships on the human player's board
  function humanPlacesShips() {
    humanBoard.placeShip(5, "Carrier", [0, 0], "horizontal");
    humanBoard.placeShip(4, "Battleship", [0, 1], "horizontal");
    humanBoard.placeShip(3, "Destroyer", [0, 2], "horizontal");
    humanBoard.placeShip(3, "Submarine", [0, 3], "horizontal");
    humanBoard.placeShip(2, "Patrol Boat", [0, 4], "horizontal");
  }

  // place ships on the computer's board (randomly)
  function compPlacesShips() {
    const ships = [
      [5, "Carrier"],
      [4, "Battleship"],
      [3, "Destroyer"],
      [3, "Submarine"],
      [2, "Patrol Boat"],
    ];

    ships.forEach((ship) => {
      let result;
      do {
        let startCoord = randomCoord();
        const direction = Math.random() < 0.5 ? "horizontal" : "vertical";
        result = compBoard.placeShip(ship[0], ship[1], startCoord, direction); //(length, name, startCoord, direction
      } while (!result.success);
    });
  }

  const playRound = (coord) => {
    // if it's the human's turn:
    //   call human player's attack with the computer's board and the given coord
    //   check if allSunk is true on the computer's board — if so, game is over
    if (turn === "human") {
      const attackResult = humanPlayer.attack(compBoard, coord);

      if (!attackResult.success) {
        return { gameOver: false, attackResult };
      }

      if (attackResult.allSunk) {
        return { gameOver: true, winner: "Human" };
      }

      turn = "computer";
      return { gameOver: false, attackResult };
    }

    // if it's the computer's turn:
    //   call computer player's randomAttack with the human's board
    //   check if allSunk is true on the human's board — if so, game is over
    if (turn === "computer") {
      const attackResult = compPlayer.randomAttack(humanBoard);

      if (attackResult.allSunk) {
        return { gameOver: true, winner: "Computer" };
      }

      turn = "human";
      return { gameOver: false, attackResult };
    }
  };

  const getState = () => {
    // return current game state for the DOM to read:
    // both boards, whose turn it is, whether the game is over
    return {
      humanBoard: humanBoard.board,
      compBoard: compBoard.board,
      missedAttacks: {
        human: humanBoard.missedAttacks,
        comp: compBoard.missedAttacks,
      },
      attackedCoords: {
        human: humanBoard.attackedCoords,
        comp: compBoard.attackedCoords,
      },
      turn,
    };
  };

  return { placeShips, playRound, getState, humanBoard, compBoard };
};
