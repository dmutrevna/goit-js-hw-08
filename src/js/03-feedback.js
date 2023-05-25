import throttle from 'lodash.throttle';

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
    localStorage.setItem('feedback-form-state', JSON.stringify(formData));
  }, 500);

  throttledSaveMsg();
}

function loadFormData() {
  const savedData = localStorage.getItem('feedback-form-state');

  if (savedData) {
    const { email: savedEmail, message: savedMessage } = JSON.parse(savedData);
    email.value = savedEmail;
    textarea.value = savedMessage;
  }
}

loadFormData();

function onButtonSubmit(e) {
  e.preventDefault();

  localStorage.removeItem('feedback-form-state');
  form.reset();

  const formData = {
    email: email.value,
    message: textarea.value,
  };

  console.log(formData);
}
