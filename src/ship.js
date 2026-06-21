export const Ship = (length, name) => {
  let hits = 0;
  let isSunk = false;

  const hit = () => {
    hits += 1;
    if (hits === length) {
      isSunk = true;
    }
  };

  const getHits = () => hits;
  const getIsSunk = () => isSunk;

  return { length, name, hit, getHits, getIsSunk };
};
