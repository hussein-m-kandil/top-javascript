import './index.css';

import createElement from '../../helpers/createElement';

/**
 * A button that toggles between values
 *
 * @param {string[]} values - An array of values to toggle between them
 * @param {function} toggleCallback - A function  to be called on toggle
 *
 * NOTE: 'toggleCallback' must accepts an object i.e. { index: number, value: string }
 * - index: the index of the current value in the values array.
 * - value: the current value of the button
 *
 * @returns {HTMLButtonElement} - The toggler
 */
export default function Toggler(values, toggleCallback) {
  if (!toggleCallback)
    throw Error("Missing argument: 'toggleCallback' type 'function'");
  if (!values) throw Error("Missing argument: 'values' type 'string[]'");
  if (!Array.isArray(values) || values.length < 1) {
    throw TypeError(
      "Invalid argument: 'values' must be non-empty array of strings",
    );
  }

  let currentIndex = 0;

  const toggler = createElement(
    'button',
    'unit-toggler',
    values[currentIndex],
    ['type', 'button'],
  );

  toggler.addEventListener('click', () => {
    currentIndex = (currentIndex + 1) % values.length;
    toggler.textContent = values[currentIndex];
    toggleCallback({
      index: currentIndex,
      value: values[currentIndex],
    });
  });

  return toggler;
}

export { Toggler };
