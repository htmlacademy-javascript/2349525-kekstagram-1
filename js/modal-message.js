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

export const hideMessage = (state) => {
  const message = body.querySelector(`.${state}`);
  message.remove();
  document.removeEventListener('keydown', onDocumentKeydown);
  document.removeEventListener('click', onDocumentClick);
};

export const showMessage = (state) => {
  createMessage(state === 'success' ? templateMessageSuccess : templateMessageError);
  const buttonClose = body.querySelector(`.${state}__button`);
  buttonClose.addEventListener('click', () => {
    hideMessage(state);
  });
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
    hideMessage('success');
  }
  if (body.querySelector('.error') !== null) {
    hideMessage('error');
  }
}
