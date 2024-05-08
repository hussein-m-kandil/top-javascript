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
    console.log(key, hash);
    return hash;
  }

  set(...args) {
    if (args.length < 2) {
      throw TypeError('The "set" method expects 2 arguments: .set(key, value)');
    }
    const keyValueObject = {
      key: HashMap.#getStringKeyAndValidate(args[0]),
      value: args[1],
    };
    const hash = this.#hash(keyValueObject.key);
    const bucketLinkedList = this.#getBucket(hash);
    if (bucketLinkedList === undefined) {
      const newLinkedList = new LinkedList();
      newLinkedList.append(keyValueObject);
      this.#setBucket(hash, newLinkedList);
    } else {
      const node = HashMap.#findNode(bucketLinkedList, keyValueObject.key);
      if (node === null) {
        bucketLinkedList.append(keyValueObject);
      } else {
        node.value = keyValueObject;
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
    const key = HashMap.#getStringKeyAndValidate(args[0]);
    const hash = this.#hash(key);
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
    const key = HashMap.#getStringKeyAndValidate(args[0]);
    const hash = this.#hash(key);
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
    const key = HashMap.#getStringKeyAndValidate(args[0]);
    const hash = this.#hash(key);
    const bucketLinkedList = this.#getBucket(hash);
    if (bucketLinkedList !== undefined) {
      const node = HashMap.#findNode(bucketLinkedList, key);
      if (node === null) return false;
      bucketLinkedList.removeAt(bucketLinkedList.find(node.value));
      if (bucketLinkedList.length === 0) this.#setBucket(hash, undefined);
      return true;
    }
    return false;
  }
}

// I think we need to obey Open-Closed principle which broken by the immutability of JS prototypes/objects
Object.freeze(Object.getPrototypeOf(HashMap)); // Freeze the prototype of class members
Object.freeze(HashMap.prototype); // Freeze the instantiation prototype
Object.freeze(HashMap); // Freeze the class members

export { HashMap };
