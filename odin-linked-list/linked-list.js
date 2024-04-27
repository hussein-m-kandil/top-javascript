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

let tempThis;

function Node(value = null, nextNode = null, previousNode = null) {
  const node = {};

  const baseDescriptor = { configurable: false, enumerable: false };

  // Not arrow function to play with 'this'
  const setNextOrPrevious = function (newValue) {
    console.log(`Setting ${newValue}...`);
    console.log(`This => ${this === node}`);
  };

  Object.defineProperties(node, {
    value: { ...baseDescriptor, value, writable: true },
    nextNode: {
      ...baseDescriptor,
      get() {
        return nextNode;
      },
      set(v) {
        setNextOrPrevious.call(this, v);
      },
    },
    previousNode: {
      ...baseDescriptor,
      get() {
        return previousNode;
      },
      set(v) {
        setNextOrPrevious.call(this, v);
      },
    },
  });

  return Object.seal(node);
}

class LinkedList {
  #head = null;

  #tail = null;

  #size = 0;

  // TODO: Prevent the user from modifying the next/previous nodes!

  constructor(...values) {
    // If there is any given values, fill the list with them
    if (values.length > 0) {
      values.forEach((v) => this.append(v));
    }
  }

  get head() {
    return this.#head;
  }

  get tail() {
    return this.#tail;
  }

  get length() {
    return this.#size;
  }

  append(value) {
    // Adds a new node containing value to the end of the list
    if (this.#size === 0) {
      this.#head = Node(value);
      this.#tail = this.#head;
    } else if (this.#size === 1) {
      this.#tail = Node(value, null, this.#head);
      this.#head.nextNode = this.#tail;
    } else {
      this.#tail = Node(value, null, this.#tail);
      this.#tail.previousNode.nextNode = this.#tail;
    }
    this.#size++;
    return this;
  }

  prepend(value) {
    // Adds a new node containing value to the start of the list
    if (this.#size === 0) {
      this.#head = Node(value);
      this.#tail = this.#head;
    } else if (this.#size === 1) {
      this.#head = Node(value, this.#tail);
      this.#tail.previousNode = this.#head;
    } else {
      this.#head = Node(value, this.#head);
      this.#head.nextNode.previousNode = this.#head;
    }
    this.#size++;
    return this;
  }

  at(index) {
    // Returns the node at the given index
    let i = Number(index);
    if (
      Number.isInteger(i) &&
      ((i >= 0 && i < this.#size) || (i < 0 && Math.abs(i) <= this.#size))
    ) {
      if (this.#size < 0) {
        let node = this.#tail;
        while (i < -1) {
          node = node.previousNode;
          i++;
        }
        return node;
      }
      let node = this.#head;
      while (i > 0) {
        node = this.#head.nextNode;
        i--;
      }
      return node;
    }
    return null;
  }

  pop() {
    // Removes the last element from the list
    if (this.#size === 0) return null;
    const removedNode = Node(this.#tail.value);
    if (this.#size === 1) {
      this.#head = null;
      this.#tail = this.#head;
    } else {
      this.#tail = this.#tail.previousNode;
      this.#tail.nextNode = null;
    }
    this.#size--;
    return removedNode;
  }

  shift() {
    // Removes the first element from the list
    if (this.#size === 0) return null;
    const removedNode = Node(this.#head.value);
    if (this.#size === 1) {
      this.#head = null;
      this.#tail = this.#head;
    } else {
      this.#head = this.#head.nextNode;
      this.#head.previousNode = null;
    }
    this.#size--;
    return removedNode;
  }

  contains(value) {
    // Returns true if the passed in value is in the list and otherwise returns false.
    let node = this.#head;
    while (node !== null) {
      // TODO: Handle corner equality cases Array & Object!
      if (node.value === value) {
        return true;
      }
      node = node.nextNode;
    }
    return false;
  }

  find(value) {
    // Returns the index of the node containing value, or null if not found.
    let i = 0;
    let node = this.#head;
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

  toString() {
    // Represents your LinkedList objects as strings, so you can print them out and preview them in the console.
    // The format should be: ( value ) -> ( value ) -> ( value ) -> null
    let result = 'null';
    let node = this.#tail;
    while (node !== null) {
      result = `( ${node.value} ) -> ${result}`;
      node = node.previousNode;
    }
    return result;
  }

  insertAt(value, index) {
    // Inserts a new node with the provided value at the given index.
    if (!Number.isInteger(index) && index >= this.#size) {
      throw TypeError(
        `Node index must be an integer less than NodeList.size (${this.#size})!`,
      );
    }
    if (index < 0) {
      let previousNode = this.#tail;
      for (let i = index; i < -1; i++) {
        previousNode = previousNode.previousNode;
      }
      previousNode.nextNode = Node(value, previousNode.nextNode, previousNode);
    } else {
      let nextNode = this.#head;
      for (let i = 0; i < index; i++) {
        nextNode = nextNode.nextNode;
      }
      nextNode.previousNode = Node(value, nextNode, nextNode.previousNode);
    }
    return ++this.#size;
  }

  removeAt(index) {
    // Removes the node at the given index.
    if (Number.isInteger(index) && index < this.#size) {
      let node = null;
      if (index < 0) {
        node = this.#tail;
        for (let i = index; i < -1; i++) {
          node = node.previousNode;
        }
      } else {
        node = this.#head;
        for (let i = 0; i < index; i++) {
          node = node.nextNode;
        }
      }
      node.previousNode.nextNode = node.nextNode;
      this.#size--;
      return node;
    }
    return null;
  }
}

Object.freeze(Object.getPrototypeOf(LinkedList));
Object.freeze(LinkedList.prototype);
Object.freeze(LinkedList); // The static prototype (static members)

// export { LinkedList };

tempThis = LinkedList;

// TESTS
const list = new LinkedList('blah', 3, true);

console.log(list);

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
