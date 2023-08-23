import {isEscapeKey} from './helpers/test-keys.js';
import {validateTags} from './validate-tags.js';

const body = document.querySelector('body');
const formUpload = document.querySelector('.img-upload__form');
const blockUploadOverlay = formUpload.querySelector('.img-upload__overlay');
const fieldUploadFile = formUpload.querySelector('#upload-file');
const fieldHashtag = formUpload.querySelector('.text__hashtags');
const fieldComment = formUpload.querySelector('.text__description');
const buttonClose = formUpload.querySelector('#upload-cancel');
const fieldsText = [fieldHashtag, fieldComment];

const HASHTAG_ERROR_TEXT = 'Некорректно указаны хэш-теги';

const pristine = new Pristine(formUpload, {
  classTo: 'img-upload__field-wrapper',
  errorTextParent: 'img-upload__field-wrapper',
  errorTextClass: 'img-upload__field-wrapper--invalid',
});

const onInputFileChange = () => {
  showModal();
};

function onDocumentKeydown(evt) {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    hideModal();
  }
}

const addEventListenerKeydown = (elements) => {
  elements.forEach((elemetn) => {
    elemetn.addEventListener('keydown', (evt) => {
      if (isEscapeKey(evt)) {
        evt.preventDefault();
        evt.stopPropagation();
      }
    });
  });
};

const removeEventListenerKeydown = (elements) => {
  elements.forEach((elemetn) => {
    elemetn.removeEventListener('keydown', (evt) => {
      if (isEscapeKey(evt)) {
        evt.preventDefault();
        evt.stopPropagation();
      }
    });
  });
};

function showModal() {
  body.classList.add('modal-open');
  blockUploadOverlay.classList.remove('hidden');

  document.addEventListener('keydown', onDocumentKeydown);

  buttonClose.addEventListener('click', () => {
    hideModal();
  });

  addEventListenerKeydown(fieldsText);
}

function hideModal() {
  body.classList.remove('modal-open');
  blockUploadOverlay.classList.add('hidden');

  document.removeEventListener('keydown', onDocumentKeydown);

  buttonClose.removeEventListener('click', () => {
    hideModal();
  });

  removeEventListenerKeydown(fieldsText);

  formUpload.reset();
}

pristine.addValidator(
  fieldHashtag,
  validateTags,
  HASHTAG_ERROR_TEXT
);

const onFormSubmit = (evt) => {
  evt.preventDefault();
  pristine.validate();
};

fieldUploadFile.addEventListener('change', onInputFileChange);
formUpload.addEventListener('submit', onFormSubmit);
