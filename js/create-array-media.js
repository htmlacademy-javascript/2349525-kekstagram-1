import {createArrayByLength} from './helpers/create-array-by-length.js';
import {createObjectMedia} from './create-object-media.js';

export const createArrayMedia = function (arrayLength = 25) {
  return createArrayByLength(arrayLength, createObjectMedia);
};
