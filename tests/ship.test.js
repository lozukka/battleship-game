import { Ship } from "../src/ship";

describe("ship", () => {
  test("create a ship with correct length", () => {
    const patrolBoat = Ship(2, "Patrol Boat");
    expect(patrolBoat.length).toBe(2);
  });
  test("create a ship with correct name", () => {
    const carrier = Ship(5, "Carrier");
    expect(carrier.name).toBe("Carrier");
  });
  test("hit correct ship", () => {
    const hitCarrier = Ship(5, "Carrier");
    hitCarrier.hit();
    expect(hitCarrier.getHits()).toBe(1);
  });
  test("sunk the ship if hits = length", () => {
    const hitPatrol = Ship(2, "Patrol Boat");
    hitPatrol.hit();
    hitPatrol.hit();
    expect(hitPatrol.getIsSunk()).toBeTruthy();
  });
});
