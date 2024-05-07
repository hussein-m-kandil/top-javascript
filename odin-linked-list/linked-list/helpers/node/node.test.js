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
  expect(() => delete node.nextNode).toThrowError();
  expect(() => delete node.previousNode).toThrowError();
  expect(() => {
    node.value = null;
  }).not.toThrowError();
  expect(() => {
    node.nextNode = null;
  }).toThrowError();
  expect(() => {
    node.previousNode = null;
  }).toThrowError();
});

test('should next/previous setters be hidden except for "in" query', () => {
  const node = Node();
  const PREV_SETTER_NAME = 'setPrev';
  const NEXT_SETTER_NAME = 'setNext';
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
  expect(node.nextNode).toBe(null);
  expect(node.previousNode).toBe(null);
  expect(() => {
    node.value = '';
    node.value = false;
    node.value = [];
    node.value = {};
    node.value = 7;
  }).not.toThrowError();
  expect(() => node.setNext()).toThrowError();
  expect(() => node.setNext('')).toThrowError();
  expect(() => node.setNext(true)).toThrowError();
  expect(() => node.setNext(7)).toThrowError();
  expect(() => node.setNext(Node())).not.toThrowError();
  expect(() => node.setNext(null)).not.toThrowError();
  expect(() => node.setPrev()).toThrowError();
  expect(() => node.setPrev('')).toThrowError();
  expect(() => node.setPrev(true)).toThrowError();
  expect(() => node.setPrev(7)).toThrowError();
  expect(() => node.setPrev(Node())).not.toThrowError();
  expect(() => node.setPrev(null)).not.toThrowError();
});
