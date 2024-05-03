/**
 * Return a node of linked list, containing a value property and a link to the nextNode, set both as null by default.
 * @param {any} value
 * @param {Node?} nextNode
 * @param {Node?} previousNode
 * @returns {Node}
 */
export default function Node(
  value = null,
  nextNode = null,
  previousNode = null,
) {
  const node = { value };
  // Store the values locally to mutate their values privately
  let next = nextNode;
  let prev = previousNode;
  // Define next/prev properties freezed and with accessors to get the recent value from locals
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
  });
  // Define a parent object for node to inherit from which setters for next/prev
  // A, non-enumerable, inherited property couldn't be found (almost hidden) except using 'in' operator
  // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Enumerability_and_ownership_of_properties#querying_object_properties
  // this way we make the setters far less approachable to prevent unintended mutations
  const nodeParent = {};
  const checkType = (v) => {
    if (v !== null && !(v instanceof Node)) {
      throw TypeError("Node value must be 'Node' or 'null'!");
    }
    return true;
  };
  Object.defineProperties(nodeParent, {
    setNext: {
      value: (newNext) => {
        if (checkType(newNext)) next = newNext;
      },
      writable: false,
      configurable: false,
      enumerable: false,
    },
    setPrev: {
      value: (newPrev) => {
        if (checkType(newPrev)) prev = newPrev;
      },
      writable: false,
      configurable: false,
      enumerable: false,
    },
  });
  Object.setPrototypeOf(nodeParent, Node.prototype); // Make it an instance of Node
  Object.setPrototypeOf(node, nodeParent); // Inherit from Node instance has setters
  Object.freeze(nodeParent);
  Object.seal(node);
  return node;
}

Object.freeze(Node.prototype);

export { Node };
