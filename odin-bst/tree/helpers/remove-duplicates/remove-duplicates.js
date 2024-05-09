import { isDeeplyEqual } from './helpers/is-deeply-equal';

export default function removeDuplicates(arr) {
  if (!Array.isArray(arr) || arr.length < 2) {
    throw TypeError('The length of the given array must be more than 1!');
  }

  const uniqueValues = [];

  arr.forEach((x) => {
    const uniquesLength = uniqueValues.length;
    for (let i = 0; i < uniquesLength; i++) {
      if (isDeeplyEqual(uniqueValues[i], x)) {
        return;
      }
    }
    uniqueValues.push(x);
  });

  return uniqueValues;
}

export { removeDuplicates };
