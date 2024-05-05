import Node from './node.js';
import isDeeplyEqual from './helpers/isDeeplyEqual.js';

/**
 * @module LinkedList
 */

/**
 * Linked list class.
 */
export default class LinkedList {
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

  /**
   * Constructor of LinkedList class. An instance of LinkedList has the following:
   * - append(value): adds a new node containing value to the end of the list
   * - prepend(value): adds a new node containing value to the start of the list
   * - size: returns the total number of nodes in the list
   * - head: returns the first node in the list
   * - tail: returns the last node in the list
   * - at(index): returns the node at the given index
   * - pop: removes the last element from the list
   * - contains(value): returns true if the passed in value is in the list and otherwise returns false.
   * - find(value): returns the index of the node containing value, or null if not found.
   * - toString: represents your LinkedList objects as strings, so you can print them out and preview them in the console.
   *   The format should be: ( value ) -> ( value ) -> ( value ) -> null
   * - insertAt(value, index): that inserts a new node with the provided value at the given index.
   * - removeAt(index): that removes the node at the given index.
   * @param  {...any} values - Any number of any values to fill the instance with.
   * @returns {LinkedList}
   */
  constructor(...values) {
    // If there is any given values, fill the list with them
    if (values.length > 0) {
      values.forEach((v) => this.append(v));
    }
  }

  append(...values) {
    // Adds a new node containing value to the end of the list
    values.forEach((value) => {
      if (this.#size === 0) {
        this.#head = Node(value);
        this.#tail = this.#head;
      } else if (this.#size === 1) {
        this.#tail = Node(value, null, this.#head);
        this.#head.setNext(this.#tail);
      } else {
        const node = Node(value, null, this.#tail);
        this.#tail.setNext(node);
        this.#tail = node;
      }
      this.#size++;
    });
    return this;
  }

  prepend(...values) {
    // Adds a new node containing value to the start of the list
    for (let i = values.length - 1; i >= 0; i--) {
      const value = values[i];
      if (this.#size === 0) {
        this.#head = Node(value);
        this.#tail = this.#head;
      } else if (this.#size === 1) {
        this.#head = Node(value, this.#tail);
        this.#tail.setPrev(this.#head);
      } else {
        const node = Node(value, this.#head);
        this.#head.setPrev(node);
        this.#head = node;
      }
      this.#size++;
    }
    return this;
  }

  at(index) {
    // Returns the node at the given index
    let i = Number(index);
    if (
      !Number.isInteger(i) ||
      (i > -1 && i > this.#size - 1) ||
      (i < 0 && Math.abs(i) > this.#size)
    ) {
      throw Error('Invalid index!');
    }
    if (this.#size === 0) throw Error('The linked list is empty!');
    if (i < 0) {
      let node = this.#tail;
      while (i < -1) {
        node = node.previousNode;
        i++;
      }
      return node;
    }
    let node = this.#head;
    while (i > 0) {
      node = node.nextNode;
      i--;
    }
    return node;
  }

  contains(value) {
    // Returns true if the passed in value is in the list and otherwise returns false.
    let node = this.#head;
    while (node !== null) {
      if (isDeeplyEqual(node.value, value)) {
        return true;
      }
      node = node.nextNode;
    }
    return false;
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
      this.#head.setPrev(null);
    }
    this.#size--;
    return removedNode;
  }

  find(value) {
    // Returns the index of the node containing value, or null if not found.
    let i = 0;
    let node = this.#head;
    while (node !== null) {
      if (isDeeplyEqual(node.value, value)) {
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
    if (
      !Number.isInteger(index) ||
      (index > -1 && index > this.#size) ||
      (index < 0 && Math.abs(index) > this.#size + 1)
    ) {
      throw TypeError(
        `Node index must be an integer in the range of (0 : ${this.#size}) or (-1 : -${this.#size + 1})!`,
      );
    }
    if (
      this.#size === 0 ||
      (this.#size === 1 && (index === this.#size || index === -1))
    ) {
      this.append(value);
    } else if (
      this.#size === 1 &&
      (index === 0 || index === this.#size + 1 - 1)
    ) {
      this.prepend(value);
    } else if (index === 0 || index === (this.#size + 1) * -1) {
      const nodeAfterHead = this.#head;
      this.#head = Node(value, nodeAfterHead);
      nodeAfterHead.setPrev(this.#head);
    } else if (index === this.#size || index === -1) {
      const nodeBeforeTail = this.#tail;
      this.#tail = Node(value, null, nodeBeforeTail);
      nodeBeforeTail.setNext(this.#tail);
    } else if (index < 0) {
      let toBePreviousNode = this.#tail;
      for (let i = index; i < -1; i++) {
        toBePreviousNode = toBePreviousNode.previousNode;
      }
      const node = Node(value, toBePreviousNode.nextNode, toBePreviousNode);
      toBePreviousNode.nextNode.setPrev(node);
      toBePreviousNode.setNext(node);
    } else {
      let toBeNextNode = this.#head;
      for (let i = 0; i < index; i++) {
        toBeNextNode = toBeNextNode.nextNode;
      }
      const node = Node(value, toBeNextNode, toBeNextNode.previousNode);
      toBeNextNode.previousNode.setNext(node);
      toBeNextNode.setPrev(node);
    }
    this.#size++;
    return this;
  }

  removeAt(index) {
    // Removes the node at the given index.
    if (
      !Number.isInteger(index) ||
      (index > -1 && index > this.#size - 1) ||
      (index < 0 && Math.abs(index) > this.#size)
    ) {
      throw Error('Invalid index!');
    }
    let node = null;
    if (index === 0 || index === this.#size * -1) {
      node = this.#head;
      this.#head = node.nextNode;
      this.#head.setPrev(null);
    } else if (index === this.#size - 1 || index === -1) {
      node = this.#tail;
      this.#tail = node.previousNode;
      this.#tail.setNext(null);
    } else {
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
      node.nextNode.setPrev(node.previousNode);
    }
    this.#size--;
    return node;
  }

  forEach(func) {
    if (typeof func !== 'function') {
      throw TypeError('The given argument must be of type "function"!');
    }
    let i = 0;
    let node = this.#head;
    while (node !== null) {
      func(node.value, i);
      node = node.nextNode;
      i++;
    }
  }

  filter(func) {
    if (typeof func !== 'function') {
      throw TypeError('The given argument must be of type "function"!');
    }
    const newList = new LinkedList();
    let i = 0;
    let node = this.#head;
    while (node !== null) {
      const passed = func(node.value, i);
      if (typeof passed !== 'boolean') {
        throw TypeError('The given function must return a "boolean" value!');
      }
      if (passed) {
        newList.append(node.value);
      }
      node = node.nextNode;
      i++;
    }
    return newList;
  }

  map(func) {
    if (typeof func !== 'function') {
      throw TypeError('The given argument must be of type "function"!');
    }
    const newList = new LinkedList();
    let i = 0;
    let node = this.#head;
    while (node !== null) {
      newList.append(func(node.value, i));
      node = node.nextNode;
      i++;
    }
    return newList;
  }
}

// Prevent breaking the prototype of LinkedList class
Object.freeze(LinkedList); // For static members' prototype
Object.freeze(LinkedList.prototype); // For instance members' prototype
Object.freeze(Object.getPrototypeOf(LinkedList)); // For static members' prototype's prototype (just in case :))

export { LinkedList };
