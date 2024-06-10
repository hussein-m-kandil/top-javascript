import { describe, test, expect } from '@jest/globals';
import { GameBoard } from '../game-board';
import { Player } from './player';

describe("Test the 'Player' function", () => {
  test('should exist and be of type function', () => {
    expect(Player).toBeDefined();
    expect(Player).toBeInstanceOf(Function);
  });

  test('should be immutable', () => {
    expect(() => {
      Player.foo = {};
    }).toThrowError();
    expect(() => {
      Player.prototype = {};
    }).toThrowError();
    expect(() => Object.setPrototypeOf(Player, {})).toThrowError();
    expect(() => Object.setPrototypeOf(Player.prototype, {})).toThrowError();
  });

  test('should throw Error on call with invalid type', () => {
    expect(() => Player()).not.toThrowError();
    expect(() => Player('human')).toThrowError();
    expect(() => Player('computer')).toThrowError();
    expect(() => Player(Player.TYPES.HUMAN)).not.toThrowError();
    expect(() => Player(Player.TYPES.COMPUTER)).not.toThrowError();
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

  test("should have 'type' property of type 'string'", () => {
    expect(player.type).toBeDefined();
    expect(typeof player.type).toBe(typeof Player.TYPES.COMPUTER);
  });

  test("should have 'type' of 'computer' on call without argument", () => {
    expect(Player().type).toBe(Player.TYPES.COMPUTER);
  });

  test("should have 'gameBoard' property as an instance of 'GameBoard'", () => {
    expect(player.gameBoard).toBeDefined();
    expect(player.gameBoard).toBeInstanceOf(GameBoard);
  });
});
