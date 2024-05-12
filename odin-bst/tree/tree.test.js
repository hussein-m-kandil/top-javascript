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
  const testValue1 = 8;
  const testValue2 = 6;
  const testValue3 = 0;
  const testValue4 = -3;
  const testValue5 = 7;
  expect(typeof TEST_TREE.insert).toBe('function');
  expect(() => TEST_TREE.insert()).toThrowError();
  expect(() => TEST_TREE.insert(true)).toThrowError();
  expect(() => TEST_TREE.insert('')).toThrowError();
  expect(TEST_TREE.insert(testValue1)).toBe(TEST_TREE.root);
  expect(TEST_TREE.insert(testValue2)).toBe(TEST_TREE.root);
  expect(TEST_TREE.insert(testValue3)).toBe(TEST_TREE.root);
  expect(TEST_TREE.insert(testValue4)).toBe(TEST_TREE.root);
  expect(TEST_TREE.insert(testValue5)).toBe(TEST_TREE.root);
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
