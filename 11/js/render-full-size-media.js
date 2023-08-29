import {renderComments} from './render-comments.js';

export const renderFullSizeMedia = ({url, likes, comments, description}) => {
  document.querySelector('.big-picture__img').querySelector('img').src = url;
  document.querySelector('.likes-count').textContent = likes;
  document.querySelector('.comments-count').textContent = comments.length;
  document.querySelector('.social__caption').textContent = description;

  renderComments(comments);
};
