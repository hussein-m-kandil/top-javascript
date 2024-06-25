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
  const boardHeight = computer.gameBoard.board.length;
  const boardWidth = computer.gameBoard.board[0]?.length ?? 0;
  const boardCellsCount = boardHeight * boardWidth;
  let prevTarget = null;
  let currentTarget = null;
  const stringTargetedCells = [];
  const mediumPriorityTargets = [];
  const searchForMediumPriorityTargets = () => {
    const modifiers = [
      [0, -1], // LEFT
      [0, 1], // RIGHT
      [-1, 0], // TOP
      [1, 0], // BOTTOM
    ];
    for (let i = 0; i < human.gameBoard.board.length; i++) {
      for (let j = 0; j < human.gameBoard.board.length; j++) {
        if (human.gameBoard.board[i][j].attacked) {
          for (let k = 0; k < modifiers.length; k++) {
            const newI = i + modifiers[k][0];
            const newJ = j + modifiers[k][1];
            const adjacentC = human.gameBoard.board[newI]?.[newJ];
            if (adjacentC && !adjacentC.missed && !adjacentC.attacked) {
              const isExist = ([oldI, oldJ]) => oldI === newI && oldJ === newJ;
              if (mediumPriorityTargets.findIndex(isExist) < 0) {
                mediumPriorityTargets.push([newI, newJ]);
              }
            }
          }
        }
      }
    }
  };

  const removeFormPrioritizedTargets = ([i, j]) => {
    const indexInMediumPriority = mediumPriorityTargets.find(
      ([savedI, savedJ]) => savedI === i && savedJ === j,
    );
    if (indexInMediumPriority > -1) {
      mediumPriorityTargets.splice(indexInMediumPriority, 1);
    }
  };

  const attackHandlerMock = jest.fn((cellPair) => {
    prevTarget = currentTarget;
    currentTarget = cellPair;
    stringTargetedCells.push(cellPair.toString());
    human.gameBoard.receiveAttack(cellPair);
    removeFormPrioritizedTargets(cellPair);
  });

  const findMissedHoleInShip = () => {
    for (
      let shipIndex = 0;
      shipIndex < human.gameBoard.shipsAreas.length;
      shipIndex++
    ) {
      const shipArea = human.gameBoard.shipsAreas[shipIndex];
      if (!human.gameBoard.ships[shipIndex].isSunk()) {
        const shipAttacked = shipArea.some(([i, j]) => {
          return human.gameBoard.board[i][j].attacked;
        });
        if (shipAttacked) {
          for (let cellIndex = 0; cellIndex < shipArea.length; cellIndex++) {
            const [i, j] = shipArea[cellIndex];
            const firstCell = cellIndex === 0;
            const lastCell = cellIndex === shipArea.length - 1;
            if (!firstCell && !lastCell) {
              const [prevI, prevJ] = shipArea[cellIndex - 1];
              const [nextI, nextJ] = shipArea[cellIndex + 1];
              return (
                human.gameBoard.board[prevI][prevJ].attacked &&
                !human.gameBoard.board[i][j].attacked &&
                human.gameBoard.board[nextI][nextJ].attacked
              );
            }
          }
        }
      }
    }
    return false;
  };

  let anyShipAttackedThenLeavedNotSunk = false;
  let shipIsHoled = false;
  let consecutiveMissesCount = 0;
  let hit = false;
  let miss = false;
  const hitHandlerMock = jest.fn(() => {
    mediumPriorityTargets.splice(0);
    miss = false;
    hit = true;
    consecutiveMissesCount = 0;
  });
  const missHandler = (cellPair) => {
    removeFormPrioritizedTargets(cellPair);
    searchForMediumPriorityTargets();
    hit = false;
    miss = true;
    consecutiveMissesCount++;
    shipIsHoled = findMissedHoleInShip();
    if (consecutiveMissesCount >= 2) {
      if (!anyShipAttackedThenLeavedNotSunk) {
        anyShipAttackedThenLeavedNotSunk = shipIsHoled;
      }
    }
  };

  beforeAll(() => {
    gameEvents.add(gameEvents.ATTACK, attackHandlerMock);
    gameEvents.add(gameEvents.HIT, hitHandlerMock);
    gameEvents.add(gameEvents.MISS, missHandler);
  });

  afterAll(() => {
    gameEvents.remove(gameEvents.ATTACK, attackHandlerMock);
    gameEvents.remove(gameEvents.HIT, hitHandlerMock);
    gameEvents.remove(gameEvents.MISS, missHandler);
  });

  beforeEach(() => {
    prevTarget = null;
    currentTarget = null;
    human = Player(Player.TYPES.HUMAN);
    computer = Player(Player.TYPES.COMPUTER);
    consecutiveMissesCount = 0;
    hit = false;
    miss = false;
    shipIsHoled = false;
    mediumPriorityTargets.splice(0);
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

  test('should target all empty cells around an attacked cell', () => {
    let counter = 0;
    while (counter < boardCellsCount - 1) {
      counter++;
      const cell = miss && !shipIsHoled ? mediumPriorityTargets.shift() : null;
      computer.play();
      if (cell) {
        expect(attackHandlerMock.mock.lastCall[0]).toStrictEqual(cell);
      }
    }
    expect(attackHandlerMock.mock.calls.length).toBe(counter + 1);
  });

  test('should not leave any ship not sunk after successful attack on it', () => {
    expect(anyShipAttackedThenLeavedNotSunk).toBe(false);
  });
});
