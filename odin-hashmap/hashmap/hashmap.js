import LinkedList from '../../odin-linked-list/linked-list';

export default class HashMap {
  static #FACTOR = 0.75;

  static #SCALE = 1.5;

  #buckets = Array(16);

  #entriesCount = 0;

  static get FACTOR() {
    return HashMap.#FACTOR; // Just to test scaling
  }

  static get SCALE() {
    return HashMap.#SCALE; // Just to test scaling
  }

  get capacity() {
    return this.#buckets.length; // Just to test scaling
  }

  get length() {
    return this.#entriesCount;
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

  static #findNode(bucketLinkedList, key) {
    let node = bucketLinkedList.head;
    while (node) {
      if (node.value.key === key) return node;
      node = node.nextNode;
    }
    return null;
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
    return hash;
  }

  #scaleUpIfNeeded() {
    if (this.#entriesCount / this.#buckets.length > HashMap.#FACTOR) {
      const entries = this.entries();
      this.#buckets = Array(Math.floor(this.#buckets.length * HashMap.#SCALE));
      this.#entriesCount = 0;
      entries.forEach(([key, value]) => this.set(key, value));
    }
  }

  set(...args) {
    if (args.length < 2) {
      throw TypeError('The "set" method expects 2 arguments: .set(key, value)');
    }
    const keyValueObject = {
      key: args[0],
      value: args[1],
    };
    const hash = this.#hash(
      HashMap.#getStringKeyAndValidate(keyValueObject.key),
    );
    const bucketLinkedList = this.#getBucket(hash);
    if (bucketLinkedList === undefined) {
      // Create new bucket linked-list
      const newLinkedList = new LinkedList();
      newLinkedList.append(keyValueObject);
      this.#setBucket(hash, newLinkedList);
    } else {
      // If the key exist, then update, else add
      const node = HashMap.#findNode(bucketLinkedList, keyValueObject.key);
      if (node === null) {
        bucketLinkedList.append(keyValueObject);
      } else {
        node.value = keyValueObject;
      }
    }
    this.#entriesCount++;
    this.#scaleUpIfNeeded(); // Scale up if entries more than buckets
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
      const node = HashMap.#findNode(bucketLinkedList, key);
      if (node !== null) return node.value.value;
    }
    return null;
  }

  has(...args) {
    if (args.length < 1) {
      throw TypeError('The "has" method expect 1 argument: .has(key)');
    }
    const key = args[0];
    const hash = this.#hash(HashMap.#getStringKeyAndValidate(key));
    const bucketLinkedList = this.#getBucket(hash);
    if (bucketLinkedList !== undefined) {
      return HashMap.#findNode(bucketLinkedList, key) !== null;
    }
    return false;
  }

  remove(...args) {
    if (args.length < 1) {
      throw TypeError('The "remove" method expect 1 argument: .remove(key)');
    }
    const key = args[0];
    const hash = this.#hash(HashMap.#getStringKeyAndValidate(key));
    const bucketLinkedList = this.#getBucket(hash);
    if (bucketLinkedList !== undefined) {
      const node = HashMap.#findNode(bucketLinkedList, key);
      if (!node) return false;
      bucketLinkedList.removeAt(bucketLinkedList.find(node.value));
      if (bucketLinkedList.length === 0) this.#setBucket(hash, undefined);
      this.#entriesCount--;
      return true;
    }
    return false;
  }

  clear(...args) {
    if (args.length > 0) {
      throw TypeError('The "clear" method expect ZERO (0) arguments: .clear()');
    }
    this.#buckets.forEach((bucket, i) => this.#setBucket(i, undefined));
    this.#entriesCount = 0;
  }

  #getKeysOrValuesOrEntries(type = 'entries') {
    type = type.toLocaleLowerCase();
    const result = [];
    this.#buckets.forEach((bucketLinkedList) => {
      if (bucketLinkedList) {
        bucketLinkedList.forEach((nodeValue) => {
          switch (type) {
            case 'keys':
              result.push(nodeValue.key);
              break;
            case 'values':
              result.push(nodeValue.value);
              break;
            default:
              result.push([nodeValue.key, nodeValue.value]);
          }
        });
      }
    });
    return result;
  }

  keys(...args) {
    if (args.length > 0) {
      throw TypeError('The "keys" method expect ZERO (0) arguments: .keys()');
    }
    return this.#getKeysOrValuesOrEntries('keys');
  }

  values(...args) {
    if (args.length > 0) {
      throw TypeError(
        'The "values" method expect ZERO (0) arguments: .values()',
      );
    }
    return this.#getKeysOrValuesOrEntries('values');
  }

  entries(...args) {
    if (args.length > 0) {
      throw TypeError(
        'The "entries" method expect ZERO (0) arguments: .entries()',
      );
    }
    return this.#getKeysOrValuesOrEntries('entries');
  }
}

// I think we need to obey Open-Closed principle which broken by the immutability of JS prototypes/objects
Object.freeze(Object.getPrototypeOf(HashMap)); // Freeze the prototype of class members
Object.freeze(HashMap.prototype); // Freeze the instantiation prototype
Object.freeze(HashMap); // Freeze the class members

export { HashMap };
