import './index.css';

// Fibonacci logic
function validateFibInput(inp) {
  const i = Number(inp.trim());
  return [i, Number.isInteger(i) && i >= 0 && i <= 1000];
}
function fibonacci(num) {
  const memo = {};
  return (function fib(n) {
    if (Number.isInteger(memo[n])) return memo[n];
    memo[n] = n < 2 ? n : fib(n - 1) + fib(n - 2);
    return memo[n];
  })(num);
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
  console.log(fibNum);
  const [num, isValid] = validateFibInput(fibNum);
  if (isValid) {
    fibResult.textContent = fibonacci(num);
  }
});

// TODO: Merge Sort logic

// TODO: Merge Sort UI
