// Task 1
// Функция для проверки, является ли строка палиндромом.
function isPalindrome(string) {
  const newString = string.toLowerCase().replaceAll(' ', '');
  const newStringReverse = reverseString(newString);
  if (newString === newStringReverse) {
    return true;
  }
  return false;
}

function reverseString(string) {
  let newString = '';
  for (let i = string.length - 1; i >= 0; i--) {
    newString += string[i];
  }
  return newString;
}

isPalindrome('топот');
// true
isPalindrome('ДовОд');
// true
isPalindrome('Кекс');
// false
isPalindrome('Лёша на полке клопа нашёл ');
// true

// Task 2
// Функция, которая принимает строку, извлекает содержащиеся в ней цифры от 0 до 9
// и возвращает их в виде целого положительного числа.
function getNumber (value) {
  let string = '';
  if (typeof value !== 'string') {
    value = value.toString();
  }
  for (let i = 0; i < value.length; i++) {
    if (!isNaN(parseInt(value[i], 10))) {
      string += value[i];
    }
  }
  return parseInt(string, 10);
}

getNumber('2023 год');
// 2023
getNumber('ECMAScript 2022');
// 2022
getNumber('1 кефир, 0.5 батона');
// 105
getNumber('агент 007');
// 7
getNumber('а я томат');
// NaN
getNumber(2023);
// 2023
getNumber(-1);
// 1
getNumber(1.5);
// 15

// Task 3
// Функция, которая принимает три параметра:
// исходную строку, минимальную длину и строку с добавочными символами
// и возвращает исходную строку, дополненную указанными символами до заданной длины.
function addSymbolsToString(string, minLength, additionalSymbol) {
  while (string.length < minLength) {
    if (additionalSymbol + string <= minLength) {
      string = additionalSymbol + string;
    } else {
      const freeSymbols = minLength - string.length;
      string = additionalSymbol.slice(0, freeSymbols) + string;
    }
  }
  return string;
}

addSymbolsToString('1', 2, '0');
// '01'
addSymbolsToString('1', 4, '0');
// '0001'
addSymbolsToString('q', 4, 'werty');
// 'werq'
addSymbolsToString('q', 4, 'we');
// 'wweq'
addSymbolsToString('qwerty', 4, '0');
// 'qwerty'

// Task 4
// Функция для проверки длины строки.
function isLessThanMax(string, maxLength) {
  if (string.length <= maxLength) {
    return true;
  }
  return false;
}

isLessThanMax('проверяемая строка', 20);
// true
isLessThanMax('проверяемая строка', 18);
// true
isLessThanMax('проверяемая строка', 10);
// false
