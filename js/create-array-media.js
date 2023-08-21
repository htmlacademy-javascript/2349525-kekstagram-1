import {createArrayByLength} from './helpers/create-array-by-length.js';
import {createMedia} from './create-media.js';

export const createArrayMedia = function (arrayLength = 25) {
  return createArrayByLength(arrayLength, createMedia);
};
