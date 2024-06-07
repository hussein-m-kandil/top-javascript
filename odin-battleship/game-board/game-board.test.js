import { describe, test, expect } from '@jest/globals';
import { GameBoard } from './game-board.js';

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
});
