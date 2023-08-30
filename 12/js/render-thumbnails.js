import {createThumbnail} from './create-thumbnail.js';

const sectionPictures = document.querySelector('.pictures');

export const renderThumbnails = (arrayMedia) => {
  const arrayTambnails = sectionPictures.querySelectorAll('.picture');
  if (arrayTambnails.length > 0) {
    arrayTambnails.forEach((elementTambnails) => elementTambnails.remove());
  }

  const fragment = document.createDocumentFragment();

  arrayMedia.forEach((elementMedia) => {
    const thumbnail = createThumbnail(elementMedia);
    fragment.append(thumbnail);
  });

  sectionPictures.append(fragment);
};
