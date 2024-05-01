/**
 * Takes a string and returns it reversed.
 * @param {string} str
 * @returns {string}
 */
export default function reverseString(str) {
  if (typeof str !== 'string') {
    throw Error('Expect 1 argument of type "string"!');
  }
  let reversedStr = '';
  for (let i = str.length - 1; i >= 0; i--) {
    reversedStr += str.charAt(i);
  }
  return reversedStr;
}

export { reverseString };
