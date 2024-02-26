/**
 * Convert window location hash into title by removing the hash tag '#',
 * replacing hyphens/underscores with spaces and capitalizing each word.
 * @param {string} hash - Should contain '#' as the 1st character.
 * @returns {string} - Same string converted into title.
 */
export default function titleizeHash(hash) {
  if (typeof hash !== "string") {
    throw TypeError("The hash must be 'string'.");
  }
  const newHash = hash
    .replace(/^#/, "")
    .replace(/[-_]/, " ")
    .split(" ")
    .map((word) => {
      if (word.length > 1) {
        return word.slice(0, 1).toLocaleUpperCase() + word.slice(1);
      } else if (word.length === 1) {
        return word.toLocaleUpperCase;
      }
      return word;
    })
    .join(" ");
  return newHash;
}

export { titleizeHash };
