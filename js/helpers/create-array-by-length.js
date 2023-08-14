export const createArrayByLength = function (arrayLength, arrayElement) {
  return Array.from({length:arrayLength}, arrayElement);
};
