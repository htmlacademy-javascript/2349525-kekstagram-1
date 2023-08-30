import {isEscapeKey} from './helpers/test-keys.js';
import {renderFullSizeMedia} from './render-full-size-media.js';
import {showModal, hideModal} from './modal.js';
import {addOnButtonCloseClick} from './helpers/event-listeners.js';
import {renderComments, resetCommentsShow} from './render-comments.js';

const bigPicture = document.querySelector('.big-picture');
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
  commentsLoader.classList.remove('hidden');
  document.removeEventListener('keydown', onDocumentKeydown);
  document.removeEventListener('click', onDocumentClick);
  addOnButtonCloseClick(buttonClose, hideModalMedia, false);
  resetCommentsShow();
  commentsLoader.removeEventListener('click', renderComments);
}

export function showModalMedia (arrayMedia) {
  showModal(bigPicture);
  document.addEventListener('keydown', onDocumentKeydown);
  document.addEventListener('click', onDocumentClick);
  addOnButtonCloseClick(buttonClose, hideModalMedia);
  renderFullSizeMedia(arrayMedia);
  commentsLoader.addEventListener('click', renderComments);
}
