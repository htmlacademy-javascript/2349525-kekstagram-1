import {renderThumbnails} from './render-thumbnails.js';
import {showModalMedia} from './modal-media.js';
import {getData} from './api.js';
import {showAlert} from './helpers/show-alert.js';

const container = document.querySelector('.pictures');

const renderGallery = function (arrayMedia) {
  renderThumbnails(arrayMedia);

  container.addEventListener('click', (evt) => {
    const thumbnail = evt.target.closest('[data-thumbnail-id]');

    if (!thumbnail) {
      return;
    }

    evt.preventDefault();

    const elementMedia = arrayMedia.find(
      (item) => item.id === +thumbnail.dataset.thumbnailId
    );

    showModalMedia(elementMedia);
  });
};

export const runRenderGallery = async () => {
  try {
    const data = await getData();
    renderGallery(data);
  } catch (err) {
    showAlert(err.message);
  }
};
