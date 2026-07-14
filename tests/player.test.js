import { Player } from "../src/player";
import { Gameboard } from "../src/gameboard";

describe("Player", () => {
  let humanPlayer;
  let computerPlayer;
  let enemyBoard;

  beforeEach(() => {
    humanPlayer = Player("Lotta", "human");
    computerPlayer = Player("Computer", "computer");
    enemyBoard = Gameboard();
  });

  describe("attack", () => {
    test("player has correct name", () => {
      expect(humanPlayer.name).toBe("Lotta");
    });

    test("player has correct type", () => {
      expect(humanPlayer.type).toBe("human");
    });

    test("attack returns hit when ship is at coordinate", () => {
      enemyBoard.placeShip(3, "Submarine", [0, 0], "horizontal");
      const result = humanPlayer.attack(enemyBoard, [0, 0]);
      expect(result.result).toBe("hit");
    });

    test("attack returns miss when no ship is at coordinate", () => {
      const result = humanPlayer.attack(enemyBoard, [5, 5]);
      expect(result.result).toBe("miss");
    });

    test("attack rejects already attacked coordinate", () => {
      humanPlayer.attack(enemyBoard, [5, 5]);
      const result = humanPlayer.attack(enemyBoard, [5, 5]);
      expect(result.success).toBe(false);
    });
  });

  describe("randomAttack", () => {
    test("random attack returns a valid result", () => {
      const result = computerPlayer.randomAttack(enemyBoard);
      expect(result.success).toBe(true);
    });

    test("random attack never hits the same coordinate twice", () => {
      // attack every cell on the board except one
      for (let x = 0; x < 10; x++) {
        for (let y = 0; y < 10; y++) {
          if (x === 9 && y === 9) break;
          computerPlayer.randomAttack(enemyBoard);
        }
      }
      // the last remaining cell should still be attackable
      const result = computerPlayer.randomAttack(enemyBoard);
      expect(result.success).toBe(true);
    });
  });
});
