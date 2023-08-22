import {isEscapeKey} from './helpers/test-keys.js';
import {renderFullSizeMedia} from './render-full-size-media.js';

const bigPicture = document.querySelector('.big-picture');
const socialCommentCount = document.querySelector('.social__comment-count');
const commentsLoader = document.querySelector('.comments-loader');
const body = document.querySelector('body');
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

function hideModalMedia () {
  bigPicture.classList.add('hidden');
  socialCommentCount.classList.remove('hidden');
  commentsLoader.classList.remove('hidden');
  body.classList.remove('modal-open');

  document.removeEventListener('keydown', onDocumentKeydown);
  document.removeEventListener('click', onDocumentClick);
  buttonClose.removeEventListener('click', () => {
    hideModalMedia();
  });
}

export function showModalMedia (arrayMedia) {
  bigPicture.classList.remove('hidden');
  socialCommentCount.classList.add('hidden');
  commentsLoader.classList.add('hidden');
  body.classList.add('modal-open');

  document.addEventListener('keydown', onDocumentKeydown);
  document.addEventListener('click', onDocumentClick);
  buttonClose.addEventListener('click', () => {
    hideModalMedia();
  });

  renderFullSizeMedia(arrayMedia);
}
