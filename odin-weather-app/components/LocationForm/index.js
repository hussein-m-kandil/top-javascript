import './index.css';

import { createElement } from '../../helpers/createElement';

/**
 * A Form to get the location for the user
 * @param {function} submitCallback - A function that accepts 'location': 'string'
 * @returns {HTMLFormElement}
 */
export default function LocationForm(submitCallback) {
  const form = createElement('form', 'weather-location');
  const input = createElement(
    'input',
    'location',
    '',
    ['type', 'text'],
    ['name', 'location'],
    ['placeholder', 'Location (e.g. "Cairo")'],
    ['autocomplete', 'on'],
    ['autofocus', ''],
    // ['required', ''],
  );
  const button = createElement(
    'button',
    'location',
    '',
    ['type', 'submit'],
    ['aria-label', 'Get weather'],
  );
  const span = createElement('span', 'ui-only', '🔍', ['aria-hidden', 'true']);

  button.appendChild(span);
  form.append(input, button);

  form.addEventListener('submit', (event) => {
    event.preventDefault();
    event.target.classList.add('invalid');
    const location = event.target['location'].value;
    if (location) {
      event.target.classList.remove('invalid');
      submitCallback(location);
    }
  });

  return form;
}

export { LocationForm };
