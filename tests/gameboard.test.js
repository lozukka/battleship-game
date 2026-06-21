import { Gameboard } from "../src/gameboard";

describe("gameboard", () => {
  test("create an empty gameboard", () => {
    const emptyBoard = Gameboard();
    expect(emptyBoard.length).toBe(0);
  });
});
