import { Ship } from "../src/ship.js";
import { positionKey } from "./utils.js";

export const Gameboard = () => {
  let board = Array.from({ length: 10 }, () => Array(10).fill(null));

  const shipCoords = new Map();
  const missedAttacks = new Set();
  const attackedCoords = new Set();

  function placeShip(length, name, startCoord, direction) {
    const ship = Ship(length, name);
    const coords = [];

    for (let i = 0; i < length; i++) {
      const coord =
        direction === "horizontal"
          ? [startCoord[0] + i, startCoord[1]]
          : [startCoord[0], startCoord[1] + i];

      coords.push(coord);
    }
    //validation
    for (const coord of coords) {
      const [x, y] = coord;
      if (x < 0 || x >= 10 || y < 0 || y >= 10) {
        return { success: false, error: "Ship out of bounds" };
      }
      if (shipCoords.has(positionKey(coord))) {
        return { success: false, error: "Position already occupied" };
      }
    }
    for (const coord of coords) {
      const key = positionKey(coord);
      shipCoords.set(key, ship);
      board[coord[1]][coord[0]] = ship;
    }
    return { success: true };
  }

  function receiveAttack(coord) {
    const key = positionKey(coord);

    if (attackedCoords.has(key)) {
      return { success: false, error: "Already attacked this coordinate" };
    }
    attackedCoords.add(key);

    if (missedAttacks.has(key)) {
      return { success: false, error: "Already attacked this coordinate" };
    }

    missedAttacks.add(key);

    if (shipCoords.has(key)) {
      const ship = shipCoords.get(key);
      ship.hit();
      //check for sunken ships
      return {
        success: true,
        result: "hit",
        sunk: ship.getIsSunk(),
        allSunk: checkAllSunk(),
      };
    } else {
      missedAttacks.add(key);
      return {
        success: true,
        result: "miss",
        allSunk: false,
      };
    }
  }

  //game over detection
  function checkAllSunk() {
    const allShips = [...new Set(shipCoords.values())];
    return allShips.every((ship) => ship.getIsSunk());
  }
  return { board, placeShip, receiveAttack, missedAttacks, attackedCoords };
};
