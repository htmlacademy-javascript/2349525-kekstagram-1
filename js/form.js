import {isEscapeKey} from './helpers/test-keys.js';
import {validateTags} from './validate-tags.js';
import {showModal, hideModal} from './modal.js';
import {addOnButtonCloseClick, addEventListenerKeydown} from './helpers/event-listeners.js';

const sectionImgUpload = document.querySelector('.img-upload');
const formUpload = sectionImgUpload.querySelector('.img-upload__form');
const blockUploadOverlay = formUpload.querySelector('.img-upload__overlay');
const fieldUploadFile = formUpload.querySelector('#upload-file');
const fieldHashtag = formUpload.querySelector('.text__hashtags');
const fieldComment = formUpload.querySelector('.text__description');
const buttonClose = formUpload.querySelector('#upload-cancel');
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

const HASHTAG_ERROR_TEXT = 'Некорректно заполнено поле "Хэш-тег"';

const pristine = new Pristine(formUpload, {
  classTo: 'img-upload__field-wrapper',
  errorTextParent: 'img-upload__field-wrapper',
  errorTextClass: 'img-upload__message--invalid',
});

const onInputFileChange = () => {
  showModalForm();
};

function onDocumentKeydown(evt) {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    hideModalForm();
  }
}

function showModalForm() {
  showModal(blockUploadOverlay);
  document.addEventListener('keydown', onDocumentKeydown);
  addOnButtonCloseClick(buttonClose, hideModalForm);
  addEventListenerKeydown(fieldsText);
  pristine.reset();
}

function hideModalForm() {
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

fieldUploadFile.addEventListener('change', onInputFileChange);
formUpload.addEventListener('submit', () => {
  pristine.validate();
});
