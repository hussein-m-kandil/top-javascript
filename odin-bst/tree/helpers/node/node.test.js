import { test, expect } from '@jest/globals';
import { Node } from './node.js';

test('should exist', () => {
  expect(Node).toBeDefined();
});

test('should be of type function', () => {
  expect(typeof Node).toBe('function');
});

test('should return an instance of Node', () => {
  expect(Node()).toBeInstanceOf(Node);
});

test('should Node prototype be immutable', () => {
  expect(() => Object.setPrototypeOf(Node.prototype, {})).toThrowError();
});

test('should Node properties be immutable except for the "value" property', () => {
  const node = Node();
  expect(() => delete node.value).toThrowError();
  expect(() => delete node.right).toThrowError();
  expect(() => delete node.left).toThrowError();
  expect(() => {
    node.value = null;
  }).not.toThrowError();
  expect(() => {
    node.right = null;
  }).toThrowError();
  expect(() => {
    node.left = null;
  }).toThrowError();
});

test('should next/previous setters be hidden except for "in" query', () => {
  const node = Node();
  const PREV_SETTER_NAME = 'setLeft';
  const NEXT_SETTER_NAME = 'setRight';
  expect(PREV_SETTER_NAME in node).toBe(true);
  expect(NEXT_SETTER_NAME in node).toBe(true);
  expect(Object.prototype.hasOwnProperty.call(node, PREV_SETTER_NAME)).toBe(
    false,
  );
  expect(Object.prototype.hasOwnProperty.call(node, NEXT_SETTER_NAME)).toBe(
    false,
  );
  expect(Object.getOwnPropertyNames(node).includes(PREV_SETTER_NAME)).toBe(
    false,
  );
  expect(Object.getOwnPropertyNames(node).includes(NEXT_SETTER_NAME)).toBe(
    false,
  );
  expect(Object.keys(node).includes(PREV_SETTER_NAME)).toBe(false);
  expect(Object.keys(node).includes(NEXT_SETTER_NAME)).toBe(false);
});

test('should using the next/prev hidden setters accepts only "Node" or "null"', () => {
  const node = Node();
  expect(node.value).toBe(null);
  expect(node.right).toBe(null);
  expect(node.left).toBe(null);
  expect(() => {
    node.value = '';
    node.value = false;
    node.value = [];
    node.value = {};
    node.value = 7;
  }).not.toThrowError();
  expect(() => node.setRight()).toThrowError();
  expect(() => node.setRight('')).toThrowError();
  expect(() => node.setRight(true)).toThrowError();
  expect(() => node.setRight(7)).toThrowError();
  expect(() => node.setRight(Node())).not.toThrowError();
  expect(() => node.setRight(null)).not.toThrowError();
  expect(() => node.setLeft()).toThrowError();
  expect(() => node.setLeft('')).toThrowError();
  expect(() => node.setLeft(true)).toThrowError();
  expect(() => node.setLeft(7)).toThrowError();
  expect(() => node.setLeft(Node())).not.toThrowError();
  expect(() => node.setLeft(null)).not.toThrowError();
});
