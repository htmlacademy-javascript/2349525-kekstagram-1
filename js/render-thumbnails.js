import {getTemplate} from './helpers/get-template.js';

const thumbnailTemplate = getTemplate('#picture', '.picture');
const sectionPictures = document.querySelector('.pictures');

const createThumbnail = ({url, comments, likes}) => {
  const thumbnail = thumbnailTemplate.cloneNode(true);

  thumbnail.querySelector('.picture__img').src = url;
  thumbnail.querySelector('.picture__comments').textContent = comments.length;
  thumbnail.querySelector('.picture__likes').textContent = likes;

  return thumbnail;
};

export const renderThumbnails = (pictures) => {
  const fragment = document.createDocumentFragment();

  pictures.forEach((picture) => {
    const thumbnail = createThumbnail(picture);
    fragment.append(thumbnail);
  });

  sectionPictures.append(fragment);
};
