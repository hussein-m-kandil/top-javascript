import { test, expect } from '@jest/globals';
import caesarCipher from './caesar-cipher.js';

test('should exist', () => {
  expect(caesarCipher).toBeDefined();
});

test('should be of type function', () => {
  expect(typeof caesarCipher).toBe('function');
});

test('should throw Error on a call with wrong type/number of arguments', () => {
  expect(() => caesarCipher()).toThrowError();
  expect(() => caesarCipher(null)).toThrowError();
  expect(() => caesarCipher(3)).toThrowError();
  expect(() => caesarCipher(true)).toThrowError();
  expect(() => caesarCipher(['blah'])).toThrowError();
  expect(() => caesarCipher({ x: 'blah' })).toThrowError();
  expect(() => caesarCipher(true, 3)).toThrowError();
  expect(() => caesarCipher('test', '3')).toThrowError();
  expect(() => caesarCipher('test', undefined, 3)).toThrowError();
  expect(() => caesarCipher('test', null, 3)).toThrowError();
  expect(() => caesarCipher('test', -1)).toThrowError();
  expect(() => caesarCipher('test', -0)).not.toThrowError();
  expect(() => caesarCipher('test', 3)).not.toThrowError();
});

test('should return same string withe a shift of 0 (Zero)', () => {
  expect(caesarCipher('test', -0)).toBe('test');
  expect(caesarCipher('test', 0)).toBe('test');
  expect(caesarCipher('test', +0)).toBe('test');
});

test('should return string', () => {
  expect(typeof caesarCipher('test', 0)).toBe('string');
  expect(typeof caesarCipher('test', 3)).toBe('string');
});

test('should return correct result with letters-only string and shift less than 28', () => {
  expect(caesarCipher('abc', 3)).toBe('def');
  expect(caesarCipher('aBc', 3)).toBe('dEf');
  expect(caesarCipher('BAz', 3)).toBe('EDc');
  expect(caesarCipher('zYna', 3)).toBe('cBqd');
  expect(caesarCipher('aXyZ', 7)).toBe('hEfG');
});

test('should return correct result with string contains numbers & punctuations and any shift value', () => {
  expect(caesarCipher('a@b!3c.', 3)).toBe('d@e!3f.');
  expect(caesarCipher('a@b!3c.', 107)).toBe('d@e!3f.');
  expect(caesarCipher('a@@B)c', 3)).toBe('d@@E)f');
  expect(caesarCipher('a@@B)c', 107)).toBe('d@@E)f');
  expect(caesarCipher(',BAz!', 3)).toBe(',EDc!');
  expect(caesarCipher(',BAz!', 107)).toBe(',EDc!');
  expect(caesarCipher('77zY3na11', 3)).toBe('77cB3qd11');
  expect(caesarCipher('77zY3na11', 107)).toBe('77cB3qd11');
  expect(caesarCipher('a,X!y@Z.', 111)).toBe('h,E!f@G.');
});
