export default class HashMap {
  #buckets = new Array(16);

  constructor() {
    Object.freeze(this); // Freeze every new instance
  }

  getBucket(index) {
    if (index < 0 || index >= this.#buckets.length) {
      throw new Error('Trying to access index out of bound');
    }
    return this.#buckets[index];
  }
}

// I think we need to obey Open-Closed principle which broken by the immutability of JS prototypes/objects
Object.freeze(Object.getPrototypeOf(HashMap)); // Freeze the prototype of class members
Object.freeze(HashMap.prototype); // Freeze the instantiation prototype
Object.freeze(HashMap); // Freeze the class members

export { HashMap };
