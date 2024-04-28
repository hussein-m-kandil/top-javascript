function Node(value = null, nextNode = null, previousNode = null) {
  const node = { value };
  let next = nextNode;
  let prev = previousNode;
  Object.defineProperties(node, {
    nextNode: {
      get: () => next,
      set() {
        throw Error('Read-only property (nextNode) cannot be assigned!');
      },
      configurable: false,
      enumerable: true,
    },
    previousNode: {
      get: () => prev,
      set() {
        throw Error('Read-only property (nextNode) cannot be assigned!');
      },
      configurable: false,
      enumerable: true,
    },
    setNext: {
      value: (newNext) => {
        next = newNext;
      },
      writable: false,
      configurable: false,
      enumerable: false,
    },
    setPrev: {
      value: (newPrev) => {
        prev = newPrev;
      },
      writable: false,
      configurable: false,
      enumerable: false,
    },
  });
  Object.setPrototypeOf(node, Node.prototype);
  Object.freeze(node);
  return node;
}

class LinkedList {
  #head = null;

  get head() {
    return this.#head;
  }

  #tail = null;

  get tail() {
    return this.#tail;
  }

  #size = 0;

  get length() {
    return this.#size;
  }

  constructor(...values) {
    // If there is any given values, fill the list with them
    if (values.length > 0) {
      values.forEach((v) => this.append(v));
    }
  }

  append(value) {
    // Adds a new node containing value to the end of the list
    if (this.#size === 0) {
      this.#head = Node(value);
      this.#tail = this.#head;
    } else if (this.#size === 1) {
      this.#tail = Node(value, null, this.#head);
      // this.#head.nextNode = this.#tail;
      this.#head.setNext(this.#tail);
    } else {
      const node = Node(value, null, this.#tail);
      // this.#tail.nextNode = node;
      this.#tail.setNext(node);
      this.#tail = node;
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
      // this.#tail.previousNode = this.#head;
      this.#tail.setPrev(this.#head);
    } else {
      const node = Node(value, this.#head);
      // this.#head.previousNode = node;
      this.#head.setPrev(node);
      this.#head = node;
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
      // this.#tail.nextNode = null;
      this.#tail.setNext(null);
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
      // this.#head.previousNode = null;
      this.#head.setPrev(null);
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
        `Node index must be an integer less than NodeList.this.#size (${this.#size})!`,
      );
    }
    if (index < 0) {
      let previousNode = this.#tail;
      for (let i = index; i < -1; i++) {
        previousNode = previousNode.previousNode;
      }
      previousNode.setNext(Node(value, previousNode.nextNode, previousNode));
    } else {
      let nextNode = this.#head;
      for (let i = 0; i < index; i++) {
        nextNode = nextNode.nextNode;
      }
      nextNode.setPrev(Node(value, nextNode, nextNode.previousNode));
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
      node.previousNode.setNext(node.nextNode);
      this.#size--;
      return node;
    }
    return null;
  }
}

// Prevent breaking the prototype of LinkedList class
Object.freeze(Object.getPrototypeOf(LinkedList.prototype));
Object.freeze(Object.getPrototypeOf(LinkedList));
Object.freeze(LinkedList.prototype);
Object.freeze(LinkedList);

// TESTS
const list = new LinkedList('blah', 3, true);

console.log("'list' constructor: ", Object.getPrototypeOf(list).constructor);
console.log("'list' instanceof LinkedList? ", list instanceof LinkedList);
console.log("'list': ", list);
delete list.append;
list.prepend = 'foo';
list.head = 'bar';
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

// list.head.nextNode = list.head; // Leads to error
// console.log(`\n${list.toString()}`);
// console.log(
//   `length: ${list.length}, head: ${list.head.value}, tail: ${list.tail.value}`,
// );

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
