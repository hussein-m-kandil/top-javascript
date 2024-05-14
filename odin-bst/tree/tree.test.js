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

test('should "levelOrder" method be defined and accept optional callback to use it on each node, Otherwise, return array of values', () => {
  const expectedValues = [5, 2, 9, 1, 3];
  let callbackResult = '';
  let actualCallbackResult = expectedValues.join('');
  const callback = (node) => {
    callbackResult += node.value;
  };
  expect(typeof TEST_TREE.levelOrder).toBe('function');
  expect(() => TEST_TREE.levelOrder(true)).toThrowError();
  expect(() => TEST_TREE.levelOrder('')).toThrowError();
  expect(TEST_TREE.levelOrder(() => undefined)).toBe(undefined);
  expect(Array.isArray(TEST_TREE.levelOrder())).toBe(true);
  const actualValues = TEST_TREE.levelOrder();
  expect(actualValues.length).toBe(expectedValues.length);
  expect(actualValues.every((n, i) => n === expectedValues[i])).toBe(true);
  expect(TEST_TREE.levelOrder(callback)).toBe(undefined);
  expect(callbackResult).toBe(actualCallbackResult);
  const newTestTree = new Tree([5, 7, 1, 4, 2, 6, 3]);
  const newExpectedValues = [4, 2, 6, 1, 3, 5, 7];
  const newActualValues = newTestTree.levelOrder();
  expect(newExpectedValues.length).toBe(newActualValues.length);
  expect(newExpectedValues.every((n, i) => n === newActualValues[i])).toBe(
    true,
  );
  callbackResult = '';
  actualCallbackResult = newActualValues.join('');
  expect(newTestTree.levelOrder(callback)).toBe(undefined);
  expect(actualCallbackResult).toBe(callbackResult);
});

test('should "inOrder" method be defined and accept optional callback to use it on each node, Otherwise, return array of values', () => {
  const expectedValues = [1, 2, 3, 5, 9];
  let callbackResult = '';
  let actualCallbackResult = expectedValues.join('');
  const callback = (node) => {
    callbackResult += node.value;
  };
  expect(typeof TEST_TREE.inOrder).toBe('function');
  expect(() => TEST_TREE.inOrder(true)).toThrowError();
  expect(() => TEST_TREE.inOrder('')).toThrowError();
  expect(TEST_TREE.inOrder(() => undefined)).toBe(undefined);
  expect(Array.isArray(TEST_TREE.inOrder())).toBe(true);
  const actualValues = TEST_TREE.inOrder();
  expect(actualValues.length).toBe(expectedValues.length);
  expect(actualValues.every((n, i) => n === expectedValues[i])).toBe(true);
  expect(TEST_TREE.inOrder(callback)).toBe(undefined);
  expect(callbackResult).toBe(actualCallbackResult);
  const newTestTree = new Tree([5, 7, 1, 4, 2, 6, 3]);
  const newExpectedValues = [1, 2, 3, 4, 5, 6, 7];
  const newActualValues = newTestTree.inOrder();
  expect(newExpectedValues.length).toBe(newActualValues.length);
  expect(newExpectedValues.every((n, i) => n === newActualValues[i])).toBe(
    true,
  );
  callbackResult = '';
  actualCallbackResult = newActualValues.join('');
  expect(newTestTree.inOrder(callback)).toBe(undefined);
  expect(actualCallbackResult).toBe(callbackResult);
});

test('should "preOrder" method be defined and accept optional callback to use it on each node, Otherwise, return array of values', () => {
  const expectedValues = [5, 2, 1, 3, 9];
  let callbackResult = '';
  let actualCallbackResult = expectedValues.join('');
  const callback = (node) => {
    callbackResult += node.value;
  };
  expect(typeof TEST_TREE.preOrder).toBe('function');
  expect(() => TEST_TREE.preOrder(true)).toThrowError();
  expect(() => TEST_TREE.preOrder('')).toThrowError();
  expect(TEST_TREE.preOrder(() => undefined)).toBe(undefined);
  expect(Array.isArray(TEST_TREE.preOrder())).toBe(true);
  const actualValues = TEST_TREE.preOrder();
  expect(actualValues.length).toBe(expectedValues.length);
  expect(actualValues.every((n, i) => n === expectedValues[i])).toBe(true);
  expect(TEST_TREE.preOrder(callback)).toBe(undefined);
  expect(callbackResult).toBe(actualCallbackResult);
  const newTestTree = new Tree([5, 7, 1, 4, 2, 6, 3]);
  const newExpectedValues = [4, 2, 1, 3, 6, 5, 7];
  const newActualValues = newTestTree.preOrder();
  expect(newExpectedValues.length).toBe(newActualValues.length);
  expect(newExpectedValues.every((n, i) => n === newActualValues[i])).toBe(
    true,
  );
  callbackResult = '';
  actualCallbackResult = newActualValues.join('');
  expect(newTestTree.preOrder(callback)).toBe(undefined);
  expect(actualCallbackResult).toBe(callbackResult);
});

test('should "postOrder" method be defined and accept optional callback to use it on each node, Otherwise, return array of values', () => {
  const expectedValues = [1, 3, 2, 9, 5];
  let callbackResult = '';
  let actualCallbackResult = expectedValues.join('');
  const callback = (node) => {
    callbackResult += node.value;
  };
  expect(typeof TEST_TREE.postOrder).toBe('function');
  expect(() => TEST_TREE.postOrder(true)).toThrowError();
  expect(() => TEST_TREE.postOrder('')).toThrowError();
  expect(TEST_TREE.postOrder(() => undefined)).toBe(undefined);
  expect(Array.isArray(TEST_TREE.postOrder())).toBe(true);
  const actualValues = TEST_TREE.postOrder();
  expect(actualValues.length).toBe(expectedValues.length);
  expect(actualValues.every((n, i) => n === expectedValues[i])).toBe(true);
  expect(TEST_TREE.postOrder(callback)).toBe(undefined);
  expect(callbackResult).toBe(actualCallbackResult);
  const newTestTree = new Tree([5, 7, 1, 4, 2, 6, 3]);
  const newExpectedValues = [1, 3, 2, 5, 7, 6, 4];
  const newActualValues = newTestTree.postOrder();
  expect(newExpectedValues.length).toBe(newActualValues.length);
  expect(newExpectedValues.every((n, i) => n === newActualValues[i])).toBe(
    true,
  );
  callbackResult = '';
  actualCallbackResult = newActualValues.join('');
  expect(newTestTree.postOrder(callback)).toBe(undefined);
  expect(actualCallbackResult).toBe(callbackResult);
});
