export const getTemplate = function (parameterID, parameterClass) {
  return document.querySelector(parameterID).content.querySelector(parameterClass);
};
