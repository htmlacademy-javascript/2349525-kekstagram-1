import {renderThumbnails} from './render-thumbnails.js';
import {showBigPicture} from './big-picture.js';

const container = document.querySelector('.pictures');

export const renderGallery = function (arrayMedia) {
  renderThumbnails(arrayMedia);

  container.addEventListener('click', (evt) => {
    const thumbnail = evt.target.closest('[data-thumbnail-id]');

    if (!thumbnail) {
      return;
    }

    const elementMedia = arrayMedia.find(
      (item) => item.id === +thumbnail.dataset.thumbnailId
    );

    showBigPicture(elementMedia);
  });
};
