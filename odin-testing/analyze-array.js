/**
 * Takes an array of numbers and returns an object with the following properties: average, min, max, and length.
 * @param {number[]} numArr
 * @returns {{min: number, max: number, average: number, length: number}}
 */
export default function analyzeArray(numArr) {
  const TYPE_ERR_MSG = 'Expect 1 argument of type "number[]"!';

  if (!Array.isArray(numArr)) {
    throw TypeError(TYPE_ERR_MSG);
  }

  if (numArr.length < 1) {
    throw Error('The given array is empty!');
  }

  let sum = 0;

  return numArr.reduce(
    (currentAnalysis, currentNumber, currentIndex) => {
      if (typeof currentNumber !== 'number') {
        throw TypeError(TYPE_ERR_MSG);
      }
      currentAnalysis.min = Math.min(currentAnalysis.min, currentNumber);
      currentAnalysis.max = Math.max(currentAnalysis.max, currentNumber);
      currentAnalysis.length = currentIndex + 1;
      sum += currentNumber;
      currentAnalysis.average = sum / currentAnalysis.length;
      return currentAnalysis;
    },
    {
      length: 1,
      min: numArr[0],
      max: numArr[0],
      average: numArr[0],
    },
  );
}

export { analyzeArray };
