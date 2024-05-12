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
