import { test, expect } from '@jest/globals';
import { Node } from './helpers/node';
import { Tree } from './tree';

test('should exist and be of type "function"', () => {
  expect(Tree).toBeDefined();
  expect(typeof Tree).toBe('function');
});

test('should be constructed only with "new" and accept array of numbers only, Otherwise, throw Error', () => {
  expect(() => Tree()).toThrowError();
  expect(() => new Tree()).not.toThrowError();
  expect(() => new Tree([1, 3, true, 5, 7])).toThrowError();
  expect(() => new Tree([5, 3, 7, 1, 4, 9])).not.toThrowError();
  expect(new Tree()).toBeInstanceOf(Tree);
});

test('should "root" property be exist with the value of null on instance without any inputted array', () => {
  expect(new Tree().root).toBe(null);
});

test('should "buildTree" be a "function" that accept numbers-only array', () => {
  const testTree = new Tree();
  expect(typeof testTree.buildTree).toBe('function');
  expect(() => testTree.buildTree()).toThrowError();
  expect(() => testTree.buildTree([1, 3, true, 5, 7])).toThrowError();
  expect(() => testTree.buildTree([5, 3, 7, 1, 4, 9])).not.toThrowError();
});

const NUMBERS = [5, 1, 9, 3, 2, 7, 4];
const TEST_TREE = new Tree();
const TEST_VALUES = [8, 6, 0, -3, 7, 4];

test('should "buildTree" build a balanced binary search tree', () => {
  expect(TEST_TREE.root).toBe(null);
  expect(TEST_TREE.buildTree(NUMBERS)).toBe(TEST_TREE.root);
  expect(TEST_TREE.root).toBeInstanceOf(Node);
  expect(TEST_TREE.root.right.right.value).toBe(9);
  expect(TEST_TREE.root.right.value).toBe(7);
  expect(TEST_TREE.root.right.left.value).toBe(5);
  expect(TEST_TREE.root.value).toBe(4);
  expect(TEST_TREE.root.left.right.value).toBe(3);
  expect(TEST_TREE.root.left.value).toBe(2);
  expect(TEST_TREE.root.left.left.value).toBe(1);
});

test('should "insert" method be defined and put the value at the right place', () => {
  expect(typeof TEST_TREE.insert).toBe('function');
  expect(() => TEST_TREE.insert()).toThrowError();
  expect(() => TEST_TREE.insert(true)).toThrowError();
  expect(() => TEST_TREE.insert('')).toThrowError();
  TEST_VALUES.forEach((n) => {
    expect(TEST_TREE.insert(n)).toBe(TEST_TREE.root);
  });
  expect(TEST_TREE.root.right.right.value).toBe(9);
  expect(TEST_TREE.root.right.right.left.value).toBe(8);
  expect(TEST_TREE.root.right.value).toBe(7);
  expect(TEST_TREE.root.right.left.right.value).toBe(6);
  expect(TEST_TREE.root.right.left.value).toBe(5);
  expect(TEST_TREE.root.value).toBe(4);
  expect(TEST_TREE.root.left.right.value).toBe(3);
  expect(TEST_TREE.root.left.value).toBe(2);
  expect(TEST_TREE.root.left.left.value).toBe(1);
  expect(TEST_TREE.root.left.left.left.value).toBe(0);
  expect(TEST_TREE.root.left.left.left.left.value).toBe(-3);
});

test('should "deleteItem" method be defined and delete the value from the right place', () => {
  expect(typeof TEST_TREE.deleteItem).toBe('function');
  expect(() => TEST_TREE.deleteItem()).toThrowError();
  expect(() => TEST_TREE.deleteItem(true)).toThrowError();
  expect(() => TEST_TREE.deleteItem('')).toThrowError();
  TEST_VALUES.forEach((n) => {
    expect(TEST_TREE.deleteItem(n)).toBe(true);
    expect(TEST_TREE.deleteItem(n)).toBe(false);
  });
  expect(TEST_TREE.root.right.value).toBe(9);
  expect(TEST_TREE.root.value).toBe(5);
  expect(TEST_TREE.root.left.right.value).toBe(3);
  expect(TEST_TREE.root.left.value).toBe(2);
  expect(TEST_TREE.root.left.left.value).toBe(1);
});

test('should "find" method be defined and return the node with the given value or null otherwise', () => {
  expect(typeof TEST_TREE.find).toBe('function');
  expect(() => TEST_TREE.find()).toThrowError();
  expect(() => TEST_TREE.find(true)).toThrowError();
  expect(() => TEST_TREE.find('')).toThrowError();
  NUMBERS.forEach((n) => {
    // Exclude any values that deleted in the previous tests
    if (!TEST_VALUES.includes(n)) {
      const foundNode = TEST_TREE.find(n);
      expect(foundNode).toBeInstanceOf(Node);
      expect(foundNode.value).toBe(n);
    }
  });
  TEST_VALUES.forEach((n) => {
    expect(TEST_TREE.find(n)).toBe(null);
  });
  expect(TEST_TREE.find(9)).toBe(TEST_TREE.root.right);
  expect(TEST_TREE.find(5)).toBe(TEST_TREE.root);
  expect(TEST_TREE.find(3)).toBe(TEST_TREE.root.left.right);
  expect(TEST_TREE.find(2)).toBe(TEST_TREE.root.left);
  expect(TEST_TREE.find(1)).toBe(TEST_TREE.root.left.left);
});
