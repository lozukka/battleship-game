export const positionKey = ([x, y]) => {
  return `${x}, ${y}`;
};

export const randomCoord = () => {
  let coord = [Math.floor(Math.random() * 10), Math.floor(Math.random() * 10)];
  return coord;
};
