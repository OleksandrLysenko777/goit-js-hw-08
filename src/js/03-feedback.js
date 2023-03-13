import throttle from 'lodash.throttle';

const form = document.querySelector('.feedback-form');
form.addEventListener('input', throttle(onFormData, 500));
form.addEventListener('submit', onSubmitForm);

let formData = {};
loadForm();

function onFormData(e) {
  formData = JSON.parse(localStorage.getItem('feedback-form-state')) || {};
  formData[e.target.name] = e.target.value;
  localStorage.setItem('feedback-form-state', JSON.stringify(formData));
}

function onSubmitForm(e) {
  e.preventDefault();
  e.target.reset();
  console.log(formData);
  localStorage.removeItem('feedback-form-state');
}

function loadForm() {
  try {
    let formLoad = JSON.parse(localStorage.getItem('feedback-form-state'));
    if (!formLoad) {
      return;
    }

    formData = formLoad;
    form.email.value = formData.email || '';
    form.message.value = formData.message || '';
  } catch (error) {
    console.error('Error.message ', error.message);
  }
}
