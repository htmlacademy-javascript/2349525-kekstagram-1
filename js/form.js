import {isEscapeKey} from './helpers/test-keys.js';
import {validateTags} from './validate-tags.js';
import {showModal, hideModal} from './modal.js';
import {addOnButtonCloseClick, addEventListenerKeydown} from './helpers/event-listeners.js';
import {sendData} from './api.js';
import {showAlert} from './helpers/show-alert.js';
import {showMessage} from './modal-message.js';

const sectionImgUpload = document.querySelector('.img-upload');
const formUpload = sectionImgUpload.querySelector('.img-upload__form');
const blockUploadOverlay = formUpload.querySelector('.img-upload__overlay');
const fieldUploadFile = formUpload.querySelector('#upload-file');
const fieldHashtag = formUpload.querySelector('.text__hashtags');
const fieldComment = formUpload.querySelector('.text__description');
const buttonClose = formUpload.querySelector('#upload-cancel');
const buttonSubmit = formUpload.querySelector('#upload-submit');
const fieldsText = [fieldHashtag, fieldComment];

export const blockEffects = sectionImgUpload.querySelector('.effects');
export const sliderContainer = sectionImgUpload.querySelector('.img-upload__effect-level');
export const slider = sectionImgUpload.querySelector('.effect-level__slider');
export const fieldEffectLevel = sectionImgUpload.querySelector('.effect-level__value');
export const imagePreview = sectionImgUpload.querySelector('.img-upload__preview img');

export const buttonSmaller = sectionImgUpload.querySelector('.scale__control--smaller');
export const buttonBigger = sectionImgUpload.querySelector('.scale__control--bigger');
export const fieldScale = sectionImgUpload.querySelector('.scale__control--value');
export const scale = sectionImgUpload.querySelector('.scale');

const FILE_TYPES = ['jpg', 'jpeg', 'png'];
const HASHTAG_ERROR_TEXT = 'Некорректно заполнено поле "Хэш-тег"';

const buttonSubmitText = {
  IDLE: 'Сохранить',
  SENDING: 'Сохраняю...'
};

const pristine = new Pristine(formUpload, {
  classTo: 'img-upload__field-wrapper',
  errorTextParent: 'img-upload__field-wrapper',
  errorTextClass: 'img-upload__message--invalid',
});

const showChosenFile = () => {
  const file = fieldUploadFile.files[0];
  const fileName = file.name.toLowerCase();
  const matches = FILE_TYPES.some((it) => fileName.endsWith(it));

  if (matches) {
    imagePreview.src = URL.createObjectURL(file);
  }
};

const onInputFileChange = () => {
  showModalForm();
  showChosenFile();
};

const onDocumentKeydown = (evt) => {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    hideModalForm();
  }
};

export function showModalForm() {
  showModal(blockUploadOverlay);
  document.addEventListener('keydown', onDocumentKeydown);
  addOnButtonCloseClick(buttonClose, hideModalForm);
  addEventListenerKeydown(fieldsText);
  pristine.reset();
}

export function hideModalForm() {
  hideModal(blockUploadOverlay);
  document.removeEventListener('keydown', onDocumentKeydown);
  addOnButtonCloseClick(buttonClose, hideModalForm, false);
  addEventListenerKeydown(fieldsText, false);
  formUpload.reset();
  pristine.reset();
}

pristine.addValidator(
  fieldHashtag,
  validateTags,
  HASHTAG_ERROR_TEXT
);

const blockSubmitButton = () => {
  buttonSubmit.disabled = true;
  buttonSubmit.textContent = buttonSubmitText.SENDING;
};

const unblockSubmitButton = () => {
  buttonSubmit.disabled = false;
  buttonSubmit.textContent = buttonSubmitText.IDLE;
};

export const setOnFormSubmit = (onSuccess) => {
  formUpload.addEventListener('submit', async (evt) => {
    evt.preventDefault();
    const isValid = pristine.validate();
    if (isValid) {
      blockSubmitButton();
      sendData(new FormData(formUpload))
        .then(onSuccess)
        .then(showMessage('success'))
        .catch(
          (err) => {
            showAlert(err.message);
            showMessage('error');
          }
        )
        .finally(unblockSubmitButton);
    }
  });
};

fieldUploadFile.addEventListener('change', onInputFileChange);
