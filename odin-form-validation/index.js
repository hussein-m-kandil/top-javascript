import './index.css';

const REQUIRED_ERR = 'This field is required!';
const EMAIL_ERR = 'Has "@" and ".": e.g. anything@anywhere.any!';
const NAME_ERR = 'At least 3 characters!';
const PASS_ERR = 'At least 8 characters contains [0-9], [a-z] and [A-Z]!';
const PASS_CONFIRM_ERR = 'Password confirmation does not match!';

const submitButton = document.querySelector('form button[type="submit"]');
submitButton.disabled = true;

const name = document.querySelector('#name');
const email = document.querySelector('#email');
const country = document.querySelector('#country');
country.classList.add('valid');
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

const isValidPassword = (pass) => {
  return (
    pass.length >= 8 &&
    /[a-z]+/.test(pass) &&
    /[A-Z]+/.test(pass) &&
    /\d+/.test(pass)
  );
};

const createErrorSpan = (message) => {
  const errorSpan = document.createElement('span');
  errorSpan.className = 'error';
  errorSpan.textContent = message;
  return errorSpan;
};

/** This function uses all of the previous global variables/functions */
const validateInput = (targetInput) => {
  const targetLabel = targetInput.previousElementSibling;
  const errorSpan = targetLabel?.querySelector('span.error');
  if (targetInput.value.length < 1) {
    if (!errorSpan) {
      targetLabel?.appendChild(createErrorSpan(REQUIRED_ERR));
      if (!targetInput.classList.replace('valid', 'invalid')) {
        targetInput.classList.add('invalid');
      }
    } else {
      errorSpan.textContent = REQUIRED_ERR;
    }
  } else if (
    targetInput.id === 'email' &&
    !/^[\w-.]+@[\w-.]+\.[a-zA-Z]+$/.test(targetInput.value)
  ) {
    if (!errorSpan) {
      targetLabel?.appendChild(createErrorSpan(EMAIL_ERR));
      if (!targetInput.classList.replace('valid', 'invalid')) {
        targetInput.classList.add('invalid');
      }
    } else {
      errorSpan.textContent = EMAIL_ERR;
    }
  } else if (targetInput.id === 'name' && targetInput.value.length < 3) {
    if (!errorSpan) {
      targetLabel?.appendChild(createErrorSpan(NAME_ERR));
      if (!targetInput.classList.replace('valid', 'invalid')) {
        targetInput.classList.add('invalid');
      }
    } else {
      errorSpan.textContent = NAME_ERR;
    }
  } else if (
    targetInput.id === 'zip' &&
    !zipConstraints[country.value][0].test(targetInput.value)
  ) {
    if (!errorSpan) {
      targetLabel?.appendChild(
        createErrorSpan(zipConstraints[country.value][1]),
      );
      if (!targetInput.classList.replace('valid', 'invalid')) {
        targetInput.classList.add('invalid');
      }
    } else {
      errorSpan.textContent = zipConstraints[country.value][1];
    }
  } else if (
    (targetInput.id === 'pass' || targetInput.id === 'pass-confirm') &&
    !isValidPassword(targetInput.value)
  ) {
    if (!errorSpan) {
      targetLabel?.appendChild(createErrorSpan(PASS_ERR));
      if (!targetInput.classList.replace('valid', 'invalid')) {
        targetInput.classList.add('invalid');
      }
    } else {
      errorSpan.textContent = PASS_ERR;
    }
  } else if (
    (targetInput.id === 'pass' || targetInput.id === 'pass-confirm') &&
    passwordConfirmation.value !== ''
  ) {
    if (password.value !== passwordConfirmation.value) {
      if (!errorSpan) {
        targetLabel?.appendChild(createErrorSpan(PASS_CONFIRM_ERR));
        if (!targetInput.classList.replace('valid', 'invalid')) {
          targetInput.classList.add('invalid');
        }
      } else {
        errorSpan.textContent = PASS_CONFIRM_ERR;
      }
    } else {
      password.previousElementSibling?.querySelector('span.error')?.remove();
      if (!password.classList.replace('invalid', 'valid')) {
        password.classList.add('valid');
      }
      passwordConfirmation.previousElementSibling
        ?.querySelector('span.error')
        ?.remove();
      if (!passwordConfirmation.classList.replace('invalid', 'valid')) {
        passwordConfirmation.classList.add('valid');
      }
    }
  } else if (errorSpan) {
    errorSpan.remove();
    targetInput.classList.replace('invalid', 'valid');
  }
};

const handleInputValidation = (event) => {
  validateInput(event.target);
};

const checkAllInputsValidity = () => {
  const allInputs = [name, email, country, zip, password, passwordConfirmation];
  for (let i = 0; i < allInputs.length; i++) {
    if (
      allInputs[i].classList.contains('invalid') ||
      !allInputs[i].classList.contains('valid')
    ) {
      return false;
    }
    validateInput(allInputs[i]);
    if (allInputs[i].classList.contains('invalid')) {
      return false;
    }
  }
  return true;
};

name.addEventListener('input', handleInputValidation);
email.addEventListener('input', handleInputValidation);
zip.addEventListener('input', handleInputValidation);
password.addEventListener('input', handleInputValidation);
passwordConfirmation.addEventListener('input', handleInputValidation);

const form = document.querySelector('form');

form.addEventListener('input', () => {
  submitButton.disabled = !checkAllInputsValidity();
});

form.addEventListener('submit', (event) => {
  event.preventDefault();
  if (checkAllInputsValidity()) {
    const highFive = document.createElement('div');
    highFive.className = 'high-five';
    highFive.textContent = '✋ Thank you 😉';
    [...document.body.children].forEach((node) =>
      document.body.removeChild(node),
    );
    document.body.appendChild(highFive);
  }
});
