import {
  jest,
  describe,
  test,
  expect,
  beforeAll,
  afterAll,
} from '@jest/globals';
import { GameBoard } from './game-board.js';
import gameEvents from '../game-events/game-events.js';

describe("Test the 'GameBoard' function", () => {
  test('should exist', () => {
    expect(GameBoard).toBeDefined();
  });

  test("should be of type 'Function'", () => {
    expect(GameBoard).toBeInstanceOf(Function);
  });

  test('should return an object', () => {
    const gameBoard = GameBoard();
    expect(gameBoard).toBeInstanceOf(Object);
    expect(gameBoard).not.toBeInstanceOf(Array);
  });
});

describe("Test an instance of 'GameBoard'", () => {
  const gameBoard = GameBoard();

  test('should gameBoard object be instance of GameBoard', () => {
    expect(gameBoard).toBeInstanceOf(GameBoard);
  });

  test('should has board: Object[][]', () => {
    expect(gameBoard).toBeInstanceOf(Object);
    expect(gameBoard).not.toBeInstanceOf(Array);
    expect(gameBoard.board).toBeDefined();
    expect(gameBoard.board).toBeInstanceOf(Array);
    expect(gameBoard.board.length).toBe(10);
    gameBoard.board.forEach((row) => {
      expect(row).toBeInstanceOf(Array);
      expect(row.length).toBe(10);
      row.forEach((cell) => {
        expect(cell).toBeInstanceOf(Object);
        expect(cell.ship).toBeDefined();
        expect(typeof cell.ship).toBe('object'); // Yes, it could be 'null' ;)
        expect(cell.attacked).toBeDefined();
        expect(typeof cell.attacked).toBe('boolean');
        expect(cell.missed).toBeDefined();
        expect(typeof cell.missed).toBe('boolean');
      });
    });
  });

  test('should has ships; an array of ships used on board', () => {
    expect(gameBoard.ships).toBeDefined();
    expect(gameBoard.ships).toBeInstanceOf(Array);
  });

  test("should has shipsAreas; a 2D array of coordinates pairs for each ship's area", () => {
    expect(gameBoard.shipsAreas).toBeDefined();
    expect(gameBoard.ships).toBeInstanceOf(Array);
    gameBoard.shipsAreas.forEach((shipArea) => {
      expect(shipArea).toBeInstanceOf(Array);
      shipArea.forEach((pair) => {
        expect(pair).toBeInstanceOf(Array);
        expect(pair.length).toBe(2);
        expect(pair.every((x) => typeof x === 'number')).toBe(true);
      });
    });
  });

  test('should board has 5 types of ships', () => {
    let actualTotalLength = 0;
    const expectedTotalLength = gameBoard.ships.reduce(
      (acc, cur) => acc + cur.length,
      0,
    );
    const actualShips = [];
    gameBoard.board.forEach((row) =>
      row.forEach((cell) => {
        if (cell.ship) {
          if (!actualShips.includes(cell.ship)) {
            actualShips.push(cell.ship);
          }
          actualTotalLength++;
        }
      }),
    );
    expect(actualShips.length).toBe(gameBoard.ships.length);
    expect(actualTotalLength).toBe(expectedTotalLength);
  });

  test('should has receiveAttack: ([x: number, y: number]) -> undefined', () => {
    expect(gameBoard.receiveAttack).toBeDefined();
    expect(gameBoard.receiveAttack).toBeInstanceOf(Function);
  });

  test('should receiveAttack throw error on a call without arguments or with invalid coordinates', () => {
    expect(() => gameBoard.receiveAttack()).toThrowError();
    expect(() => gameBoard.receiveAttack([0, -1])).toThrowError();
    expect(() => gameBoard.receiveAttack([-1, 0])).toThrowError();
    expect(() => gameBoard.receiveAttack([10, 9])).toThrowError();
    expect(() => gameBoard.receiveAttack([9, 10])).toThrowError();
    expect(() => gameBoard.receiveAttack([0, 0])).not.toThrowError();
    expect(() => gameBoard.receiveAttack([9, 9])).not.toThrowError();
  });

  test('should receiveAttack work correctly', () => {
    const sunkShipsAreas = [];
    const shipIsSunkHandlerMock = jest.fn((shipArea) =>
      sunkShipsAreas.push(shipArea),
    );
    gameEvents.add(gameEvents.SHIP_IS_SUNK, shipIsSunkHandlerMock);
    const height = gameBoard.board.length;
    for (let i = 0; i < height; i++) {
      const width = gameBoard.board[i].length;
      for (let j = 0; j < width; j++) {
        gameBoard.receiveAttack([i, j]);
        const cell = gameBoard.board[i][j];
        if (cell.ship !== null) {
          expect(cell.attacked).toBe(true);
          expect(cell.missed).toBe(false);
        } else {
          expect(cell.attacked).toBe(false);
          expect(cell.missed).toBe(true);
        }
      }
    }
    gameBoard.board.forEach((row) =>
      row.forEach((cell) => {
        if (cell.ship !== null) {
          expect(cell.ship.isSunk()).toBe(true);
        }
      }),
    );
    expect(shipIsSunkHandlerMock).toBeCalledTimes(gameBoard.ships.length);
    const shipsAreas = [...gameBoard.shipsAreas];
    expect(
      sunkShipsAreas.every((sunkShipArea) => {
        const shipAreaIndex = shipsAreas.findIndex((shipArea) => {
          return `${shipArea}` === `${sunkShipArea}`;
        });
        if (shipAreaIndex > -1) {
          shipsAreas.splice(shipAreaIndex, 1);
          return true;
        }
        return false;
      }),
    ).toBe(true);
    gameEvents.remove(gameEvents.SHIP_IS_SUNK, shipIsSunkHandlerMock);
  });

  test('should returned object be immutable', () => {
    expect(() => {
      Object.setPrototypeOf(gameBoard, {});
    }).toThrowError();
    expect(() => {
      Object.prototype = {};
    }).toThrowError();
    expect(() => {
      Object.setPrototypeOf(gameBoard.prototype, {});
    }).toThrowError();
    expect(() => {
      gameBoard.board = {};
    }).toThrowError();
    expect(() => {
      gameBoard.receiveAttack = {};
    }).toThrowError();
  });

  test("should instantiate 'GameBoard' 10000 times without any problems", () => {
    const REPEAT_COUNT = 10000;
    const mockGameBoard = jest.fn(GameBoard);
    for (let i = 0; i < REPEAT_COUNT; i++) {
      mockGameBoard();
    }
    expect(mockGameBoard).toBeCalledTimes(REPEAT_COUNT);
  });
});

describe("Test GameBoard's moving methods", () => {
  const gameBoard = GameBoard();
  const movingMethods = [
    'moveShipUp',
    'moveShipDown',
    'moveShipLeft',
    'moveShipRight',
  ];
  const modifiers = [
    [-1, 0],
    [1, 0],
    [0, -1],
    [0, 1],
  ];

  test('should has moveShip & moveShipUp/Down/Left/Right: (shipIndex: number)', () => {
    expect(gameBoard.moveShip).toBeInstanceOf(Function);
    movingMethods.forEach((moveMethod) => {
      expect(gameBoard[moveMethod]).toBeInstanceOf(Function);
    });
  });

  test('should moveShipUp/Down/Left/Right throw error on a call with invalid ship index', () => {
    movingMethods.forEach((moveMethod) => {
      expect(() => gameBoard[moveMethod](117)).toThrowError();
    });
    gameBoard.shipsAreas.forEach((shipArea, i) => {
      movingMethods.forEach((moveMethod) => {
        expect(() => gameBoard[moveMethod](i)).not.toThrowError();
      });
    });
  });

  test('should moveShipUp/Down/Left/Right works correctly', () => {
    movingMethods.forEach((moveMethod, methodIndex) => {
      let loopsCount = 0;
      let movesCount = 0;
      do {
        loopsCount++;
        const gB = GameBoard();
        for (let i = 0; i < gB.ships.length; i++) {
          const oldShipArea = gB.shipsAreas[i];
          let moved = false;
          expect(() => {
            moved = gB[moveMethod](i);
          }).not.toThrowError();
          if (moved) {
            movesCount++;
            gB.shipsAreas[i].forEach(([newI, newJ], index) => {
              expect(newI).toBe(
                oldShipArea[index][0] + modifiers[methodIndex][0],
              );
              expect(newJ).toBe(
                oldShipArea[index][1] + modifiers[methodIndex][1],
              );
            });
          }
        }
      } while (movesCount < 1 && loopsCount < 100);
      expect(movesCount).toBeGreaterThanOrEqual(1);
    });
  });

  test('should moveShip throw error on a call with invalid args', () => {
    expect(() => gameBoard.moveShip()).toThrowError();
    expect(() => gameBoard.moveShip(true, 'Blah')).toThrowError();
    const outBoardCell = [0, 10];
    const shipCell = gameBoard.shipsAreas[0][0];
    let emptyCell;
    let emptyCellFound = false;
    for (let i = 0; i < gameBoard.board.length; i++) {
      for (let j = 0; j < gameBoard.board[0]?.length ?? 0; j++) {
        if (!gameBoard.board[i][j].ship) {
          emptyCell = [i, j];
          emptyCellFound = true;
          break;
        }
      }
      if (emptyCellFound) break;
    }
    if (emptyCell) {
      expect(() => gameBoard.moveShip(shipCell, outBoardCell)).toThrowError();
      expect(() => gameBoard.moveShip(shipCell, emptyCell)).not.toThrowError();
    }
  });

  test('should moveShip work correctly', () => {
    let movesCount = 0;
    const movedEventHandlerMock = jest.fn(() => {
      movesCount++;
    });
    gameEvents.add(gameEvents.SHIP_MOVED, movedEventHandlerMock);
    const MAX_LOOPS = 100;
    const SHIP_AREA_INDEX = 0;
    const newShipArea = [];
    let gb;
    let shipAreaToMove;
    let loopCounter = 0;
    do {
      loopCounter++;
      gb = GameBoard();
      shipAreaToMove = gb.shipsAreas[SHIP_AREA_INDEX];
      const BOARD_HEIGHT = gb.board.length;
      const BOARD_WIDTH = gb.board[0].length;
      const VERTICAL = 'V';
      const HORIZONTAL = 'H';
      const isCellOnBoard = ([i, j]) => {
        return i >= 0 && j >= 0 && i < BOARD_HEIGHT && j < BOARD_WIDTH;
      };
      const searchForEmptyArea = (direction) => {
        let x = 2;
        while (x < gb.board.length) {
          shipAreaToMove.forEach(([i, j]) => {
            newShipArea.push(direction === VERTICAL ? [i, j + x] : [i + x, j]);
          });
          if (
            newShipArea.every(isCellOnBoard) &&
            newShipArea.every(([i, j]) => !gb.board[i][j].ship)
          ) {
            break;
          }
          newShipArea.splice(0);
          x++;
        }
      };
      searchForEmptyArea(VERTICAL);
      if (newShipArea.length === 0) {
        searchForEmptyArea(HORIZONTAL);
      }
    } while (newShipArea.length === 0 && loopCounter < MAX_LOOPS);
    expect(loopCounter).toBeLessThan(MAX_LOOPS);
    expect(newShipArea.length).toBeGreaterThan(0);
    expect(gb).toBeInstanceOf(GameBoard);
    expect(shipAreaToMove.length).toBe(newShipArea.length);
    expect(gb.moveShip(shipAreaToMove[0], shipAreaToMove[0])).toBe(false);
    expect(gb.moveShip(shipAreaToMove[0], newShipArea[0])).toBe(true);
    expect(
      gb.shipsAreas[SHIP_AREA_INDEX].every((cellPair, i) => {
        return `${cellPair}` === `${newShipArea[i]}`;
      }),
    ).toBe(true);
    expect(movedEventHandlerMock).toBeCalledTimes(movesCount);
    gameEvents.remove(gameEvents.SHIP_MOVED, movedEventHandlerMock);
  });
});

describe("Test GameBoard's 'rotateShip' method", () => {
  let rotatesCount;
  const rotatedEventHandlerMock = jest.fn(() => {
    rotatesCount++;
  });
  const gameBoard = GameBoard();

  beforeAll(() => {
    rotatesCount = 0;
    gameEvents.add(gameEvents.SHIP_ROTATED, rotatedEventHandlerMock);
  });

  afterAll(() => {
    gameEvents.remove(gameEvents.SHIP_ROTATED, rotatedEventHandlerMock);
    rotatesCount = 0;
  });

  test('should exist & be of an instance of Function', () => {
    expect(gameBoard.rotateShip).toBeInstanceOf(Function);
  });

  test('should throw error on a call with invalid argument', () => {
    expect(() => gameBoard.rotateShip()).toThrowError();
    expect(() => gameBoard.rotateShip(true)).toThrowError();
    expect(() => gameBoard.rotateShip('0')).toThrowError();
    expect(() => gameBoard.rotateShip(-1)).toThrowError();
    expect(() =>
      gameBoard.rotateShip(gameBoard.shipsAreas.length),
    ).toThrowError();
    expect(() =>
      gameBoard.rotateShip(gameBoard.shipsAreas.length - 1),
    ).not.toThrowError();
  });

  test('should work correctly', () => {
    const rotate = (shipArea) => {
      if (shipArea.length <= 1) return [...shipArea];
      const midIndex = Math.floor(shipArea.length / 2);
      const verticalShip = shipArea[1][0] > shipArea[0][0];
      const rotatedShipArea = [];
      shipArea.forEach(([i, j], index) => {
        if (index === midIndex) rotatedShipArea.push([i, j]);
        else {
          const [constIndex, varIndex] = verticalShip ? [0, 1] : [1, 0];
          const constSide = shipArea[midIndex][constIndex];
          const midVarSide = shipArea[midIndex][varIndex];
          const delta = Math.abs(midIndex - index);
          const before = index < midIndex;
          const variableSide = before ? midVarSide - delta : midVarSide + delta;
          rotatedShipArea.push(
            verticalShip
              ? [constSide, variableSide]
              : [variableSide, constSide],
          );
        }
      });
      return rotatedShipArea;
    };
    const MAX_LOOPS = 100;
    let loopsCount = 0;
    let rotated = false;
    let rotatedIndex = -1;
    let beforeRotate;
    let gb;
    do {
      loopsCount++;
      gb = GameBoard();
      for (let i = 0; i < gb.shipsAreas.length; i++) {
        beforeRotate = [...gb.shipsAreas[i]];
        rotated = gb.rotateShip(i);
        if (rotated) {
          rotatedIndex = i;
          break;
        }
      }
    } while (loopsCount < MAX_LOOPS && !rotated);
    expect(loopsCount).toBeLessThanOrEqual(MAX_LOOPS);
    expect(rotated).toBe(true);
    expect(gb.shipsAreas[rotatedIndex]).toStrictEqual(rotate(beforeRotate));
    expect(rotatedEventHandlerMock).toBeCalledTimes(rotatesCount);
    expect(rotatedEventHandlerMock.mock.calls.length).toBeGreaterThan(0);
  });
});
