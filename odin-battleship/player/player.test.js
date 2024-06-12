import {
  jest,
  describe,
  test,
  expect,
  beforeAll,
  afterAll,
  beforeEach,
} from '@jest/globals';
import { GameBoard } from '../game-board';
import { gameEvents } from '../game-events';
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

  test("should player type 'human' does not have 'play' method", () => {
    expect(Player(Player.TYPES.HUMAN).play).not.toBeDefined();
  });

  test("should player type 'computer' has 'play' method", () => {
    expect(player.play).toBeDefined();
  });
});

describe("Test the computer-player's 'play' method", () => {
  const attackHandlerMock = jest.fn(() => {});
  const player = Player();

  beforeAll(() => {
    gameEvents.add(gameEvents.ATTACK, attackHandlerMock);
    player.play();
  });

  afterAll(() => gameEvents.remove(gameEvents.ATTACK, attackHandlerMock));

  test("should 'gameEvents.add' get called with attack event", () => {
    expect(attackHandlerMock.mock.calls.length).toBe(1);
    expect(attackHandlerMock.mock.calls[0].length).toBe(1);
  });

  test('should the pair of numbers that given to attack event handler be less than board side length', () => {
    expect(Array.isArray(attackHandlerMock.mock.calls[0][0])).toBe(true);
    expect(
      attackHandlerMock.mock.calls[0][0].every((n) => typeof n === 'number'),
    ).toBe(true);
    const cellPlacePair = attackHandlerMock.mock.calls[0][0];
    expect(cellPlacePair[0]).toBeLessThan(player.gameBoard.board.length);
    expect(cellPlacePair[1]).toBeLessThan(
      player.gameBoard.board[0]?.length ?? 0,
    );
  });
});

describe('Test that the computer plays correctly', () => {
  const attackHandlerMock = jest.fn(() => {});
  const gameOverHandlerMock = jest.fn(() => {});
  const player = Player();

  beforeAll(() => {
    gameEvents.add(gameEvents.ATTACK, attackHandlerMock);
    gameEvents.add(gameEvents.GAME_OVER, gameOverHandlerMock);
  });

  afterAll(() => {
    gameEvents.remove(gameEvents.ATTACK, attackHandlerMock);
    gameEvents.remove(gameEvents.GAME_OVER, gameOverHandlerMock);
  });

  test("should computer play covers all board's cells (play on each cell once)", () => {
    const boardHeight = player.gameBoard.board.length;
    const boardWidth = player.gameBoard.board[0]?.length ?? 0;
    const boardCellsCount = boardHeight * boardWidth;
    const actualPlays = [];
    let counter = 0;
    while (counter < boardCellsCount) {
      counter++;
      player.play();
      expect(actualPlays.includes(attackHandlerMock.mock.lastCall[0])).toBe(
        false,
      );
    }
    expect(attackHandlerMock.mock.calls.length).toBe(counter);
  });

  test('should emit game-over event on any extra call (after covering all board cells)', () => {
    const extraPlaysCount = 7;
    for (let i = 0; i < extraPlaysCount; i++) {
      player.play();
    }
    expect(gameOverHandlerMock.mock.calls.length).toBe(extraPlaysCount);
  });
});

describe('Test that the computer plays smartly', () => {
  let computer = Player();
  const boardHeight = computer.gameBoard.board.length;
  const boardWidth = computer.gameBoard.board[0]?.length ?? 0;
  const boardCellsCount = boardHeight * boardWidth;

  let prevTarget = null;
  let currentTarget = null;
  let human = Player(Player.TYPES.HUMAN);
  const stringTargetedCells = [];
  const attackHandlerMock = jest.fn((cellPair) => {
    prevTarget = currentTarget;
    currentTarget = cellPair;
    stringTargetedCells.push(cellPair.toString());
    human.gameBoard.receiveAttack(cellPair);
  });

  let hit = false;
  const hitHandlerMock = jest.fn(() => {
    hit = true;
  });

  beforeAll(() => {
    gameEvents.add(gameEvents.ATTACK, attackHandlerMock);
    gameEvents.add(gameEvents.HIT, hitHandlerMock);
  });

  afterAll(() => {
    gameEvents.remove(gameEvents.ATTACK, attackHandlerMock);
    gameEvents.remove(gameEvents.HIT, hitHandlerMock);
  });

  beforeEach(() => {
    prevTarget = null;
    currentTarget = null;
    human = Player(Player.TYPES.HUMAN);
    computer = Player();
    stringTargetedCells.splice(0);
    attackHandlerMock.mockClear();
    hitHandlerMock.mockClear();
    computer.play();
  });

  test('should win a game without any problems & without a duplicated target', () => {
    let counter = 0;
    while (counter < boardCellsCount - 1) {
      counter++;
      expect(() => computer.play()).not.toThrowError();
      expect(
        stringTargetedCells.filter((t) => t === currentTarget.toString())
          .length,
      ).toBeLessThanOrEqual(1);
    }
    expect(attackHandlerMock.mock.calls.length).toBe(counter + 1);
  });

  test('should current target be adjacent to the previous target after a hit', () => {
    const DIRECTIONS = [
      [-1, 0],
      [0, 1],
      [1, 0],
      [0, -1],
    ];
    const stringAdjacentCells = [];
    let afterHit = false;
    let counter = 0;
    while (counter < boardCellsCount - 1) {
      counter++;
      expect(() => computer.play()).not.toThrowError();
      if (afterHit) {
        afterHit = false;
        stringAdjacentCells.splice(0);
        DIRECTIONS.forEach(([I, J]) => {
          const i = prevTarget[0] + I;
          const j = prevTarget[1] + J;
          if (i >= 0 && j >= 0 && i < boardHeight && j < boardWidth) {
            const stringAdjacentCellPair = [i, j].toString();
            if (
              !stringTargetedCells.includes(stringAdjacentCellPair) ||
              stringTargetedCells.at(-1) === stringAdjacentCellPair
            ) {
              stringAdjacentCells.push(stringAdjacentCellPair);
            }
          } else if (hit) {
            afterHit = true;
            hit = false;
          }
        });
        if (stringAdjacentCells.length > 0) {
          expect(stringAdjacentCells.includes(currentTarget.toString())).toBe(
            true,
          );
        }
      }
    }
    expect(attackHandlerMock.mock.calls.length).toBe(counter + 1);
  });
});
