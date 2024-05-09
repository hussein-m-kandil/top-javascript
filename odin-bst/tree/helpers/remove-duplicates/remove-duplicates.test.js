import { test, expect } from '@jest/globals';
import { removeDuplicates } from './remove-duplicates';

test('should exist and be of type "function"', () => {
  expect(removeDuplicates).toBeDefined();
  expect(typeof removeDuplicates).toBe('function');
});

test('should throw Error if not given an array or if the length of the given array < 2', () => {
  expect(() => removeDuplicates()).toThrowError();
  expect(() => removeDuplicates([])).toThrowError();
  expect(() => removeDuplicates([7])).toThrowError();
  expect(() => removeDuplicates([7, 2])).not.toThrowError();
});

test('should return same array without any duplicated value', () => {
  const input = [3, {}, 7, 3, {}, 'foo', 'foo', 5, true, 7, true];
  const expected = [3, {}, 7, 'foo', 5, true];
  const actual = removeDuplicates(input);
  expect(actual.length).toBe(expected.length);
  expect(actual).toStrictEqual(expected);
});
