import { test, expect } from '@jest/globals';
import { calculator, Calculator } from './calculator.js';

const METHODS = ['add', 'subtract', 'divide', 'multiply'];

test('should exist', () => {
  expect(calculator).toBeDefined();
});

test('should be instance of Calculator', () => {
  expect(typeof calculator).toBe('object');
  expect(calculator).toBeInstanceOf(Calculator);
});

test('should have add, subtract, divide, and multiply methods', () => {
  expect(typeof calculator.add).toBe('function');
  expect(typeof calculator.subtract).toBe('function');
  expect(typeof calculator.divide).toBe('function');
  expect(typeof calculator.multiply).toBe('function');
});

test('should all methods throw error with invalid number/type of arguments', () => {
  METHODS.forEach((method) => {
    expect(() => calculator[method]()).toThrowError();
    expect(() => calculator[method](1)).toThrowError();
    expect(() => calculator[method](1, 2, 3)).toThrowError();
    expect(() => calculator[method]('1', '2')).toThrowError();
    expect(() => calculator[method](1, '2')).toThrowError();
    expect(() => calculator[method]('1', 2)).toThrowError();
    expect(() => calculator[method](1, '')).toThrowError();
    expect(() => calculator[method](false, 1)).toThrowError();
    expect(() => calculator[method](NaN, 1)).toThrowError();
    expect(() => calculator[method](1, NaN)).toThrowError();
    expect(() => calculator[method](NaN, NaN)).toThrowError();
    expect(() => calculator[method](Infinity, 1)).toThrowError();
    expect(() => calculator[method](1, Infinity)).toThrowError();
    expect(() => calculator[method](Infinity, Infinity)).toThrowError();
  });
});

test('should all methods return a value of type "number"', () => {
  METHODS.forEach((method) => {
    expect(typeof calculator[method](3, 1)).toBe('number');
  });
});

test('should "calculator.add" return correct result', () => {
  expect(calculator.add(2, 3)).toBe(5);
  expect(calculator.add(0, 3)).toBe(3);
  expect(calculator.add(0, 0)).toBe(0);
  expect(calculator.add(-0, +0)).toBe(0);
  expect(calculator.add(+0, -0)).toBe(0);
  expect(calculator.add(3, -0)).toBe(3);
  expect(calculator.add(3, +0)).toBe(3);
  expect(calculator.add(3, 0)).toBe(3);
  expect(calculator.add(1, -1)).toBe(0);
  expect(calculator.add(-1, -1)).toBe(-2);
  expect(calculator.add(43, 29)).toBe(72);
});

test('should "calculator.subtract" return correct result', () => {
  expect(calculator.subtract(2, 3)).toBe(-1);
  expect(calculator.subtract(0, 3)).toBe(-3);
  expect(calculator.subtract(0, 0)).toBe(0);
  expect(calculator.subtract(-0, +0)).toBe(0);
  expect(calculator.subtract(+0, -0)).toBe(0);
  expect(calculator.subtract(3, -0)).toBe(3);
  expect(calculator.subtract(3, +0)).toBe(3);
  expect(calculator.subtract(3, 0)).toBe(3);
  expect(calculator.subtract(1, -1)).toBe(2);
  expect(calculator.subtract(-1, -1)).toBe(0);
  expect(calculator.subtract(43, 29)).toBe(14);
});

test('should "calculator.multiply" return correct result', () => {
  expect(calculator.multiply(2, 3)).toBe(6);
  expect(calculator.multiply(0, 3)).toBe(0);
  expect(calculator.multiply(0, 0)).toBe(0);
  expect(calculator.multiply(-0, +0)).toBe(0);
  expect(calculator.multiply(+0, -0)).toBe(0);
  expect(calculator.multiply(3, -0)).toBe(0);
  expect(calculator.multiply(3, +0)).toBe(0);
  expect(calculator.multiply(3, 0)).toBe(0);
  expect(calculator.multiply(1, -1)).toBe(-1);
  expect(calculator.multiply(-1, -1)).toBe(1);
  expect(calculator.multiply(43, 29)).toBe(1247);
});

test('should "calculator.divide" return correct result', () => {
  expect(calculator.divide(2, 3)).toBeCloseTo(0.67);
  expect(calculator.divide(0, 3)).toBe(0);
  expect(() => calculator.divide(0, 0)).toThrowError();
  expect(() => calculator.divide(-0, +0)).toThrowError();
  expect(() => calculator.divide(+0, 0)).toThrowError();
  expect(() => calculator.divide(3, 0)).toThrowError();
  expect(() => calculator.divide(3, -0)).toThrowError();
  expect(() => calculator.divide(3, +0)).toThrowError();
  expect(calculator.divide(1, -1)).toBe(-1);
  expect(calculator.divide(-1, -1)).toBe(1);
  expect(calculator.divide(33, 3)).toBe(11);
  expect(calculator.divide(3.6, 3)).toBe(1.2);
});
