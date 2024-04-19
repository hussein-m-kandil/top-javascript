import './index.css';

// Fibonacci logic
function validateFibInput(inp) {
  const i = Number(inp);
  return /^\d+$/.test(inp) && Number.isInteger(i) && i > 0;
}
function fibonacci(num) {
  const memo = {};
  return (function fib(n) {
    if (memo[n] !== undefined) return memo[n];
    memo[n] = n < 2 ? n : fib(n - 1) + fib(n - 2);
    return memo[n];
  })(num);
}

// TODO: Fibonacci UI

// TODO: Merge Sort logic

// TODO: Merge Sort UI
