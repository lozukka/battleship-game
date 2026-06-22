import { Ship } from "../src/ship";

export const Gameboard = () => {
  let board = Array.from({ length: 10 }, () => Array(10).fill(null));

  function placeShip(length, name, startCoord, direction) {
    const ship = Ship(length, name);
  }
  return { board };
};
