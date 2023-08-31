import {resetScaleImage} from './image-scale.js';
import {resetEffectsImage} from './image-effects.js';

const body = document.querySelector('body');

export function showModal(element) {
  body.classList.add('modal-open');
  element.classList.remove('hidden');
  resetScaleImage();
  resetEffectsImage();
}

export function hideModal(element) {
  body.classList.remove('modal-open');
  element.classList.add('hidden');
  resetScaleImage();
  resetEffectsImage();
}
