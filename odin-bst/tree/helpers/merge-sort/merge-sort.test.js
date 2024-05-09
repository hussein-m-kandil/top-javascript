import { test, expect } from '@jest/globals';
import { mergeSort } from './merge-sort';

test('should be exist and of type "function"', () => {
  expect(mergeSort).toBeDefined();
  expect(typeof mergeSort).toBe('function');
});

test('should throw Error if the given array has a non-number value', () => {
  const input = [7, 0, -12, 3, 18, 0n, 9];
  expect(() => mergeSort(input)).toThrowError();
});

test('should sort an array of numbers correctly', () => {
  const input = [7, 0, -12, 3, 18, -1, 9];
  const expected = [-12, -1, 0, 3, 7, 9, 18];
  const actual = mergeSort(input);
  expect(actual.length === expected.length).toBe(true);
  expect(actual.every((x, i) => x === expected[i])).toBe(true);
});
