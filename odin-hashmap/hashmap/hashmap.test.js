import { test, expect } from '@jest/globals';
import { HashMap } from './hashmap.js';

test('should exist', () => {
  expect(HashMap).toBeDefined();
});

test('should be a function', () => {
  expect(typeof HashMap).toBe('function');
});

test('should be a constructor', () => {
  expect(() => HashMap()).toThrowError();
  expect(() => new HashMap()).not.toThrowError();
});

test('should be the constructor of all instances of it', () => {
  const hashMap1 = new HashMap();
  const hashMap2 = new HashMap();
  expect(hashMap1).toBeInstanceOf(HashMap);
  expect(hashMap2).toBeInstanceOf(HashMap);
});

test('should class/instance member cannot be added & class prototype cannot be changed', () => {
  expect(() => {
    HashMap.foo = 'blah';
  }).toThrowError();
  expect(() => {
    new HashMap().foo = 'blah';
  }).toThrowError();
  expect(() => {
    Object.setPrototypeOf(HashMap, {});
  }).toThrowError();
  expect(() => {
    Object.setPrototypeOf(HashMap.prototype, {});
  }).toThrowError();
});
