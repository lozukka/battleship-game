import { Player } from "../src/player";
import { Gameboard } from "../src/gameboard";

export const Game = () => {
  // create two players — one human, one computer
  const humanPlayer = Player("Human", "human");
  const compPlayer = Player("Computer", "computer");
  // create two gameboards — one for each player
  const humanBoard = Gameboard(); //human places ships here, comp attacks this
  const compBoard = Gameboard(); //computer places ships here, human attacks this
  // track whose turn it is
  let turn;

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
        let startCoord = [
          Math.floor(Math.random() * 10),
          Math.floor(Math.random() * 10),
        ];
        const direction = Math.random() < 0.5 ? "horizontal" : "vertical";
        result = compBoard.placeShip(ship[0], ship[1], startCoord, direction); //(length, name, startCoord, direction
      } while (!result.success);
    });
  }

  const playRound = (coord) => {
    // if it's the human's turn:
    //   call human player's attack with the computer's board and the given coord
    //   check if allSunk is true on the computer's board — if so, game is over
    // if it's the computer's turn:
    //   call computer player's randomAttack with the human's board
    //   check if allSunk is true on the human's board — if so, game is over
    // switch turns after each round
  };

  const checkGameOver = () => {
    // return true if all ships on either board are sunk
    // return who won
  };

  const getState = () => {
    // return current game state for the DOM to read:
    // both boards, whose turn it is, whether the game is over
  };

  return { placeShips, playRound, checkGameOver, getState };
};
