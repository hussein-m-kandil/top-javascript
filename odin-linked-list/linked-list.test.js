import { test, expect } from '@jest/globals';
import Node from './node';
import LinkedList from './linked-list';

test('should exist', () => {
  expect(LinkedList).toBeDefined();
});

test('should be a function', () => {
  expect(typeof LinkedList).toBe('function');
});

const METHODS_NAMES = [
  'append',
  'prepend',
  'at',
  'contains',
  'pop',
  'shift',
  'toString',
  'find',
  'insertAt',
  'removeAt',
];
const PROPS_NAMES = ['head', 'tail', 'length'];
const TEST_VALUES = ['blah', 3, true];

const list = new LinkedList(...TEST_VALUES);

const testToStringAndLength = (testValues = TEST_VALUES) => {
  let expectedStr = '';
  testValues.forEach((v) => {
    expectedStr += `( ${v} ) -> `;
  });
  expectedStr += 'null';
  expect(list.toString()).toBe(expectedStr);
  expect(list.length).toBe(testValues.length);
};

const testListChainFromHead = (testValues = TEST_VALUES) => {
  expect(list.head.previousNode).toBe(null);
  let node = list.head;
  let i = 0;
  while (node !== null) {
    expect(node.value).toStrictEqual(testValues[i]);
    node = node.nextNode;
    i++;
  }
};

const testListChainFromTail = (testValues = TEST_VALUES) => {
  expect(list.tail.nextNode).toBe(null);
  let node = list.tail;
  let i = testValues.length - 1;
  while (node !== null) {
    expect(node.value).toStrictEqual(testValues[i]);
    node = node.previousNode;
    i--;
  }
};

const checkAllNodesInTheList = () => {
  testToStringAndLength();
  testListChainFromHead();
  testListChainFromTail();
};

test('should be instance of LinkedList', () => {
  expect(list).toBeInstanceOf(LinkedList);
});

test('should have "head", "tail", and their previous/next nodes all of type "Node"', () => {
  let node = list.head;
  while (node !== null) {
    expect(node).toBeInstanceOf(Node);
    node = node.nextNode;
  }
});

test('should have all needed properties', () => {
  PROPS_NAMES.forEach((property) => {
    expect(list[property]).toBeDefined();
  });
});

test('should have all needed methods', () => {
  METHODS_NAMES.forEach((method) => {
    expect(typeof list[method]).toBe('function');
  });
});

test(
  'should have correct number of nodes and "toString" works correctly',
  testToStringAndLength,
);

test(
  'should have a "head" property as the start of nodes chain',
  testListChainFromHead,
);

test(
  'should have a "tail" property as the end of nodes chain',
  testListChainFromTail,
);

test('should properties/methods NOT be deleted nor changed', () => {
  delete list.append;
  expect(list.append).toBeDefined();
  expect(() => {
    list.prepend = 'foo';
  }).toThrowError();
  expect(typeof list.prepend).toBe('function');
  expect(() => {
    list.head = 'bar';
  }).toThrowError();
  expect(list.head).toBeDefined();
  expect(list.head).toBeInstanceOf(Node);
  checkAllNodesInTheList();
});

test('should "append" method work correctly!', () => {
  const value = 'appended';
  TEST_VALUES.push(value);
  expect(list.append(value).tail.value).toStrictEqual(list.tail.value);
  checkAllNodesInTheList();
});

test('should "prepend" method work correctly!', () => {
  const value = 'prepended';
  TEST_VALUES.unshift(value);
  expect(list.prepend(value).head.value).toStrictEqual(list.head.value);
  checkAllNodesInTheList();
});

test('should "at" method work correctly!', () => {
  TEST_VALUES.forEach((v, i) => {
    const node = list.at(i);
    expect(node).toBeInstanceOf(Node);
    expect(node.value).toBeDefined();
    expect(node.value).toStrictEqual(v);
  });
  expect(list.at(-1).value).toStrictEqual(list.tail.value);
  expect(list.at(-2).value).toStrictEqual(list.tail.previousNode.value);
  expect(() => list.at(TEST_VALUES.length)).toThrowError();
  expect(() => list.at(TEST_VALUES.length + 1)).toThrowError();
  expect(() => list.at((TEST_VALUES.length + 1) * -1)).toThrowError();
  checkAllNodesInTheList();
});

test('should "contains" method work correctly!', () => {
  // TODO: Test for array values & objects
  TEST_VALUES.forEach((v) => {
    expect(list.contains(v)).toBe(true);
  });
  checkAllNodesInTheList();
});

test('should "pop" method work correctly!', () => {
  const lastValue = TEST_VALUES.pop();
  const valueBeforeLast = TEST_VALUES.pop();
  expect(list.pop().value).toStrictEqual(lastValue);
  expect(list.pop().value).toStrictEqual(valueBeforeLast);
  TEST_VALUES.push(valueBeforeLast, lastValue); // Reset test values
  list.append(valueBeforeLast, lastValue); // Reset the list
  checkAllNodesInTheList();
});

test('should "shift" method work correctly!', () => {
  const firstValue = TEST_VALUES.shift();
  const valueAfterFirst = TEST_VALUES.shift();
  expect(list.shift().value).toStrictEqual(firstValue);
  expect(list.shift().value).toStrictEqual(valueAfterFirst);
  TEST_VALUES.unshift(firstValue, valueAfterFirst); // Reset test values
  list.prepend(firstValue, valueAfterFirst); // Reset the list
  checkAllNodesInTheList();
});

test('should "find" method work correctly!', () => {
  TEST_VALUES.forEach((v, i) => {
    expect(list.find(v)).toBe(i);
  });
  expect(list.find('blah234')).toBe(null);
  expect(list.find(777)).toBe(null);
  expect(list.find(undefined)).toBe(null);
  expect(list.find(null)).toBe(null);
  checkAllNodesInTheList();
});

test('should "insertAt" method work correctly!', () => {
  // Create testValues: [value, index][]
  const testValues = [
    ['Added value', Math.floor(TEST_VALUES.length / 2)],
    [false, 0],
    [7, TEST_VALUES.length],
    ['Negatively added #-1', -1],
    ['Negatively added #-2', -2],
    ['Negatively added #-(len + 1)', (TEST_VALUES.length + 1) * -1], // Should be first element
  ];
  testValues.forEach((vPair) => {
    if (vPair[1] !== -1) {
      const spliceIndex = vPair[1] < 0 ? vPair[1] + 1 : vPair[1];
      TEST_VALUES.splice(spliceIndex, 0, vPair[0]); // Array.prototype.splice inserts before the negative index
    } else {
      TEST_VALUES.push(vPair[0]);
    }
    list.insertAt(...vPair); // LinkedList.prototype.insertAt inserts at the negative index
    checkAllNodesInTheList();
  });
  expect(() => list.insertAt(TEST_VALUES.length + 1)).toThrowError();
  expect(() => list.insertAt((TEST_VALUES.length + 2) * -1)).toThrowError();
  checkAllNodesInTheList();
});

test('should "removeAt" method work correctly!', () => {
  // Create testIndexes array contains some of the Indexes used in testing 'insertAt'
  const testIndexesGetters = [
    () => TEST_VALUES.length * -1, // Should be first element
    () => 0,
    () => -2,
    () => -1,
    () => TEST_VALUES.length - 1,
    () => Math.floor(TEST_VALUES.length / 2),
  ];
  testIndexesGetters.forEach((indexGetter) => {
    const i = indexGetter();
    TEST_VALUES.splice(i, 1);
    list.removeAt(i);
    checkAllNodesInTheList();
  });
  expect(() => list.removeAt(TEST_VALUES.length + 1)).toThrowError();
  expect(() => list.removeAt((TEST_VALUES.length + 1) * -1)).toThrowError();
  checkAllNodesInTheList();
});

test('should new EMPTY LinkedList instance be CREATED and FILLED after instantiation', () => {
  const emptyList = new LinkedList();
  expect(emptyList.toString()).toBe('null');
  expect(emptyList.head).toBe(null);
  expect(emptyList.tail).toBe(null);
  expect(emptyList.length).toBe(0);
  TEST_VALUES.forEach((v) => emptyList.append(v)); // Fill
  testToStringAndLength();
  while (emptyList.head !== null) {
    emptyList.pop(); // Empty
  }
  expect(emptyList.toString()).toBe('null');
  expect(emptyList.head).toBe(null);
  expect(emptyList.tail).toBe(null);
  expect(emptyList.length).toBe(0);
});
