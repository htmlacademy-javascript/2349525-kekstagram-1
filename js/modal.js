import {resetScaleImage} from './image-scale.js';
import {resetEffectsImage} from './image-effects.js';

const body = document.querySelector('body');

export const showModal = (element) => {
  body.classList.add('modal-open');
  element.classList.remove('hidden');
  resetScaleImage();
  resetEffectsImage();
};

export const hideModal = (element) => {
  body.classList.remove('modal-open');
  element.classList.add('hidden');
  resetScaleImage();
  resetEffectsImage();
};
