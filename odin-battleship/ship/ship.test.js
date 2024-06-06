import { describe, test, expect } from '@jest/globals';
import { Ship } from './ship.js';

describe("Test the existence of the 'Ship' function & whether it is validating its arguments", () => {
  test('should be of type function', () => {
    expect(Ship).toBeInstanceOf(Function);
  });

  test('should throw an error if not given "length" of type "number"; 1 < length < 6', () => {
    expect(() => Ship()).toThrowError();
    expect(() => Ship('1')).toThrowError();
    expect(() => Ship(-1)).toThrowError();
    expect(() => Ship(0)).toThrowError();
    expect(() => Ship(1)).toThrowError();
    expect(() => Ship(2)).not.toThrowError();
    expect(() => Ship(3)).not.toThrowError();
    expect(() => Ship(4)).not.toThrowError();
    expect(() => Ship(5)).not.toThrowError();
    expect(() => Ship(6)).toThrowError();
  });
});

describe("Test whether the 'Ship' function is working correctly", () => {
  const ship = Ship(5);

  test('should return an object has { length: number, hits: number, hit: () -> undefined, isSunk: () -> boolean }', () => {
    expect(ship).not.toBeInstanceOf(Array);
    expect(ship).toBeInstanceOf(Object);
    expect(ship.length).toBeDefined();
    expect(Number.isInteger(ship.length)).toBeTruthy();
    expect(ship.hits).toBeDefined();
    expect(Number.isInteger(ship.hits)).toBeTruthy();
    expect(ship.hit).toBeInstanceOf(Function);
    expect(ship.hit()).toBeUndefined();
    expect(ship.isSunk).toBeInstanceOf(Function);
    expect(typeof ship.isSunk()).toBe('boolean');
  });

  test('should ship members be not writable', () => {
    expect(() => {
      ship.length = 7;
    }).toThrowError();
    expect(() => {
      ship.hits = 7;
    }).toThrowError();
    expect(() => {
      ship.hit = () => 7;
    }).toThrowError();
    expect(() => {
      ship.isSunk = () => 'Hi!';
    }).toThrowError();
  });

  test('should ship object be instance of Ship', () => {
    expect(ship).toBeInstanceOf(Ship);
  });
});

describe('Test the correctness of the members of a Ship', () => {
  const SHIP_LENGTH = 5;
  const ship = Ship(SHIP_LENGTH);
  test("should Ship's length be correct", () => {
    expect(ship.length).toBe(SHIP_LENGTH);
  });

  test("should Ship's 'hit()' works correctly & 'hits' & 'isSunk()' returns correct answers", () => {
    expect(ship.hits).toBe(0);
    expect(ship.isSunk()).toBe(false);
    for (let i = 0; i < SHIP_LENGTH; i++) ship.hit();
    expect(ship.hits).toBe(SHIP_LENGTH);
    expect(ship.isSunk()).toBe(true);
  });

  test("should ship's 'hits' not exceed 'length'; once it is sunk, gets no more hits", () => {
    expect(ship.isSunk()).toBe(true);
    ship.hit();
    expect(ship.hits).toBe(ship.length);
  });
});
