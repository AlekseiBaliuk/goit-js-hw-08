import throttle from 'lodash.throttle';

const STORAGE_KEY = 'feedback-form-state';
const formData = {};

const refs = {
  form: document.querySelector('.feedback-form'),
};

populateForm();

refs.form.addEventListener('input', throttle(onFormInput, 500));
refs.form.addEventListener('submit', onFormSubmit);

function onFormSubmit(evt) {
  evt.preventDefault();
  evt.currentTarget.reset();

  //   console.log(formData.email);

  if (!formData.email || !formData.message) {
    alert('Fill all fields');
    populateForm();
    return;
  }

  if (
    Object.keys(formData).length !== 0 &&
    JSON.parse(localStorage.getItem(STORAGE_KEY)) !== null
  ) {
    console.log(formData);
  }

  localStorage.removeItem(STORAGE_KEY);
}

function onFormInput(evt) {
  formData[evt.target.name] = evt.target.value;

  localStorage.setItem(STORAGE_KEY, JSON.stringify(formData));
}

function populateForm() {
  const savedData = JSON.parse(localStorage.getItem(STORAGE_KEY));

  if (savedData) {
    Object.entries(savedData).forEach(([name, value]) => {
      refs.form[name].value = value;
      formData[name] = value;
    });
  }
}
