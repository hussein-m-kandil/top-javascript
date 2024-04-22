import './index.css';

// Fibonacci logic
function validateFibInput(inp) {
  const i = Number(inp.trim());
  return [i, Number.isInteger(i) && i >= 0 && i <= 1000];
}

function fibonacci(num) {
  const result = [];
  const memo = {};
  const fib = (n) => {
    if (!Number.isInteger(memo[n])) {
      memo[n] = n < 2 ? n : fib(n - 1) + fib(n - 2);
    }
    return memo[n];
  };
  for (let i = 0; i < num; i++) {
    result[i] = fib(i);
  }
  return result;
}

// Fibonacci UI
const fibResult = document.querySelector('#fibonacci .result');
const fibForm = document.querySelector('#fibonacci form');
fibForm['fib-btn'].disabled = true;
fibForm.addEventListener('input', () => {
  fibResult.textContent = '';
  fibForm['fib-btn'].disabled = !fibForm.checkValidity();
});
fibForm.addEventListener('submit', (event) => {
  event.preventDefault();
  const fibNum = event.target['fib-number'].value;
  const [num, isValid] = validateFibInput(fibNum);
  if (isValid) {
    fibResult.textContent = fibonacci(num).join(',');
  }
});

// Merge Sort logic
function validateNumList(numbers) {
  const numArr = numbers
    .trim()
    .split(' ')
    .filter((num) => num !== '')
    .map((num) => Number(num));
  return [numArr, numArr.every((num) => Number.isInteger(num))];
}

function mergeSort(numArr) {
  if (numArr.length < 2) return numArr;
  const arrCenter = Math.floor(numArr.length / 2);
  const firstSortedHalf = mergeSort(numArr.slice(0, arrCenter));
  const secondSortedHalf = mergeSort(numArr.slice(arrCenter));
  const newArr = [];
  while (firstSortedHalf.length > 0 && secondSortedHalf.length > 0) {
    newArr.push(
      firstSortedHalf[0] < secondSortedHalf[0]
        ? firstSortedHalf.shift()
        : secondSortedHalf.shift(),
    );
  }
  if (firstSortedHalf.length > 0) {
    newArr.push(...firstSortedHalf);
  } else {
    newArr.push(...secondSortedHalf);
  }
  return newArr;
}

// Merge Sort UI
const sortResult = document.querySelector('#merge-sort .result');
const sortForm = document.querySelector('#merge-sort form');
sortForm['sort-btn'].disabled = true;
sortForm.addEventListener('input', () => {
  sortResult.textContent = '';
  sortForm['sort-btn'].disabled = !sortForm.checkValidity();
});
sortForm.addEventListener('submit', (event) => {
  event.preventDefault();
  const numList = event.target['number-list'].value;
  const [numArr, isValid] = validateNumList(numList);
  if (isValid) {
    sortResult.textContent = mergeSort(numArr).join(' ');
  }
});
