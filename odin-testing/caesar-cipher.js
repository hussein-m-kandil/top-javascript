/**
 * Takes a string and a shift factor and returns it with each character “shifted”.
 *
 * @param {string} str - String to cipher.
 * @param {number} shiftFactor - Number of shifts per character.
 * @returns {string} - Ciphered version of the string input.
 */
export default function caesarCipher(str, shiftFactor) {
  if (
    typeof str !== 'string' ||
    typeof shiftFactor !== 'number' ||
    shiftFactor < 0 ||
    shiftFactor === Infinity ||
    Number.isNaN(shiftFactor)
  ) {
    throw TypeError(
      "Expect 2 arguments of type ('string', 'number') & 2nd argument >= 0!",
    );
  }

  if (shiftFactor === 0) return str;

  const LETTERS_COUNT = 26;
  const CAPITAL_A_CODE = 65;
  const CAPITAL_Z_CODE = 90;
  const SMALL_A_CODE = 97;
  const SMALL_Z_CODE = 122;
  const GAP = SMALL_A_CODE - CAPITAL_Z_CODE - 1; // 6 chars between Z & a
  const oldStr = str;
  const shiftNum = shiftFactor % LETTERS_COUNT; // Just in case > 26
  let newStr = '';

  for (let i = 0; i < oldStr.length; i++) {
    const oldCharCode = oldStr.charCodeAt(i);
    if (
      (oldCharCode >= CAPITAL_A_CODE && oldCharCode <= CAPITAL_Z_CODE) ||
      (oldCharCode >= SMALL_A_CODE && oldCharCode <= SMALL_Z_CODE)
    ) {
      const capitalChar = oldCharCode <= CAPITAL_Z_CODE;
      const extraCharsCount = capitalChar
        ? CAPITAL_A_CODE // ASCII chars before caps
        : CAPITAL_A_CODE + LETTERS_COUNT + GAP; // ASCII chars before smalls (caps included)
      const oldCharIndex = oldCharCode - extraCharsCount; // From 0 to 25
      const shiftedCharIndex = (oldCharIndex + shiftNum) % LETTERS_COUNT; // Loop from 0 to 25 for shiftNum
      const shiftedCharCode = shiftedCharIndex + extraCharsCount; // Back to valid ASCII char 65-90 or 97-122
      newStr += String.fromCharCode(shiftedCharCode);
    } else {
      newStr += oldStr[i];
    }
  }

  return newStr;
}

export { caesarCipher };
