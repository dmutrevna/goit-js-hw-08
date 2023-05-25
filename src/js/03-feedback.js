import throttle from 'lodash.throttle';

const LOKAL_KEY = 'feedback-form-state';

const { form, email, textarea } = {
  form: document.querySelector('.feedback-form'),
  email: document.querySelector('[name="email"]'),
  textarea: document.querySelector('[name="message"]'),
};

form.addEventListener('input', throttle(onFormInput, 500));
form.addEventListener('submit', onButtonSubmit);

function onFormInput() {
  const formData = {
    email: email.value,
    message: textarea.value,
  };

  saveFormData(formData);
}

function saveFormData(formData) {
  const throttledSaveMsg = throttle(() => {
    localStorage.setItem(LOKAL_KEY, JSON.stringify(formData));
  }, 500);

  throttledSaveMsg();
}

function loadFormData() {
  const savedData = localStorage.getItem(LOKAL_KEY);

  if (savedData) {
    const { email: savedEmail, message: savedMessage } = JSON.parse(savedData);
    email.value = savedEmail;
    textarea.value = savedMessage;
  }
}

loadFormData();

function onButtonSubmit(e) {
  e.preventDefault();
  const formData = {
    email: email.value,
    message: textarea.value,
  };

  localStorage.removeItem(LOKAL_KEY);
  form.reset();

  console.log(formData);
}
