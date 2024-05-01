import { test, expect } from '@jest/globals';
import analyzeArray from './analyze-array.js';

const PROPS = ['min', 'max', 'average', 'length'];

test('should exist', () => {
  expect(analyzeArray).toBeDefined();
});

test('should be a function', () => {
  expect(typeof analyzeArray).toBe('function');
});

test('should throw Error on a call with any input other than an array', () => {
  expect(() => analyzeArray()).toThrowError();
  expect(() => analyzeArray({})).toThrowError();
  expect(() => analyzeArray(7)).toThrowError();
  expect(() => analyzeArray(null)).toThrowError();
  expect(() => analyzeArray(true)).toThrowError();
  expect(() => analyzeArray('Blah')).toThrowError();
  expect(() => analyzeArray([1])).not.toThrowError();
});

test('should throw Error on a call with empty array', () => {
  expect(() => analyzeArray([])).toThrowError();
});

test('should throw Error if the array NOT of type "number[]"', () => {
  expect(() => analyzeArray([1, 2, 3, '', 4, 5])).toThrowError();
  expect(() => analyzeArray([1, 2, 3, true, 4, 5])).toThrowError();
  expect(() => analyzeArray([1, 2, 3, false, 4, 5])).toThrowError();
  expect(() => analyzeArray([1, 2, 3, '7', 4, 5])).toThrowError();
  expect(() => analyzeArray([1, 2, 3, 7, 4, 5])).not.toThrowError();
});

test('should return a value of type "object"', () => {
  expect(typeof analyzeArray([1, 3, 5, 7])).toBe('object');
});

test('should returned object contains the properties: min, max, average, and length', () => {
  const analysis = analyzeArray([1, 3, 5, 7]);
  expect(PROPS.every((prop) => prop in analysis)).toBe(true);
});

test('should all needed properties be of type "number" in the returned object', () => {
  const analysis = analyzeArray([1, 3, 5, 7]);
  expect(PROPS.every((prop) => typeof analysis[prop] === 'number')).toBe(true);
});

test('should the returned object contains correct analysis', () => {
  const inputs = [[7], [1, 8, 3, 4, 2, 6], [1.5, -1, 5, -3, 3.5, 7, 1]];
  const expectedOutputs = [
    {
      average: 7,
      min: 7,
      max: 7,
      length: 1,
    },
    {
      average: 4,
      min: 1,
      max: 8,
      length: 6,
    },
    {
      average: 2,
      min: -3,
      max: 7,
      length: 7,
    },
  ];
  inputs.forEach((inp, i) => {
    expect(analyzeArray(inp)).toStrictEqual(expectedOutputs[i]);
  });
});
