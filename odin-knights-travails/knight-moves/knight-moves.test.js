import { test, expect } from '@jest/globals';
import { knightMoves } from './knight-moves';

test('should exist and be of type "function"', () => {
  expect(typeof knightMoves).toBe('function');
});

test('should accept 2 pairs and throw Error if inputs !== 2 or any of them !Array has length that !== 2', () => {
  expect(() => knightMoves()).toThrowError();
  expect(() => knightMoves(7, 3)).toThrowError();
  expect(() => knightMoves('x', '')).toThrowError();
  expect(() => knightMoves(true, true)).toThrowError();
  expect(() => knightMoves(true, [1, 2])).toThrowError();
  expect(() => knightMoves([1, 2], true)).toThrowError();
  expect(() => knightMoves([0, 0], [1, 2], undefined, null)).toThrowError();
  expect(() => knightMoves([0, 0], [1, 2], undefined)).not.toThrowError();
  expect(() => knightMoves([0, 0], [1, 2])).not.toThrowError();
});

test('should throw error if any value in any one of the 2 pairs is integer', () => {
  expect(() => knightMoves([0, false], [1, 2])).toThrowError();
  expect(() => knightMoves(['0', 0], [1, 2])).toThrowError();
  expect(() => knightMoves([0, 0], [1, '2'])).toThrowError();
  expect(() => knightMoves([0, 0], [1, 2])).not.toThrowError();
});

test('should throw Error if any value more than 7 or less than 0 in any given pair', () => {
  expect(() => knightMoves([0, -1], [1, 2])).toThrowError();
  expect(() => knightMoves([0, 0], [1, -1])).toThrowError();
  expect(() => knightMoves([8, 0], [1, 2])).toThrowError();
  expect(() => knightMoves([0, 0], [8, 2])).toThrowError();
  expect(() => knightMoves([7, 0], [0, 7])).not.toThrowError();
});

test('should return the correct type', () => {
  expect(Array.isArray(knightMoves([0, 0], [1, 2]))).toBe(true);
  expect(knightMoves([0, 0], [1, 2]).every((x) => Array.isArray(x))).toBe(true);
  expect(knightMoves([0, 0], [1, 2]).every((pair) => pair.length === 2)).toBe(
    true,
  );
});

test('should work correctly', () => {
  expect(knightMoves([0, 0], [0, 0])).toStrictEqual([[0, 0]]);
  expect(knightMoves([0, 0], [1, 2])).toStrictEqual([
    [0, 0],
    [1, 2],
  ]);
  expect(knightMoves([0, 0], [3, 3])).toStrictEqual([
    [0, 0],
    [1, 2],
    [3, 3],
  ]);
  expect(knightMoves([3, 3], [0, 0])).toStrictEqual([
    [3, 3],
    [2, 1],
    [0, 0],
  ]);
  expect(knightMoves([0, 0], [7, 7])).toStrictEqual([
    [0, 0],
    [1, 2],
    [2, 4],
    [3, 6],
    [5, 7],
    [6, 5],
    [7, 7],
  ]);
  expect(knightMoves([3, 3], [4, 3])).toStrictEqual([
    [3, 3],
    [4, 5],
    [2, 4],
    [4, 3],
  ]);
});
