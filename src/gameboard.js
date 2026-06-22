import { Ship } from "../src/ship";

export const Gameboard = () => {
  let board = Array.from({ length: 10 }, () => Array(10).fill(null));

  function placeShip(length, name, startCoord, direction) {
    const ship = Ship(length, name);
    const placedCoord = [[startCoord]];
    const placed = new Set();
    placed.add(positionKey(startCoord));

    if (direction === "horizontally") {
      for (let i = 0; i < length.length; i++) {
        const newCoord = [];
        newCoord.push(startCoord[0] + 1, startCoord[1]);
      }
      return newCoord;
    } else {
      for (let i = 0; i < length.length; i++) {
        const newCoord = [];
        newCoord.push(startCoord[0], startCoord[1] + 1);
      }
      return newCoord;
    }
  }
  function positionKey([x, y]) {
    return `${x}, ${y}`;
  }
  return { board };
};
