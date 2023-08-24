import {isEscapeKey} from './helpers/test-keys.js';
import {renderFullSizeMedia} from './render-full-size-media.js';
import {showModal, hideModal} from './modal.js';
import {addOnButtonCloseClick} from './helpers/event-listeners.js';

const bigPicture = document.querySelector('.big-picture');
const socialCommentCount = document.querySelector('.social__comment-count');
const commentsLoader = document.querySelector('.comments-loader');
const buttonClose = document.querySelector('.big-picture__cancel');

const onDocumentKeydown = (evt) => {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    hideModalMedia();
  }
};

const onDocumentClick = (evt) => {
  if (evt.target === bigPicture) {
    evt.preventDefault();
    hideModalMedia();
  }
};

export function hideModalMedia () {
  hideModal(bigPicture);
  socialCommentCount.classList.remove('hidden');
  commentsLoader.classList.remove('hidden');
  document.removeEventListener('keydown', onDocumentKeydown);
  document.removeEventListener('click', onDocumentClick);
  addOnButtonCloseClick(buttonClose, hideModalMedia, false);
}

export function showModalMedia (arrayMedia) {
  showModal(bigPicture);
  socialCommentCount.classList.add('hidden');
  commentsLoader.classList.add('hidden');
  document.addEventListener('keydown', onDocumentKeydown);
  document.addEventListener('click', onDocumentClick);
  addOnButtonCloseClick(buttonClose, hideModalMedia);
  renderFullSizeMedia(arrayMedia);
}
