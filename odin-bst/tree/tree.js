import { Node } from './helpers/node';
import { mergeSort } from './helpers/merge-sort';
import { removeDuplicates } from './helpers/remove-duplicates';

export default class Tree {
  #root = null;

  get root() {
    return this.#root;
  }

  constructor(...args) {
    if (args.length > 1) {
      throw TypeError(
        "Tree's 'constructor' accepts, at most, single argument: an array of number!",
      );
    }
    if (args.length === 1) {
      this.buildTree(args[0]);
    }
  }

  static #balanceNumbersRecursivelyInBST(arr, startIndex, endIndex) {
    // Just to practice recursion,
    // I do not manage to use it to avoid stack overflow because there is no limit on the array's length
    if (startIndex > endIndex || arr.length === 0) {
      return null;
    }
    const midIndex = Math.floor((startIndex + endIndex) / 2);
    const root = Node(arr[midIndex]);
    root.setLeft(
      Tree.#balanceNumbersRecursivelyInBST(arr, startIndex, midIndex - 1),
    );
    root.setRight(
      Tree.#balanceNumbersRecursivelyInBST(arr, midIndex + 1, endIndex),
    );
    return root;
  }

  static #balanceNumbersInBST(numbers) {
    if (numbers.length === 0) return null; // Just in case ;)
    const midIndex = Math.floor(numbers.length / 2);
    const root = Node(numbers[midIndex]);
    const q = [
      [root, [0, midIndex - 1]],
      [root, [midIndex + 1, numbers.length - 1]],
    ];
    while (q.length > 0) {
      const [parent, [startIndex, endIndex]] = q.shift();
      if (endIndex >= startIndex) {
        const sideMidIndex = Math.floor((startIndex + endIndex) / 2);
        const child = Node(numbers[sideMidIndex]);
        if (child.value < parent.value) {
          parent.setLeft(child);
        } else {
          parent.setRight(child);
        }
        q.push(
          [child, [startIndex, sideMidIndex - 1]],
          [child, [sideMidIndex + 1, endIndex]],
        );
      }
    }
    return root;
  }

  buildTree(numbers) {
    if (
      !Array.isArray(numbers) ||
      numbers.length === 0 ||
      !numbers.every((x) => typeof x === 'number')
    ) {
      throw TypeError(
        'The "buildTree" method must get called with an array of numbers (only)!',
      );
    }
    const sortedUniqueNumbers = mergeSort(removeDuplicates(numbers));
    this.#root = Tree.#balanceNumbersInBST(sortedUniqueNumbers);
    return this.#root;
  }

  static #insertRecursively(oldNode, newNode) {
    // Just to practice recursion ;)
    if (oldNode === null) return newNode;
    if (oldNode.value > newNode.value) {
      oldNode.setLeft(Tree.#insertRecursively(oldNode.left, newNode));
    } else if (oldNode.value < newNode.value) {
      oldNode.setRight(Tree.#insertRecursively(oldNode.right, newNode));
    }
    return oldNode;
  }

  static #insertIteratively(root, newNode) {
    if (root === null) return newNode;
    let parent = null;
    let child = root;
    while (child !== null) {
      if (child.value === newNode.value) return root;
      parent = child;
      child = child.value > newNode.value ? child.left : child.right;
    }
    if (parent.value > newNode.value) parent.setLeft(newNode);
    else parent.setRight(newNode);
    return root;
  }

  insert(number) {
    if (typeof number !== 'number') {
      throw TypeError(
        `The "insert" method expects a value of type "number", given "${number}"!`,
      );
    }
    this.#root = Tree.#insertIteratively(this.#root, Node(number));
    return this.#root;
  }

  deleteItem(number) {
    if (typeof number !== 'number') {
      throw TypeError(
        `The "deleteItem" method expects a value of type "number", given "${number}"!`,
      );
    }
    let parent = null;
    let child = this.#root;
    let toRight = false;
    while (child !== null) {
      // Find a node to be deleted
      if (child.value === number) {
        // If one side of it is null assign the other side to its parent, even if it is also null ;)
        if (child.right === null || child.left === null) {
          if (toRight) parent.setRight(child.right || child.left);
          else parent.setLeft(child.right || child.left);
          return true;
        }
        // In case both sides are not null, get min node of right side
        let minRightNodeParent = child;
        let minRightNode = child.right;
        let nextMin = minRightNode.left;
        while (nextMin !== null) {
          if (nextMin.value < minRightNode.value) {
            minRightNodeParent = minRightNode;
            minRightNode = nextMin;
          }
          nextMin = nextMin.left;
        }
        // Exchange the found node's value with the right side min node's value of the right side,
        // then continue to find it again, but that time its left is 'null' so the previous 'if' is 'true'
        child.value = minRightNode.value;
        minRightNode.value = number;
        parent = minRightNodeParent;
        child = minRightNode;
      } else {
        parent = child;
        toRight = child.value < number;
        child = toRight ? child.right : child.left;
      }
    }
    return false;
  }

  find(number) {
    if (typeof number !== 'number') {
      throw TypeError(
        `The "find" method expects a value of type "number", given "${number}"!`,
      );
    }
    let node = this.#root;
    while (node !== null) {
      if (node.value === number) return node;
      node = number < node.value ? node.left : node.right;
    }
    return null;
  }

  static #getValuesInLevelOrderRecursively(q) {
    if (q.length === 0) return [];
    const node = q.shift();
    if (node !== null) {
      q.push(node.left, node.right);
      return [node.value, ...Tree.#getValuesInLevelOrderRecursively(q)];
    }
    return Tree.#getValuesInLevelOrderRecursively(q);
  }

  static #getValuesInLevelOrderIteratively(root) {
    const values = [];
    const q = [root];
    while (q.length !== 0) {
      const node = q.shift();
      if (node !== null) {
        values.push(node.value);
        q.push(node.left, node.right);
      }
    }
    return values;
  }

  static #applyCallbackInLevelOrderIteratively(root, callback) {
    const q = [root];
    while (q.length !== 0) {
      const node = q.shift();
      if (node !== null) {
        callback(node);
        q.push(node.left, node.right);
      }
    }
  }

  levelOrder(callback) {
    const givenCallback = typeof callback === 'function';
    if (typeof callback !== 'undefined' && !givenCallback) {
      throw TypeError(
        `The "levelOrder" method accepts an optional argument of type "function"! but given: ${callback}`,
      );
    }
    if (givenCallback) {
      return Tree.#applyCallbackInLevelOrderIteratively(this.#root, callback);
    }
    return Tree.#getValuesInLevelOrderIteratively(this.#root);
  }

  print() {
    (function prettyPrint(node, prefix = '', isLeft = true) {
      if (node === null) {
        return;
      }
      if (node.right !== null) {
        prettyPrint(node.right, `${prefix}${isLeft ? '│   ' : '    '}`, false);
      }
      console.log(`${prefix}${isLeft ? '└── ' : '┌── '}${node.value}`);
      if (node.left !== null) {
        prettyPrint(node.left, `${prefix}${isLeft ? '    ' : '│   '}`, true);
      }
    })(this.root);
  }
}

export { Tree };
