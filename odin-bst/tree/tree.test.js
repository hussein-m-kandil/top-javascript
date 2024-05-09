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

test('should "buildTree" build a balanced binary search tree', () => {
  const numbers = [5, 1, 9, 3, 2, 7, 4];
  const testTree = new Tree();
  expect(testTree.root).toBe(null);
  expect(testTree.buildTree(numbers)).toBe(testTree.root);
  expect(testTree.root).toBeInstanceOf(Node);
  expect(testTree.root.right.right.value).toBe(9);
  expect(testTree.root.right.value).toBe(7);
  expect(testTree.root.right.left.value).toBe(5);
  expect(testTree.root.value).toBe(4);
  expect(testTree.root.left.right.value).toBe(3);
  expect(testTree.root.left.value).toBe(2);
  expect(testTree.root.left.left.value).toBe(1);
});
