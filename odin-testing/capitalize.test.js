import { test, expect } from '@jest/globals';

import capitalize from './capitalize.js';

test('should exist', () => {
  expect(capitalize).toBeDefined();
});

test('should be type of function', () => {
  expect(typeof capitalize).toBe('function');
});

test('should throw error if there is no input', () => {
  expect(() => capitalize()).toThrowError();
});

test('should throw error with non-string input', () => {
  expect(() => capitalize(3)).toThrowError();
});

test('should return a string', () => {
  expect(typeof capitalize('hello')).toBe('string');
});

test('should return same string capitalizing its first letter', () => {
  expect(capitalize('hello')).toBe('Hello');
  expect(capitalize('world')).toBe('World');
  expect(capitalize('Blah')).toBe('Blah');
});

test('should ignore any characters other than letters', () => {
  expect(capitalize('!hello')).toBe('!Hello');
  expect(capitalize('@7hello')).toBe('@7Hello');
  expect(capitalize('11hello77')).toBe('11Hello77');
});
