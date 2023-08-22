import {getRandomArrayElement} from './helpers/get-random-array-element.js';
import {getRandomInteger} from './helpers/get-random-integer.js';
import {createRandomId} from './helpers/id-creators.js';

// Rules for creating a COMMENT
const MIN_COMMENT_ID = 1;
const MAX_COMMENT_ID = 1000;
const MIN_AVATAR_NUMBER = 1;
const MAX_AVATAR_NUMBER = 6;

const MESSAGE_TEXT = [
  'Всё отлично!',
  'В целом всё неплохо. Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!',
];

const USERS_NAMES = [
  'Хельмут Ньютон',
  'Ричард Аведон',
  'Анри Картье-Брессон',
  'Себастьян Салгаду',
  'Уильям Юджин Смит',
  'Артур Феллиг',
  'Александр Родченко',
  'Ирвин Пенн',
  'Антон Корбейн',
  'Стивен Майзел',
];

const generateCommentId = createRandomId(MIN_COMMENT_ID, MAX_COMMENT_ID);

export const createComment = function () {
  return {
    id: generateCommentId(),
    avatar: `img/avatar-${getRandomInteger(MIN_AVATAR_NUMBER, MAX_AVATAR_NUMBER)}.svg`,
    message: getRandomArrayElement(MESSAGE_TEXT),
    name: getRandomArrayElement(USERS_NAMES),
  };
};
