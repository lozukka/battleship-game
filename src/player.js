import { positionKey } from "./utils.js";
import { randomCoord } from "./utils.js";

export const Player = (name, type) => {
  const usedCoords = new Set();

  const attack = (enemyBoard, coord) => {
    return enemyBoard.receiveAttack(coord);
  };

  const randomAttack = (enemyBoard) => {
    let coord;
    do {
      coord = randomCoord();
    } while (usedCoords.has(positionKey(coord)));

    usedCoords.add(positionKey(coord));
    return attack(enemyBoard, coord);
  };

  return { name, type, attack, randomAttack };
};
