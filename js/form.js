import {isEscapeKey} from './helpers/test-keys.js';
import {validateTags} from './validate-tags.js';
import {showModal, hideModal} from './modal.js';
import {addOnButtonCloseClick, addEventListenerKeydown} from './helpers/event-listeners.js';

const formUpload = document.querySelector('.img-upload__form');
const blockUploadOverlay = formUpload.querySelector('.img-upload__overlay');
const fieldUploadFile = formUpload.querySelector('#upload-file');
const fieldHashtag = formUpload.querySelector('.text__hashtags');
const fieldComment = formUpload.querySelector('.text__description');
const buttonClose = formUpload.querySelector('#upload-cancel');
const fieldsText = [fieldHashtag, fieldComment];

const HASHTAG_ERROR_TEXT =
  `Хэш-тег(и) не соответсвует(-ют) правилам заполнения хэш-тегов:
  1. Xэш-теги начинаются с символа #(решётка);
  2. Строка после решётки:
    - состоит из букв и чисел;
    - не содержит пробелы, спецсимволы (#, @, $ и т. п.),
      символы пунктуации, эмодзи и т.д.;
  3. Длина одного хэш-тега не более 20 символов, включая решётку;
  4. Xэш-теги разделяются пробелами;
  5. Один и тот же хэш-тег не может быть использован дважды;
  6. Нельзя указать больше пяти хэш-тегов;`;

const pristine = new Pristine(formUpload, {
  classTo: 'img-upload__field-wrapper',
  errorTextParent: 'img-upload__field-wrapper',
  errorTextClass: 'img-upload__field-wrapper--invalid',
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
}

function hideModalForm() {
  hideModal(blockUploadOverlay);
  document.removeEventListener('keydown', onDocumentKeydown);
  addOnButtonCloseClick(buttonClose, hideModalForm, false);
  addEventListenerKeydown(fieldsText, false);
  formUpload.reset();
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
