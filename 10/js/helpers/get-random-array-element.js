import {getRandomInteger} from './get-random-integer.js';

export const getRandomArrayElement = (elements) => elements[getRandomInteger(0, elements.length - 1)];
