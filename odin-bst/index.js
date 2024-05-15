import './index.css';
import { mergeSort } from './tree/helpers/merge-sort';
import { Tree } from './tree';

window.Tree = Tree;

console.log(
  '%cTie it all together %c\t("Tree" constructor is available here in the "console")\n',
  'color: orange',
  'color: gray',
);
console.log(
  '%c\tCreate a binary search tree from an array of random numbers < 100.\n',
  'color: orange',
);
const randNumbersLessThan100 = [];
for (let i = 0; i < 13; i++) {
  let randNum;
  do {
    randNum = Math.floor(Math.random() * 100);
  } while (randNumbersLessThan100.includes(randNum));
  randNumbersLessThan100.push(randNum);
}
let valuesInOrder = mergeSort(randNumbersLessThan100);
console.log(`%c\tNumbers List: \n\t\t${valuesInOrder}\n`, 'color: green');
const tree = new Tree(randNumbersLessThan100);
console.log(
  `%c\tTree root is (${tree.root.value}) and should be (${
    valuesInOrder[Math.floor(valuesInOrder.length / 2)]
  })\n`,
  'color: green',
);
console.log(
  '%c\tConfirm that the tree is balanced by calling isBalanced.',
  'color: orange',
);
console.log(`%c\tIs tree balanced? (${tree.isBalanced()})\n`, 'color: green');
console.log(
  '%c\tPrint out all elements in level, pre, post, and in order.',
  'color: orange',
);
console.log(`%c\tNumbers List: \n\t\t${valuesInOrder}\n`, 'color: green');
console.log(
  `%c\tTree values in order: \n\t\t${tree.inOrder()}\n`,
  'color: green',
);
console.log(
  `%c\tTree values pre order: \n\t\t${tree.preOrder()}\n`,
  'color: green',
);
console.log(
  `%c\tTree values post order: \n\t\t${tree.postOrder()}\n`,
  'color: green',
);
console.log('%cPrinting the Tree...', 'color: orange');
tree.print();
console.log(
  '%c\tUnbalance the tree by adding several numbers > 100.',
  'color: orange',
);
for (let i = 0; i < 6; i++) {
  let randNum;
  do {
    randNum = Math.floor(Math.random() * 100) + 100;
  } while (randNumbersLessThan100.includes(randNum));
  randNumbersLessThan100.push(randNum);
  tree.insert(randNum);
}
const oldRoot = valuesInOrder[Math.floor(valuesInOrder.length / 2)];
valuesInOrder = mergeSort(randNumbersLessThan100);
console.log(`%c\tNumbers List: \n\t\t${valuesInOrder}\n`, 'color: green');
console.log(
  `%c\tTree root is (${tree.root.value}) and should be (${oldRoot})\n`,
  'color: green',
);
console.log(
  '%c\tConfirm that the tree is unbalanced by calling isBalanced.',
  'color: orange',
);
console.log(`%c\tIs tree balanced? (${tree.isBalanced()})\n`, 'color: green');
console.log('%cPrinting the Tree...', 'color: orange');
tree.print();
console.log('%c\tBalancing the tree by calling rebalance...', 'color: orange');
tree.rebalance();
console.log(
  '%c\tConfirm that the tree is balanced by calling isBalanced.',
  'color: orange',
);
console.log(`%c\tIs tree balanced? (${tree.isBalanced()})\n`, 'color: green');
console.log(
  `%c\tTree root is (${tree.root.value}) and should be (${
    valuesInOrder[Math.floor(valuesInOrder.length / 2)]
  })\n`,
  'color: green',
);
console.log(
  '%c\tPrint out all elements in level, pre, post, and in order.',
  'color: orange',
);
console.log(`%c\tNumbers List: \n\t\t${valuesInOrder}\n`, 'color: green');
console.log(
  `%c\tTree values in order: \n\t\t${tree.inOrder()}\n`,
  'color: green',
);
console.log(
  `%c\tTree values pre order: \n\t\t${tree.preOrder()}\n`,
  'color: green',
);
console.log(
  `%c\tTree values post order: \n\t\t${tree.postOrder()}\n`,
  'color: green',
);
console.log('%cPrinting the Tree...', 'color: orange');
tree.print();
