import { Ship } from "../src/ship";

export const Gameboard = () => {
  let board = Array.from({ length: 10 }, () => Array(10).fill(null));

  const shipCoords = new Map();

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

  function positionKey([x, y]) {
    return `${x}, ${y}`;
  }
  return { board, placeShip };
};
