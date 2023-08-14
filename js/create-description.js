import {createArrayByLength} from './helpers/create-array-by-length.js';
import {createId, createRandomId} from './helpers/id-creators.js';
import {getRandomInteger} from './helpers/get-random-integer.js';
import {createComment} from './create-comment.js';

// Rules for creating a DESCRIPTION
const MIN_MEDIA_ID = 1;
const MAX_MEDIA_ID = 25;
const MIN_MEDIA_NUMBER = 1;
const MAX_MEDIA_NUMBER = 25;
const MIN_QUANTITY_LIKES = 15;
const MAX_QUANTITY_LIKES = 200;
const MIN_QUANTITY_COMMENTS = 1;
const MAX_QUANTITY_COMMENTS = 3;

const MEDIA_NAMES = [
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

const generateMediaId = createId(MIN_MEDIA_ID, MAX_MEDIA_ID);
const generateMediaNumber = createId(MIN_MEDIA_NUMBER, MAX_MEDIA_NUMBER);
const generateMediaNamesIndex = createRandomId(1, MEDIA_NAMES.length);

export const createDescription = function () {
  return {
    id: generateMediaId(),
    url: `photos/${generateMediaNumber()}.jpg`,
    description: MEDIA_NAMES[generateMediaNamesIndex() - 1],
    likes: getRandomInteger(MIN_QUANTITY_LIKES, MAX_QUANTITY_LIKES),
    comments: createArrayByLength(getRandomInteger(MIN_QUANTITY_COMMENTS, MAX_QUANTITY_COMMENTS), createComment),
  };
};
