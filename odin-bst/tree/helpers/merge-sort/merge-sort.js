export default function mergeSort(numArr) {
  if (numArr.length < 2) {
    if (numArr.length === 0 || numArr.every((n) => typeof n === 'number')) {
      return numArr;
    }
    throw TypeError('The given array is EXPECTED to contain NUMBERS ONLY!');
  }
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

export { mergeSort };
