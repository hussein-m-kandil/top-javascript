/**
 * Construct a calculator object that contains functions for the basic operations:
 * add, subtract, divide, and multiply.
 * Each of these functions should take two numbers and return the correct calculation.
 * @returns {Calculator}
 */
function Calculator() {
  const isValidArgs = (args) => {
    if (
      !Array.isArray(args) ||
      args.length !== 2 ||
      typeof args[0] !== 'number' ||
      typeof args[1] !== 'number' ||
      args[0] === Infinity ||
      args[1] === Infinity ||
      Number.isNaN(args[0]) ||
      Number.isNaN(args[1])
    ) {
      throw Error(
        'Invalid arguments: Expect exactly 2 arguments of type "number" (and not NaN nor Infinity)!',
      );
    }
    return true;
  };

  const obj = {
    add: (...numbers) => {
      isValidArgs(numbers);
      return numbers[0] + numbers[1];
    },
    subtract: (...numbers) => {
      isValidArgs(numbers);
      return numbers[0] === numbers[1] ? 0 : numbers[0] - numbers[1];
    },
    multiply: (...numbers) => {
      isValidArgs(numbers);
      const result = numbers[0] * numbers[1];
      // Jest's 'toBe' matcher uses Object.is() which, Unlike '===', evaluates Object.is(+0, -0) to false
      return result === 0 ? 0 : result;
    },
    divide: (...numbers) => {
      isValidArgs(numbers);
      if (numbers[1] === 0) {
        throw Error("Dividing by '0' ('Zero') is undefined");
      }
      return numbers[0] / numbers[1];
    },
  };

  Object.setPrototypeOf(obj, Calculator.prototype);
  Object.freeze(obj);

  return obj;
}

Object.freeze(Calculator.prototype);

const calculator = Calculator();

export default calculator;
export { Calculator, calculator };
