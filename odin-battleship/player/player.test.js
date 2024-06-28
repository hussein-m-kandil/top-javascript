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
  const computer = Player(Player.TYPES.COMPUTER);
  const human = Player(Player.TYPES.HUMAN);
  const boardHeight = computer.gameBoard.board.length;
  const boardWidth = computer.gameBoard.board[0]?.length ?? 0;
  const boardCellsCount = boardHeight * boardWidth;
  const actualPlays = [];

  const attackHandlerMock = jest.fn((cellPair) => {
    actualPlays.push([...cellPair]);
    human.gameBoard.receiveAttack(cellPair);
  });

  const gameOverHandlerMock = jest.fn(() => {});

  beforeAll(() => {
    gameEvents.add(gameEvents.ATTACK, attackHandlerMock);
    gameEvents.add(gameEvents.GAME_OVER, gameOverHandlerMock);
  });

  afterAll(() => {
    gameEvents.remove(gameEvents.ATTACK, attackHandlerMock);
    gameEvents.remove(gameEvents.GAME_OVER, gameOverHandlerMock);
  });

  test("should computer play covers all board's cells (play on each cell once)", () => {
    let counter = 0;
    while (counter < boardCellsCount) {
      counter++;
      computer.play();
      expect(actualPlays.includes(attackHandlerMock.mock.lastCall[0])).toBe(
        false,
      );
    }
    expect(attackHandlerMock.mock.calls.length).toBe(counter);
  });

  test('should emit game-over event on any extra call (after covering all board cells)', () => {
    const extraPlaysCount = 7;
    for (let i = 0; i < extraPlaysCount; i++) {
      computer.play();
    }
    expect(gameOverHandlerMock.mock.calls.length).toBe(extraPlaysCount);
  });
});

describe('Test that the computer plays smartly', () => {
  let human = Player(Player.TYPES.HUMAN);
  let computer = Player(Player.TYPES.COMPUTER);
  let currentTarget = null;
  let prevTarget = null;
  let miss = false;
  let hit = false;
  const boardHeight = computer.gameBoard.board.length;
  const boardWidth = computer.gameBoard.board[0]?.length ?? 0;
  const boardCellsCount = boardHeight * boardWidth;
  const stringTargetedCells = [];
  const humanSunkShipsAreas = [];
  const highPriorityTargets = [];

  const isPartOfSunkShip = ([i, j]) => {
    return humanSunkShipsAreas.some((shipArea) => {
      const indexInSunkShipArea = shipArea.findIndex(
        ([sunkI, sunkJ]) => sunkI === i && sunkJ === j,
      );
      return indexInSunkShipArea >= 0;
    });
  };

  const findCellsAroundPartlySunkShip = () => {
    highPriorityTargets.splice(0);
    const V_DIR = 'V';
    const H_DIR = 'H';
    const board = human.gameBoard.board;
    const isTrueCond = (condValue, boolOpt, condRef) => {
      if (boolOpt === 'gtOrEq') return condValue >= condRef;
      return condValue < condRef;
    };
    const searchInOneDir = (varI, constI, mod, dir, boolOpt, condRef) => {
      let x = varI + mod;
      let [newI, newJ] = dir === V_DIR ? [x, constI] : [constI, x];
      let newCell = board[newI]?.[newJ];
      if (newCell && !isPartOfSunkShip([newI, newJ])) {
        while (isTrueCond(x, boolOpt, condRef) && newCell.attacked) {
          x += mod;
          [newI, newJ] = dir === V_DIR ? [x, constI] : [constI, x];
          newCell = board[newI]?.[newJ];
        }
        const isEqualToThis = ([medI, medJ]) => medI === newI && medJ === newJ;
        const notInHigh = highPriorityTargets.findIndex(isEqualToThis) < 0;
        if (newCell && !newCell.attacked && !newCell.missed && notInHigh) {
          highPriorityTargets.push([newI, newJ]);
        }
      }
    };
    board.forEach((row, i) => {
      row.forEach((cell, j) => {
        if (cell.attacked && !isPartOfSunkShip([i, j])) {
          const countOfHPT = highPriorityTargets.length;
          if (
            (board[i - 1]?.[j]?.attacked && !isPartOfSunkShip([i - 1, j])) ||
            (board[i + 1]?.[j]?.attacked && !isPartOfSunkShip([i + 1, j]))
          ) {
            searchInOneDir(i, j, -1, V_DIR, 'gtOrEq', 0); // TOP
            searchInOneDir(i, j, 1, V_DIR, 'lt', boardHeight); // DOWN
          } else if (
            (board[i][j - 1]?.attacked && !isPartOfSunkShip([i, j - 1])) ||
            (board[i][j + 1]?.attacked && !isPartOfSunkShip([i, j + 1]))
          ) {
            searchInOneDir(j, i, -1, H_DIR, 'gtOrEq', 0); // LEFT
            searchInOneDir(j, i, 1, H_DIR, 'lt', boardWidth); // RIGHT
          }
          if (countOfHPT === highPriorityTargets.length) {
            searchInOneDir(i, j, -1, V_DIR, 'gtOrEq', 0);
            searchInOneDir(i, j, 1, V_DIR, 'lt', boardHeight);
            searchInOneDir(j, i, -1, H_DIR, 'gtOrEq', 0);
            searchInOneDir(j, i, 1, H_DIR, 'lt', boardWidth);
          }
        }
      });
    });
  };

  const shipIsSunkHandlerMock = jest.fn((shipArea) => {
    const sunkShipArea = [];
    shipArea.forEach((shipCellPair) => sunkShipArea.push([...shipCellPair]));
    humanSunkShipsAreas.push(sunkShipArea);
  });

  const attackHandlerMock = jest.fn((cellPair) => {
    prevTarget = currentTarget;
    currentTarget = cellPair;
    stringTargetedCells.push(cellPair.toString());
    human.gameBoard.receiveAttack(cellPair);
  });

  const hitHandlerMock = jest.fn(() => {
    hit = true;
    miss = false;
  });
  const missHandler = () => {
    hit = false;
    miss = true;
  };

  beforeAll(() => {
    gameEvents.add(gameEvents.SHIP_IS_SUNK, shipIsSunkHandlerMock);
    gameEvents.add(gameEvents.ATTACK, attackHandlerMock);
    gameEvents.add(gameEvents.HIT, hitHandlerMock);
    gameEvents.add(gameEvents.MISS, missHandler);
  });

  afterAll(() => {
    gameEvents.remove(gameEvents.SHIP_IS_SUNK, shipIsSunkHandlerMock);
    gameEvents.remove(gameEvents.ATTACK, attackHandlerMock);
    gameEvents.remove(gameEvents.HIT, hitHandlerMock);
    gameEvents.remove(gameEvents.MISS, missHandler);
  });

  beforeEach(() => {
    prevTarget = null;
    currentTarget = null;
    human = Player(Player.TYPES.HUMAN);
    computer = Player(Player.TYPES.COMPUTER);
    miss = false;
    hit = false;
    humanSunkShipsAreas.splice(0);
    highPriorityTargets.splice(0);
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

  test('should target all empty cells near to an attacked cell', () => {
    let counter = 0;
    while (counter < boardCellsCount - 1) {
      counter++;
      findCellsAroundPartlySunkShip();
      const cell = miss ? highPriorityTargets.shift() : null;
      expect(() => computer.play()).not.toThrowError();
      if (cell) {
        expect(attackHandlerMock.mock.lastCall[0]).toStrictEqual(cell);
      }
    }
    expect(attackHandlerMock.mock.calls.length).toBe(counter + 1);
  });
});
