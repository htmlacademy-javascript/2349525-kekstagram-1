import {createArrayByLength} from './helpers/create-array-by-length.js';
import {createDescription} from './create-description.js';

export const createArrayDescriptions = function (arrayLength) {
  return createArrayByLength(arrayLength, createDescription);
};
