import {renderGallery} from './render-gallery.js';
import {debounce} from './helpers/debounce.js';

const sectionFilters = document.querySelector('.img-filters');
const formFilters = document.querySelector('.img-filters__form');
let currentFilter = sectionFilters.querySelector('.img-filters__button--active');

const TIMEOUT_DELAY = 500;
const MAX_COUNT_RANDOM_ELEMENTS = 10;
const Filters = {
  DEFAULT: 'filter-default',
  RANDOM: 'filter-random',
  DISCUSSED: 'filter-discussed',
};

const sortRandomly = () => Math.random() - 0.5;

const sortByComments = (elementA, elementB) => elementB.comments.length - elementA.comments.length;

const getFilteredArray = (arrayMedia, chosenFilter) => {
  const newArray = arrayMedia.slice();
  if (chosenFilter.id === Filters.RANDOM) {
    return newArray.sort(sortRandomly).slice(0, MAX_COUNT_RANDOM_ELEMENTS);
  }
  if (chosenFilter.id === Filters.DISCUSSED) {
    return newArray.sort(sortByComments);
  }
  return newArray;
};

const onClickButtonFilters = (evt, arrayMedia, callback) => {
  if (evt.target.className === 'img-filters__button' && evt.target !== currentFilter) {
    currentFilter.classList.remove('img-filters__button--active');
    currentFilter = evt.target;
    currentFilter.classList.add('img-filters__button--active');
    callback(getFilteredArray(arrayMedia, currentFilter));
  }
};

export const showFilters = (arrayMedia) => {
  if (sectionFilters.classList.contains('img-filters--inactive')) {
    sectionFilters.classList.remove('img-filters--inactive');
  }
  formFilters.addEventListener('click', (evt) => {
    onClickButtonFilters(evt, arrayMedia, debounce(renderGallery, TIMEOUT_DELAY));
  });
};
