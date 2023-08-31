const MAX_HASHTAG_COUNT = 5;
const VALID_SYMBOLS = /^#[a-zа-яё0-9]{1,19}$/i;

const hasValidCount = (arrayTags) => arrayTags.length <= MAX_HASHTAG_COUNT;

const hasUniqueTags = (arrayTags) => {
  const arrayLowerCaseTags = arrayTags.map((tag) => tag.toLowerCase());
  return arrayLowerCaseTags.length === new Set(arrayLowerCaseTags).size;
};

const hasValidSymbols = (tag) => VALID_SYMBOLS.test(tag);

export const validateTags = (stringTags) => {
  const arrayTags = stringTags
    .trim()
    .split(' ')
    .filter((tag) => tag.trim().length);

  return hasValidCount(arrayTags) && hasUniqueTags(arrayTags) && arrayTags.every(hasValidSymbols);
};
