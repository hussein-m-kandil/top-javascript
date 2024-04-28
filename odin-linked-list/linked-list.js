/* 
  ❎ ✅

  You will need two classes or factories:

  LinkedList class / factory, which will represent the full list. ✅
  Node class / factory, containing a value property and a link to the nextNode, set both as null by default. ✅

  Build the following functions in your linked list class / factory:

  append(value) adds a new node containing value to the end of the list ✅
  prepend(value) adds a new node containing value to the start of the list ✅
  size returns the total number of nodes in the list ✅
  head returns the first node in the list ✅
  tail returns the last node in the list ✅
  at(index) returns the node at the given index ✅
  pop removes the last element from the list ✅
  contains(value) returns true if the passed in value is in the list and otherwise returns false. ✅
  find(value) returns the index of the node containing value, or null if not found. ✅
  toString represents your LinkedList objects as strings, so you can print them out and preview them in the console. ✅
  The format should be: ( value ) -> ( value ) -> ( value ) -> null ✅

  Extra credit:
  
  insertAt(value, index) that inserts a new node with the provided value at the given index. ✅
  removeAt(index) that removes the node at the given index. ✅
  Extra Credit Tip: When you insert or remove a node, consider how it will affect the existing nodes. ✅
  Some of the nodes will need their nextNode link updated. ✅
 */

const state = {
  head: null,
  tail: null,
  size: 0,
  nodeOpened: false,
};

function Node(value = null, nextNode = null, previousNode = null) {
  const node = {};
  const baseDescriptor = { configurable: false, enumerable: true };
  const setNextOrPrevious = function (thisNode, givenValue, name) {
    // ^ Not arrow function to play with 'this'!
    if (!state.nodeOpened) {
      // Prevent user mutation
      throw Error(
        `Read-only property (${name}) cannot be assigned! Use LinkedList method.`,
      );
    }
    if (givenValue === null || (!givenValue) instanceof Node) {
      throw TypeError("A given value can only be 'Node' or 'null'!");
    }
    thisNode[name] = givenValue;
  };
  Object.defineProperties(node, {
    value: { ...baseDescriptor, value, writable: true },
    nextNode: {
      ...baseDescriptor,
      get() {
        return nextNode;
      },
      set(val) {
        setNextOrPrevious(this, val, 'nextNode');
      },
    },
    previousNode: {
      ...baseDescriptor,
      get() {
        return previousNode;
      },
      set(val) {
        setNextOrPrevious(this, val, 'previousNode');
      },
    },
  });
  Object.setPrototypeOf(node, Node.prototype);
  Object.seal(node);
  return node;
}

// Helper
function assignNextOrPrevNode(oldNode, newNode) {
  state.nodeOpened = true;
  oldNode = newNode;
  state.nodeOpened = false;
}

function append(value) {
  // Adds a new node containing value to the end of the list
  if (state.size === 0) {
    state.head = Node(value);
    state.tail = state.head;
  } else if (state.size === 1) {
    state.tail = Node(value, null, state.head);
    assignNextOrPrevNode(state.head.nextNode, state.tail);
  } else {
    state.tail = Node(value, null, state.tail);
    assignNextOrPrevNode(state.tail.previousNode.nextNode, state.tail);
  }
  state.size++;
  return this;
}

function prepend(value) {
  // Adds a new node containing value to the start of the list
  if (state.size === 0) {
    state.head = Node(value);
    state.tail = state.head;
  } else if (state.size === 1) {
    state.head = Node(value, state.tail);
    assignNextOrPrevNode(state.tail.previousNode, state.head);
  } else {
    state.head = Node(value, state.head);
    assignNextOrPrevNode(state.head.nextNode.previousNode, state.head);
  }
  state.size++;
  return this;
}

function at(index) {
  // Returns the node at the given index
  let i = Number(index);
  if (
    Number.isInteger(i) &&
    ((i >= 0 && i < state.size) || (i < 0 && Math.abs(i) <= state.size))
  ) {
    if (state.size < 0) {
      let node = state.tail;
      while (i < -1) {
        node = node.previousNode;
        i++;
      }
      return node;
    }
    let node = state.head;
    while (i > 0) {
      node = state.head.nextNode;
      i--;
    }
    return node;
  }
  return null;
}

function pop() {
  // Removes the last element from the list
  if (state.size === 0) return null;
  const removedNode = Node(state.tail.value);
  if (state.size === 1) {
    state.head = null;
    state.tail = state.head;
  } else {
    state.tail = state.tail.previousNode;
    assignNextOrPrevNode(state.tail.nextNode, null);
  }
  state.size--;
  return removedNode;
}

function shift() {
  // Removes the first element from the list
  if (state.size === 0) return null;
  const removedNode = Node(state.head.value);
  if (state.size === 1) {
    state.head = null;
    state.tail = state.head;
  } else {
    state.head = state.head.nextNode;
    assignNextOrPrevNode(state.head.previousNode, null);
  }
  state.size--;
  return removedNode;
}

function contains(value) {
  // Returns true if the passed in value is in the list and otherwise returns false.
  let node = state.head;
  while (node !== null) {
    // TODO: Handle corner equality cases Array & Object!
    if (node.value === value) {
      return true;
    }
    node = node.nextNode;
  }
  return false;
}

function find(value) {
  // Returns the index of the node containing value, or null if not found.
  let i = 0;
  let node = state.head;
  while (node !== null) {
    // TODO: Handle corner equality cases Array & Object!
    if (node.value === value) {
      return i;
    }
    i++;
    node = node.nextNode;
  }
  return null;
}

function toString() {
  // Represents your LinkedList objects as strings, so you can print them out and preview them in the console.
  // The format should be: ( value ) -> ( value ) -> ( value ) -> null
  let result = 'null';
  let node = state.tail;
  while (node !== null) {
    result = `( ${node.value} ) -> ${result}`;
    node = node.previousNode;
  }
  return result;
}

function insertAt(value, index) {
  // Inserts a new node with the provided value at the given index.
  if (!Number.isInteger(index) && index >= state.size) {
    throw TypeError(
      `Node index must be an integer less than NodeList.state.size (${state.size})!`,
    );
  }
  if (index < 0) {
    let previousNode = state.tail;
    for (let i = index; i < -1; i++) {
      previousNode = previousNode.previousNode;
    }
    assignNextOrPrevNode(
      previousNode.nextNode,
      Node(value, previousNode.nextNode, previousNode),
    );
  } else {
    let nextNode = state.head;
    for (let i = 0; i < index; i++) {
      nextNode = nextNode.nextNode;
    }
    assignNextOrPrevNode(
      nextNode.previousNode,
      Node(value, nextNode, nextNode.previousNode),
    );
  }
  return ++state.size;
}

function removeAt(index) {
  // Removes the node at the given index.
  if (Number.isInteger(index) && index < state.size) {
    let node = null;
    if (index < 0) {
      node = state.tail;
      for (let i = index; i < -1; i++) {
        node = node.previousNode;
      }
    } else {
      node = state.head;
      for (let i = 0; i < index; i++) {
        node = node.nextNode;
      }
    }
    assignNextOrPrevNode(node.previousNode.nextNode, node.nextNode);
    state.size--;
    return node;
  }
  return null;
}

function LinkedList(...values) {
  // If there is any given values, fill the list with them
  if (values.length > 0) {
    values.forEach((v) => append(v));
  }
  // Return object its constructor is 'LinkedList' (instance of it)
  const newLinkedList = {};
  const baseDescriptor = { configurable: false, enumerable: true };
  const dataDescriptor = { ...baseDescriptor, writable: false };
  Object.defineProperties(newLinkedList, {
    head: {
      ...baseDescriptor,
      get() {
        return state.head;
      },
    },
    tail: {
      ...baseDescriptor,
      get() {
        return state.tail;
      },
    },
    length: {
      ...baseDescriptor,
      get() {
        return state.size;
      },
    },
    append: {
      ...dataDescriptor,
      value: append,
    },
    prepend: {
      ...dataDescriptor,
      value: prepend,
    },
    at: {
      ...dataDescriptor,
      value: at,
    },
    pop: {
      ...dataDescriptor,
      value: pop,
    },
    shift: {
      ...dataDescriptor,
      value: shift,
    },
    contains: {
      ...dataDescriptor,
      value: contains,
    },
    find: {
      ...dataDescriptor,
      value: find,
    },
    toString: {
      ...dataDescriptor,
      value: toString,
    },
    insertAt: {
      ...dataDescriptor,
      value: insertAt,
    },
    removeAt: {
      ...dataDescriptor,
      value: removeAt,
    },
  });
  Object.setPrototypeOf(newLinkedList, LinkedList.prototype);
  Object.freeze(newLinkedList);
  return newLinkedList;
}

// TESTS
const list = LinkedList('blah', 3, true);

console.log("'list' constructor: ", Object.getPrototypeOf(list).constructor);
console.log("'list' instanceof LinkedList? ", list instanceof LinkedList);
console.log("'list': ", list);
delete list.append;
list.prepend = 'foo';
list.head = 'bar';
console.log(
  "'list.head' constructor: ",
  Object.getPrototypeOf(list.head).constructor,
);
console.log("'list.head' instanceof Node? ", list.head instanceof Node);
console.log("'list.head': ", list.head);

console.log(`\n${list.toString()}`);
console.log(
  `length: ${list.length}, head: ${list.head.value}, tail: ${list.tail.value}`,
);

list.append('last');
console.log(`\n${list.toString()}`);
console.log(
  `length: ${list.length}, head: ${list.head.value}, tail: ${list.tail.value}`,
);

list.prepend('first');
console.log(`\n${list.toString()}`);
console.log(
  `length: ${list.length}, head: ${list.head.value}, tail: ${list.tail.value}`,
);

console.log(`\n${list.pop().value}`);
console.log(`${list.toString()}`);
console.log(
  `length: ${list.length}, head: ${list.head.value}, tail: ${list.tail.value}`,
);

console.log(`\n${list.shift().value}`);
console.log(`${list.toString()}`);
console.log(
  `length: ${list.length}, head: ${list.head.value}, tail: ${list.tail.value}`,
);
