/**
 * Takes a string and returns it with the first character capitalized.
 * @param {string} str
 * @returns {string}
 */
export default function capitalize(str) {
  if (typeof str !== 'string') {
    throw Error('Expect 1 argument of type "string"');
  }
  const chars = str.split('');
  for (let i = 0; i < chars.length; i++) {
    if (/[a-zA-Z]/.test(chars[i])) {
      chars[i] = chars[i].toUpperCase();
      break;
    }
  }
  return chars.join('');
}

export { capitalize };
