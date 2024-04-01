import './index.css';

const submitButton = document.querySelector('form button[type="submit"]');
submitButton.disabled = true;

const name = document.querySelector('#name');
const email = document.querySelector('#email');
const country = document.querySelector('#country');
const zip = document.querySelector('#zip');
// const password = document.querySelector('#password');
// const passwordConfirmation = document.querySelector('#pass-confirm');

const zipConstraints = {
  eg: [
    /^(EG-)?\d{5}$/,
    'Egypt ZIPs must have exactly 5 digits: e.g. EG-12946 or 12946',
  ],
  p: [
    /^(P-)?\d{3}$/,
    'Palestine ZIPs must have exactly 3 digits: e.g. P-195 or 195',
  ],
  lb: [
    /^(LB-)?\d{4}((-|\s)?\d{4})?$/,
    'Lebanon ZIPs must have 4 or 8 digits: e.g. LB-75013245 or LB-7501 or 75013245 or 7501 or 7501 3245 or 7501-3245',
  ],
  iq: [
    /^(IQ-)?\d{5}$/,
    'Iraq ZIPs must have exactly 5 digits: e.g. IQ-19523 or 19523',
  ],
};

const validate = (event) => {
  if (!event.target.checkValidity()) {
    event.target.classList.add('invalid');
    if (event.target.validity.tooShort) {
      if (event.target.id === 'name') {
        event.target.setCustomValidity('Must be greater than 2 characters!');
      } else if (event.target.id === 'email') {
        event.target.setCustomValidity('Must be greater than 7 characters!');
      }
    } else {
      event.target.setCustomValidity('');
    }
    event.target.reportValidity();
  }
  if (event.target.checkValidity()) {
    event.target.classList.remove('invalid');
  }
};

const validateZip = () => {
  let valid = true;
  if (!zipConstraints[country.value][0].test(zip.value)) {
    zip.classList.add('invalid');
    zip.setCustomValidity(zipConstraints[country.value][1]);
    valid = false;
  } else {
    zip.setCustomValidity('');
  }
  if (zip.checkValidity() && valid) {
    zip.classList.remove('invalid');
  } else {
    zip.reportValidity();
  }
};

name.addEventListener('input', validate);
email.addEventListener('input', validate);
zip.addEventListener('input', validateZip);

const form = document.querySelector('form');
form.addEventListener('input', () => {
  console.log('Form is inputted!');

  // TODO: Needs another custom validator
  if (form.checkValidity()) {
    submitButton.disabled = false;
  }
});
form.addEventListener('submit', (event) => {
  event.preventDefault();
  console.log('Form is submitted!');
  if (!form.checkValidity()) {
    form.reportValidity();
  }
});
