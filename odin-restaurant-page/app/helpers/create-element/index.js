/**
 * Creates HTMLElement of the given 'tagName' with any of the given
 * className, id or attributes
 * @param {string} tagName
 * @param {string?} className
 * @param {string?} id
 * @param {[string, string]?} attrs - Any number of attributes as a key-value pair
 * @returns {HTMLElement}
 */
export default function createElement(tagName, className, id, ...attrs) {
  if (typeof tagName !== "string") {
    throw TypeError("Missing 'tagName' of type 'string'!");
  }
  const element = document.createElement(tagName);
  if (className) element.className = className;
  if (id) element.id = id;
  if (
    attrs.length === 1 &&
    Array.isArray(attrs[0]) &&
    Array.isArray(attrs[0][0])
  ) {
    attrs = attrs.flat(1);
  }
  if (attrs.length > 0) {
    for (let i = 0; i < attrs.length; i++) {
      if (
        Array.isArray(attrs[i]) &&
        attrs[i].length === 2 &&
        typeof attrs[i][0] === "string" &&
        typeof attrs[i][1] === "string"
      ) {
        element.setAttribute(attrs[i][0], attrs[i][1]);
      } else {
        throw TypeError(
          "A given attribute in '...attrs' must be in the form of [string, string]"
        );
      }
    }
  }
  return element;
}
