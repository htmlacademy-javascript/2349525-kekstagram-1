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

const descriptionCreationRules = {
  minPhotoID: 1,
  maxPhotoID: 25,
  minPhotoNumber: 1,
  maxPhotoNumber: 25,
  minQuantityLikes: 15,
  maxQuantityLikes: 200,
  minQuantityComments: 1,
  maxQuantityComments: 3,
};

const {minPhotoID, maxPhotoID, minPhotoNumber, maxPhotoNumber, minQuantityLikes, maxQuantityLikes, minQuantityComments, maxQuantityComments} = descriptionCreationRules;

const commentCreationRules = {
  minCommentID: 1,
  maxCommentID: 1000,
  minAvatarNumber: 1,
  maxAvatarNumber: 6,
};

const {minCommentID, maxCommentID, minAvatarNumber, maxAvatarNumber} = commentCreationRules;

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

const createRandomIdFromRangeGenerator = function (min, max) {
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

const generateCommentId = createRandomIdFromRangeGenerator(minCommentID, maxCommentID);
const generatePhotoId = createId(minPhotoID, maxPhotoID);
const generatePhotoNumber = createId(minPhotoNumber, maxPhotoNumber);
const generatePhotosNamesIndex = createRandomIdFromRangeGenerator(1, PHOTOS_NAMES.length);

const createComment = function () {
  return {
    id: generateCommentId(),
    avatar: `img/avatar-${getRandomInteger(minAvatarNumber, maxAvatarNumber)}.svg`,
    message: getRandomArrayElement(MESSAGE_TEXT),
    name: getRandomArrayElement(USERS_NAMES),
  };
};

const createPhotoDescription = function () {
  return {
    id: generatePhotoId(),
    url: `photos/${generatePhotoNumber()}.jpg`,
    description: PHOTOS_NAMES[generatePhotosNamesIndex() - 1],
    likes: getRandomInteger(minQuantityLikes, maxQuantityLikes),
    comments: Array.from({length:getRandomInteger(minQuantityComments, maxQuantityComments)}, createComment),
  };
};

const createArrayDescriptions = (lengthArray) => Array.from({length:lengthArray}, createPhotoDescription);
console.log(createArrayDescriptions(25));
