import {createArrayByLength} from './helpers/create-array-by-length.js';
import {createMedia} from './create-media.js';

export const createArrayMedia = function (arrayLength) {
  return createArrayByLength(arrayLength, createMedia);
};
