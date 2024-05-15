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
    // Just to practice recursion ;)
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
    // Just to practice recursion ;)
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

  static #getValuesInOrderRecursively(root) {
    // Just to practice recursion ;)
    if (root === null) return [];
    return [
      ...Tree.#getValuesInOrderRecursively(root.left),
      root.value,
      ...Tree.#getValuesInOrderRecursively(root.right),
    ];
  }

  static #getValuesInOrderIteratively(root) {
    const values = [];
    if (root) {
      // Use a stack of node and structure a 'node entry' in it as: [node.left, node, node.right]
      const stack = [[root.left, root, root.right]];
      while (stack.length !== 0) {
        const [left, node, right] = stack.shift(); // Get values of a node entry
        if (left) {
          // If it has 'left node', then put it back on top of the stack (WITH 'null' AS ITS 'left node')
          // Then put this 'left node' on top the stack (on top of its parent) as a new 'node entry'
          // This way when we get to the current node again, it has no 'left node' hence the 'else' branch executes
          stack.unshift([left.left, left, left.right], [null, node, right]);
        } else {
          values.push(node.value);
          if (right) stack.unshift([right.left, right, right.right]);
        }
      }
    }
    return values;
  }

  static #applyCallbackInOrderRecursively(root, callback) {
    // Just to practice recursion ;)
    if (root === null) return;
    Tree.#applyCallbackInOrderRecursively(root.left, callback);
    callback(root);
    Tree.#applyCallbackInOrderRecursively(root.right, callback);
  }

  static #applyCallbackInOrderIteratively(root, callback) {
    // See #getValuesInOrderIteratively for descriptive comments
    if (root) {
      const stack = [[root.left, root, root.right]];
      while (stack.length !== 0) {
        const [left, node, right] = stack.shift();
        if (left) {
          stack.unshift([left.left, left, left.right], [null, node, right]);
        } else {
          callback(node);
          if (right) stack.unshift([right.left, right, right.right]);
        }
      }
    }
  }

  inOrder(callback) {
    const givenCallback = typeof callback === 'function';
    if (typeof callback !== 'undefined' && !givenCallback) {
      throw TypeError(
        `The "inOrder" method accepts an optional argument of type "function"! but given: ${callback}`,
      );
    }
    if (givenCallback) {
      return Tree.#applyCallbackInOrderIteratively(this.#root, callback);
    }
    return Tree.#getValuesInOrderIteratively(this.#root);
  }

  static #getValuesPreOrder(root) {
    const values = [];
    if (root) {
      // Create stack to contain the nodes, each of which, in the form of: [node, node.left, node.right]
      const stack = [[root, root.left, root.right]];
      while (stack.length !== 0) {
        // Pop the top entry from the stack
        const [node, left, right] = stack.shift();
        // visit the node
        values.push(node.value);
        // Create new entries for left node if not null & right node if not null (respect the order)
        const leftRightNodes = [];
        if (left) leftRightNodes.push([left, left.left, left.right]);
        if (right) leftRightNodes.push([right, right.left, right.right]);
        // In left-right order, put the created entries (if any) on top of the stack
        if (leftRightNodes.length !== 0) stack.unshift(...leftRightNodes);
      }
    }
    return values;
  }

  static #applyCallbackPreOrder(root, callback) {
    // See #getValuesPreOrder for descriptive comments
    if (root) {
      const stack = [[root, root.left, root.right]];
      while (stack.length !== 0) {
        const [node, left, right] = stack.shift();
        callback(node);
        const leftRightNodes = [];
        if (left) leftRightNodes.push([left, left.left, left.right]);
        if (right) leftRightNodes.push([right, right.left, right.right]);
        if (leftRightNodes.length !== 0) stack.unshift(...leftRightNodes);
      }
    }
  }

  preOrder(callback) {
    const givenCallback = typeof callback === 'function';
    if (typeof callback !== 'undefined' && !givenCallback) {
      throw TypeError(
        `The "preOrder" method accepts an optional argument of type "function"! but given: ${callback}`,
      );
    }
    if (givenCallback) {
      return Tree.#applyCallbackPreOrder(this.#root, callback);
    }
    return Tree.#getValuesPreOrder(this.#root);
  }

  static #getValuesPostOrder(root) {
    const values = [];
    if (root) {
      // Create stack to contain nodes entries, each of which in the form of: [node.left, node.right, node]
      const stack = [[root.left, root.right, root]];
      while (stack.length !== 0) {
        // Pop the top 'node entry' from the stack
        const [left, right, node] = stack.shift();
        // Create a temporary container for 'left node' & 'right node' entries (in left-right order)
        const leftRightCurrentNodes = [];
        // If 'left node' not null put its entry in the temporary container & do the same for 'right node'
        if (left) leftRightCurrentNodes.push([left.left, left.right, left]);
        if (right) leftRightCurrentNodes.push([right.left, right.right, right]);
        // If the temporary container holds any entries,
        if (leftRightCurrentNodes.length !== 0) {
          // Append to it an extra entry for the 'current node' has 'left node' & 'right node' set to null
          leftRightCurrentNodes.push([null, null, node]);
          // Push these entries (in left-right-current order) on top of the stack
          // This way the 'current node' gets parsed again but without 'left' nor 'right', so it gets processed
          stack.unshift(...leftRightCurrentNodes);
        } else {
          // If the temporary container is empty (both 'left' & 'right' are null), process the 'current node'
          values.push(node.value);
        }
      }
    }
    return values;
  }

  static #applyCallbackPostOrder(root, callback) {
    // See #getValuesPostOrder for descriptive comments
    if (root) {
      const stack = [[root.left, root.right, root]];
      while (stack.length !== 0) {
        const [left, right, node] = stack.shift();
        const leftRightCurrentNodes = [];
        if (left) leftRightCurrentNodes.push([left.left, left.right, left]);
        if (right) leftRightCurrentNodes.push([right.left, right.right, right]);
        if (leftRightCurrentNodes.length !== 0) {
          leftRightCurrentNodes.push([null, null, node]);
          stack.unshift(...leftRightCurrentNodes);
        } else {
          callback(node);
        }
      }
    }
  }

  postOrder(callback) {
    const givenCallback = typeof callback === 'function';
    if (typeof callback !== 'undefined' && !givenCallback) {
      throw TypeError(
        `The "postOrder" method accepts an optional argument of type "function"! but given: ${callback}`,
      );
    }
    if (givenCallback) {
      return Tree.#applyCallbackPostOrder(this.#root, callback);
    }
    return Tree.#getValuesPostOrder(this.#root);
  }

  static #getHeightIteratively(node) {
    // Here i prefer using the iterative solution, despite of the conciseness of the recursive solution
    if (node) {
      let height = -1;
      const q = [node];
      while (q.length !== 0) {
        height++;
        const levelLength = q.length;
        for (let i = 0; i < levelLength; i++) {
          const levelNode = q.shift();
          if (levelNode) q.push(levelNode.left, levelNode.right);
        }
      }
      // Return the current height value minus 1 (the last level; all nodes are null)
      return height - 1;
    }
    return -1;
  }

  static #getHeightRecursively(node) {
    // Just to practice recursion ;)
    if (!node) return -1;
    const leftHeight = 1 + Tree.#getHeightRecursively(node.left);
    const rightHeight = 1 + Tree.#getHeightRecursively(node.right);
    return leftHeight > rightHeight ? leftHeight : rightHeight;
  }

  height(node) {
    if (
      !(node instanceof Node) ||
      typeof node.value !== 'number' ||
      this.find(node.value) === null
    ) {
      throw TypeError(
        `The "height" method expects only one node form this tree as an argument! given "${node}"`,
      );
    }
    return Tree.#getHeightIteratively(node);
  }

  static #getDepthIteratively(root, node) {
    if (!root || !node) return -1;
    let depth = -1;
    const q = [root];
    while (q.length !== 0) {
      depth++;
      const levelLength = q.length;
      for (let i = 0; i < levelLength; i++) {
        const levelNode = q.shift();
        if (levelNode) {
          if (levelNode.value === node.value) return depth;
          q.push(levelNode.left, levelNode.right);
        }
      }
    }
    return -1;
  }

  static #getDepthRecursively(root, node) {
    // Just to practice recursion ;)
    if (!root || !node) return -1;
    if (root.value === node.value) return 0;
    const leftDepth = Tree.#getDepthRecursively(root.left, node);
    const rightDepth = Tree.#getDepthRecursively(root.right, node);
    if (leftDepth > -1) return leftDepth + 1;
    if (rightDepth > -1) return rightDepth + 1;
    return -1;
  }

  depth(node) {
    if (
      !(node instanceof Node) ||
      typeof node.value !== 'number' ||
      this.find(node.value) === null
    ) {
      throw TypeError(
        `The "depth" method expects only one node form this tree as an argument! given "${node}"`,
      );
    }
    return Tree.#getDepthIteratively(this.#root, node);
  }

  isBalanced() {
    if (arguments.length > 0) {
      throw TypeError(
        `The 'isBalanced' method does not expect any arguments! given: '${arguments.join(', ')}'`,
      );
    }
    const root = this.#root;
    if (!root) return true;
    if (!root.left && !root.right) return true;
    const leftHeight = root.left ? this.height(root.left) : -1;
    const rightHeight = root.right ? this.height(root.right) : -1;
    return Math.abs(leftHeight - rightHeight) < 2;
  }

  rebalance() {
    if (arguments.length > 0) {
      throw TypeError(
        `The 'rebalance' method does not expect any arguments! given: '${arguments.join(', ')}'`,
      );
    }
    // Rebalance, even if it is balanced
    return this.buildTree(this.inOrder());
  }

  print() {
    // This code form the assignment page on the website of 'The Odin Project'
    // https://www.theodinproject.com/lessons/javascript-binary-search-trees
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
