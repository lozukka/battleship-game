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
  describe("receiveAttack", () => {
    test("returns hit when attacking a ship coordinate", () => {
      board.placeShip(3, "Submarine", [0, 0], "horizontal");
      const result = board.receiveAttack([0, 0]);
      expect(result.result).toBe("hit");
    });

    test("returns miss when attacking an empty coordinate", () => {
      const result = board.receiveAttack([5, 5]);
      expect(result.result).toBe("miss");
    });

    test("records missed attacks", () => {
      board.receiveAttack([5, 5]);
      expect(board.missedAttacks.has("5, 5")).toBe(true);
    });

    test("increments ship hits when attacked", () => {
      board.placeShip(3, "Submarine", [0, 0], "horizontal");
      board.receiveAttack([0, 0]);
      // need to get the ship from the board to check its hits
      expect(board.board[0][0].getHits()).toBe(1);
    });

    test("rejects attacking the same coordinate twice", () => {
      board.receiveAttack([5, 5]);
      const result = board.receiveAttack([5, 5]);
      expect(result.success).toBe(false);
    });
  });
});
