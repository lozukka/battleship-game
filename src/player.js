export const Player = (name, type) => {
  const usedCoords = new Set();

  const attack = (enemyBoard, coord) => {
    return enemyBoard.receiveAttack(coord);
  };

  const randomAttack = (enemyBoard) => {
    let coord;
    do {
      coord = [Math.floor(Math.random() * 10), Math.floor(Math.random() * 10)];
    } while (usedCoords.has(position(coord)));

    usedCoords.add(position(coord));
    return attack(enemyBoard, coord);
  };

  function position([x, y]) {
    return `${x}, ${y}`;
  }
  return { name, type, attack, randomAttack };
};
