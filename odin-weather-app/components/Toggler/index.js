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

  const toggler = createElement('div', 'toggler', null, [
    'aria-label',
    'Unit Toggler',
  ]);
  for (let i = 0; i < values.length; i++) {
    const choice = createElement(
      'button',
      `toggler-choice${i === 0 ? ' toggler-choice-selected' : ''}`,
      values[i],
      ['type', 'button'],
    );
    choice.addEventListener('click', () => {
      toggleCallback({
        index: i,
        value: values[i],
      });
      [...toggler.children].forEach((child) =>
        child.classList.remove('toggler-choice-selected'),
      );
      choice.classList.add('toggler-choice-selected');
    });
    toggler.append(choice);
  }

  return toggler;
}

export { Toggler };
