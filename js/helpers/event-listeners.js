import {isEscapeKey} from './test-keys.js';

export const addOnButtonCloseClick = (element, functionClose, add = true) => {
  if (add) {
    element.addEventListener('click', functionClose);
  } else {
    element.removeEventListener('click', functionClose);
  }
};

export const addEventListenerKeydown = (elements, add = true) => {
  elements.forEach((element) => {
    if (add) {
      element.addEventListener('keydown', (evt) => {
        if (isEscapeKey(evt)) {
          evt.preventDefault();
          evt.stopPropagation();
        }
      });
    } else {
      element.removeEventListener('keydown', (evt) => {
        if (isEscapeKey(evt)) {
          evt.preventDefault();
          evt.stopPropagation();
        }
      });
    }
  });
};
