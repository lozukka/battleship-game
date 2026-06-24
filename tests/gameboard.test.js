import { Gameboard } from "../src/gameboard";

describe("Gameboard", () => {
  let board;

  beforeEach(() => {
    board = Gameboard();
  });

  describe("placeShip", () => {
    test("places a ship horizontally", () => {
      const result = board.placeShip(3, "Submarine", [0, 0], "horizontal");
      expect(result.success).toBe(true);
    });

    test("places a ship vertically", () => {
      const result = board.placeShip(3, "Submarine", [0, 0], "vertical");
      expect(result.success).toBe(true);
    });

    test("rejects a ship placed out of bounds horizontally", () => {
      const result = board.placeShip(3, "Submarine", [8, 0], "horizontal");
      expect(result.success).toBe(false);
    });

    test("rejects a ship placed out of bounds vertically", () => {
      const result = board.placeShip(3, "Submarine", [0, 8], "vertical");
      expect(result.success).toBe(false);
    });

    test("rejects overlapping ships", () => {
      board.placeShip(3, "Submarine", [0, 0], "horizontal");
      const result = board.placeShip(3, "Destroyer", [2, 0], "vertical");
      expect(result.success).toBe(false);
    });
  });
});
