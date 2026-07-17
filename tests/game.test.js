import { Game } from "../src/game";

describe("Game", () => {
  let game;

  beforeEach(() => {
    game = Game();
    game.placeShips();
  });

  describe("placeShips", () => {
    test("human board has ships placed", () => {
      const state = game.getState();
      const hasShip = state.humanBoard.some((row) =>
        row.some((cell) => cell !== null),
      );
      expect(hasShip).toBe(true);
    });

    test("computer board has ships placed", () => {
      const state = game.getState();
      const hasShip = state.compBoard.some((row) =>
        row.some((cell) => cell !== null),
      );
      expect(hasShip).toBe(true);
    });
  });

  describe("playRound", () => {
    test("game starts as human turn", () => {
      const state = game.getState();
      expect(state.turn).toBe("human");
    });

    test("turn switches to computer after human attacks", () => {
      game.playRound([0, 0]);
      const state = game.getState();
      expect(state.turn).toBe("computer");
    });

    test("human attack returns a valid result", () => {
      const result = game.playRound([0, 0]);
      expect(result.gameOver).toBe(false);
    });
  });

  describe("getState", () => {
    test("getState returns both boards", () => {
      const state = game.getState();
      expect(state.humanBoard).toBeDefined();
      expect(state.compBoard).toBeDefined();
    });

    test("getState returns missed attacks", () => {
      const state = game.getState();
      expect(state.missedAttacks).toBeDefined();
    });

    test("getState returns current turn", () => {
      const state = game.getState();
      expect(state.turn).toBeDefined();
    });
  });
});
