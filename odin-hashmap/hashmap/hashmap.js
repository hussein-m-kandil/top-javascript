import LinkedList from '../../odin-linked-list/linked-list';

export default class HashMap {
  #buckets = Array(16);

  #length = 0;

  get length() {
    return this.#length;
  }

  constructor(...args) {
    if (args.length > 0) {
      throw TypeError(`HashMap constructor does not expect any arguments!`);
    }
    Object.freeze(this); // Freeze every new instance
  }

  static #getStringKeyAndValidate(key) {
    if (typeof key === 'object') {
      throw TypeError('The "key" (first argument) cannot be of TYPE "object"');
    }
    if (key === '') {
      throw TypeError('The "key" (first argument) cannot be EMPTY "string"');
    }
    return String(key);
  }

  #getBucket(index) {
    if (index < 0 || index >= this.#buckets.length) {
      throw new Error('Trying to access index out of bound');
    }
    return this.#buckets[index];
  }

  #setBucket(index, nodeListValue) {
    if (index < 0 || index >= this.#buckets.length) {
      throw new Error('Trying to access index out of bound');
    }
    this.#buckets[index] = nodeListValue;
  }

  #hash(key) {
    const PRIME_NUMBER = 31;
    let hash = 0;
    for (let i = 0; i < key.length; i++) {
      hash += (key.charCodeAt(i) * PRIME_NUMBER) % this.#buckets.length;
    }
    hash %= this.#buckets.length;
    console.log(key, hash);
    return hash;
  }

  set(...args) {
    if (args.length < 2) {
      throw TypeError('The "set" method expects 2 arguments: .set(key, value)');
    }
    const keyValuePair = [args[0], args[1]];
    const hash = this.#hash(HashMap.#getStringKeyAndValidate(keyValuePair[0]));
    const bucketLinkedList = this.#getBucket(hash);
    if (bucketLinkedList === undefined) {
      const newLinkedList = new LinkedList();
      newLinkedList.append(keyValuePair);
      this.#setBucket(hash, newLinkedList);
    } else {
      let notFound = true;
      let node = bucketLinkedList.head;
      while (node !== null) {
        const [key] = node.value;
        if (key === keyValuePair[0]) {
          node.value = keyValuePair;
          notFound = false;
          break;
        }
        node = node.nextNode;
      }
      if (notFound) {
        bucketLinkedList.append(keyValuePair);
      }
    }
    this.#length++;
    // TODO: Scale up of the size factor has been exceeded
    return this;
  }

  get(...args) {
    if (args.length < 1) {
      throw TypeError('The "get" method expects 1 argument: .get(key)');
    }
    const key = args[0];
    const hash = this.#hash(HashMap.#getStringKeyAndValidate(key));
    const bucketLinkedList = this.#getBucket(hash);
    if (bucketLinkedList !== undefined) {
      let node = bucketLinkedList.head;
      while (node !== null) {
        const keyValuePair = node.value;
        if (keyValuePair[0] === key) return keyValuePair[1];
        node = node.nextNode;
      }
    }
    return null;
  }
}

// I think we need to obey Open-Closed principle which broken by the immutability of JS prototypes/objects
Object.freeze(Object.getPrototypeOf(HashMap)); // Freeze the prototype of class members
Object.freeze(HashMap.prototype); // Freeze the instantiation prototype
Object.freeze(HashMap); // Freeze the class members

export { HashMap };
