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
    ['autocomplete', 'off'],
    ['autofocus', ''],
  );
  const button = createElement(
    'button',
    'location',
    '',
    ['type', 'submit'],
    ['aria-label', 'Get weather'],
  );
  const span = createElement('span', 'ui-only', '🔍', ['aria-hidden', 'true']);
  const errorDiv = createElement('div', 'error');

  button.appendChild(span);
  form.append(errorDiv, input, button);

  form.addEventListener('submit', (event) => {
    event.preventDefault();
    form.classList.add('invalid');
    const location = form['location'].value;
    if (location) {
      if (/^[\w-\s'"]+$/.test(location)) {
        errorDiv.textContent = '';
        form.classList.remove('invalid');
        submitCallback(location);
      } else {
        errorDiv.textContent = '* Invalid location name!';
      }
    } else {
      errorDiv.textContent = '* Location is required!';
    }
  });

  return form;
}

export { LocationForm };
