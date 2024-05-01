import { test, expect } from '@jest/globals';

import reverseString from './reverse-string.js';

test('should exist', () => {
  expect(reverseString).toBeDefined();
});

test('should be a function', () => {
  expect(typeof reverseString).toBe('function');
});

test('should throw error when the given input is not a string', () => {
  expect(() => reverseString()).toThrowError();
  expect(() => reverseString(3)).toThrowError();
  expect(() => reverseString(null)).toThrowError();
});

test('should return string', () => {
  expect(typeof reverseString('hello')).toBe('string');
});

test('should return reversed version of the given input', () => {
  expect(reverseString('Hello')).toBe('olleH');
  expect(reverseString('world!')).toBe('!dlrow');
  expect(reverseString('Dad')).toBe('daD');
});
