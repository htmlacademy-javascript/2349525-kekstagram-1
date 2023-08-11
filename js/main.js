// Ссылка на страницу с заданием https://up.htmlacademy.ru/javascript-individual/1/tasks/8

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

const PHOTOS_NAMES = [
  'Скрипка Энгра',
  'Кадры из неназванных фильмов',
  'Рейн II',
  'Говорят мёртвые воины',
  'Чикагская товарная биржа III',
  'Озеро в лунном свете',
  'Париж, Монпарнас',
  'Билли Кид',
  '99 центов',
  'Пхеньян IV',
  'Франкфурт',
  'Тобольский кремль',
  'Мадонна I',
  'Джорджия О’Киф',
  'Сакура',
  'Силуэты ковбоев',
  'Довима и слоны',
  'Сан-Заккариа, Венеция',
  'Лос-Аламос',
  'Распутывание',
  'Спаситель мира',
  'Игроки в карты',
  'Алжирские женщины',
  'Крик',
  'Девушка с корзиной цветов',
];

// Rules for creating a DESCRIPTION
const MIN_PHOTO_ID = 1;
const MAX_PHOTO_ID = 25;
const MIN_PHOTO_NUMBER = 1;
const MAX_PHOTO_NUMBER = 25;
const MIN_QUANTITY_LIKES = 15;
const MAX_QUANTITY_LIKES = 200;
const MIN_QUANTITY_COMMENTS = 1;
const MAX_QUANTITY_COMMENTS = 3;

// Rules for creating a COMMENT
const MIN_COMMENT_ID = 1;
const MAX_COMMENT_ID = 1000;
const MIN_AVATAR_NUMBER = 1;
const MAX_AVATAR_NUMBER = 6;

function createId () {
  let lastGeneratedId = 0;

  return function () {
    lastGeneratedId += 1;
    return lastGeneratedId;
  };
}

const getRandomInteger = function (min, max) {
  const lower = Math.ceil(Math.min(Math.abs(min), Math.abs(max)));
  const upper = Math.floor(Math.max(Math.abs(min), Math.abs(max)));
  const result = Math.random() * (upper - lower + 1) + lower;

  return Math.floor(result);
};

const createRandomId = function (min, max) {
  const previousValues = [];

  return function () {
    let currentValue = getRandomInteger(min, max);
    if (previousValues.length >= (max - min + 1)) {
      return null;
    }
    while (previousValues.includes(currentValue)) {
      currentValue = getRandomInteger(min, max);
    }
    previousValues.push(currentValue);
    return currentValue;
  };
};

const getRandomArrayElement = (elements) => elements[getRandomInteger(0, elements.length - 1)];

const generateCommentId = createRandomId(MIN_COMMENT_ID, MAX_COMMENT_ID);
const generatePhotoId = createId(MIN_PHOTO_ID, MAX_PHOTO_ID);
const generatePhotoNumber = createId(MIN_PHOTO_NUMBER, MAX_PHOTO_NUMBER);
const generatePhotosNamesIndex = createRandomId(1, PHOTOS_NAMES.length);

const createComment = function () {
  return {
    id: generateCommentId(),
    avatar: `img/avatar-${getRandomInteger(MIN_AVATAR_NUMBER, MAX_AVATAR_NUMBER)}.svg`,
    message: getRandomArrayElement(MESSAGE_TEXT),
    name: getRandomArrayElement(USERS_NAMES),
  };
};

const createPhotoDescription = function () {
  return {
    id: generatePhotoId(),
    url: `photos/${generatePhotoNumber()}.jpg`,
    description: PHOTOS_NAMES[generatePhotosNamesIndex() - 1],
    likes: getRandomInteger(MIN_QUANTITY_LIKES, MAX_QUANTITY_LIKES),
    comments: Array.from({length:getRandomInteger(MIN_QUANTITY_COMMENTS, MAX_QUANTITY_COMMENTS)}, createComment),
  };
};

const createArrayDescriptions = (lengthArray) => Array.from({length:lengthArray}, createPhotoDescription);
createArrayDescriptions(25);
