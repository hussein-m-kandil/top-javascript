import './index.css';

const submitButton = document.querySelector('form button[type="submit"]');
submitButton.disabled = true;

const name = document.querySelector('#name');
const email = document.querySelector('#email');
const country = document.querySelector('#country');
const zip = document.querySelector('#zip');
const password = document.querySelector('#pass');
const passwordConfirmation = document.querySelector('#pass-confirm');

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
  if (event.target.id === 'email' && !event.target.checkValidity()) {
    event.target.setCustomValidity('');
    event.target.reportValidity();
  } else if (event.target.id === 'email' && event.target.value.length < 1) {
    event.target.setCustomValidity('This field is required!');
  } else if (event.target.id === 'name' && event.target.value.length < 1) {
    event.target.setCustomValidity('This field is required!');
    event.target.reportValidity();
  } else if (event.target.id === 'name' && event.target.value.length < 3) {
    event.target.setCustomValidity('Must be at least 3 characters!');
    event.target.reportValidity();
  } else {
    event.target.setCustomValidity('');
  }
};

const validateZip = () => {
  if (zip.value.length < 1) {
    zip.setCustomValidity('This field is required!');
    zip.reportValidity();
  } else if (!zipConstraints[country.value][0].test(zip.value)) {
    zip.setCustomValidity(zipConstraints[country.value][1]);
    zip.reportValidity();
  } else {
    zip.setCustomValidity('');
  }
};

const isValidPassword = (pass) => {
  return (
    pass.length >= 8 &&
    /[a-z]+/.test(pass) &&
    /[A-Z]+/.test(pass) &&
    /\d+/.test(pass)
  );
};

const validatePassword = (event) => {
  if (event.target.value.length < 1) {
    event.target.setCustomValidity('This field is required!');
    event.target.reportValidity();
  } else if (!isValidPassword(event.target.value)) {
    event.target.setCustomValidity(
      'Password must be at least 8 characters contains at least 1 number, 1 uppercase letter and 1 lowercase letter)!',
    );
    event.target.reportValidity();
  } else if (
    event.target.id === 'pass-confirm' &&
    event.target.value !== password.value
  ) {
    event.target.setCustomValidity('Password confirmation does not match!');
    event.target.reportValidity();
  } else {
    event.target.setCustomValidity('');
  }
};

name.addEventListener('change', validate);
email.addEventListener('change', validate);
zip.addEventListener('change', validateZip);
password.addEventListener('change', validatePassword);
passwordConfirmation.addEventListener('change', validatePassword);

document.querySelectorAll('input').forEach((input) => {
  input.addEventListener('focus', () => {
    if (!input.checkValidity()) {
      input.reportValidity();
    }
  });
});

const form = document.querySelector('form');

form.addEventListener('input', () => {
  if (form.checkValidity()) {
    submitButton.disabled = false;
  }
});

form.addEventListener('submit', (event) => {
  event.preventDefault();
  if (!form.checkValidity()) {
    form.reportValidity();
  } else {
    const highFive = document.createElement('div');
    highFive.className = 'high-five';
    highFive.textContent = '✋ Thank you 😉';
    [...document.body.children].forEach((node) =>
      document.body.removeChild(node),
    );
    document.body.appendChild(highFive);
  }
});
