import { describe, test, expect } from '@jest/globals';
import { GameBoard } from '../game-board';
import { Player } from './player';

describe("Test the 'Player' function", () => {
  test('should exist and be of type function', () => {
    expect(Player).toBeDefined();
    expect(Player).toBeInstanceOf(Function);
  });

  test('should throw Error on call with invalid type', () => {
    expect(() => Player()).not.toThrowError();
    expect(() => Player('reel')).toThrowError();
    expect(() => Player('human')).not.toThrowError();
    expect(() => Player('computer')).not.toThrowError();
  });

  const player = Player();

  test("should return an object; instance of 'player'", () => {
    expect(player).toBeInstanceOf(Object);
    expect(player).not.toBeInstanceOf(Array);
    expect(player).toBeInstanceOf(Player);
  });

  test('should return an immutable object', () => {
    expect(() => {
      player.foo = 'bar';
    }).toThrowError();
    expect(() => {
      player.prototype = {};
    }).toThrowError();
    expect(() => {
      Object.setPrototypeOf(player, {});
    }).toThrowError();
    expect(() => {
      Object.setPrototypeOf(player.prototype, {});
    }).toThrowError();
  });
});

describe("Test an instance of 'Player'", () => {
  const player = Player();
  const types = Player.TYPES;

  test("should have 'type' property of type 'string'", () => {
    expect(player.type).toBeDefined();
    expect(typeof player.type).toBe(typeof types[0]);
  });

  test("should have 'type' of 'computer' on call without argument", () => {
    expect(Player().type).toBe(types[0]);
  });

  test("should 'type' property be one of a specific set of types", () => {
    expect(types.includes(player.type)).toBe(true);
  });

  test("should have 'gameBoard' property as an instance of 'GameBoard'", () => {
    expect(player.gameBoard).toBeDefined();
    expect(player.gameBoard).toBeInstanceOf(GameBoard);
  });
});
