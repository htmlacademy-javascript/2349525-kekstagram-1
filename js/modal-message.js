import {getTemplate} from './helpers/get-template.js';
import {isEscapeKey} from './helpers/test-keys.js';

const body = document.querySelector('body');
const templateMessageSuccess = getTemplate('#success', '.success');
const templateMessageError = getTemplate('#error', '.error');

const createMessage = (template) => {
  const fragment = document.createDocumentFragment();
  fragment.append(template);
  body.append(fragment);
};

export const hideSuccessMessage = () => {
  const messageSuccess = body.querySelector('.success');
  document.removeEventListener('keydown', onDocumentKeydown);
  document.removeEventListener('click', onDocumentClick);
  messageSuccess.remove();
};

export const hideErrorMessage = () => {
  const messageError = body.querySelector('.error');
  document.removeEventListener('keydown', onDocumentKeydown);
  document.removeEventListener('click', onDocumentClick);
  messageError.remove();
};

export const showMessage = (state) => {
  if (state === 'success') {
    createMessage(templateMessageSuccess);
  } else {
    createMessage(templateMessageError);
  }
  const buttonClose = body.querySelector(`.${state}__button`);
  buttonClose.addEventListener('click', state === 'success' ? hideSuccessMessage : hideErrorMessage);
  document.addEventListener('keydown', onDocumentKeydown);
  document.addEventListener('click', onDocumentClick);
};

function onDocumentKeydown (evt) {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    closeMessage();
  }
}

function onDocumentClick (evt) {
  if (evt.target === body.querySelector('.success') || evt.target === body.querySelector('.error')) {
    evt.preventDefault();
    closeMessage();
  }
}

function closeMessage () {
  if (body.querySelector('.success') !== null) {
    hideSuccessMessage();
  } else if (body.querySelector('.error') !== null) {
    hideErrorMessage();
  }
}
