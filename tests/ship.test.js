import { Ship } from "../src/ship";

describe("ship", () => {
  test("create a ship", () => {
    const patrolBoat = Ship(2, "Patrol Boat");
    expect(patrolBoat.length).toBe(2);
  });
  test("create a ship with correct name", () => {
    const carrier = Ship(5, "Carrier");
    expect(carrier.name).toBe("Carrier");
  });
});
