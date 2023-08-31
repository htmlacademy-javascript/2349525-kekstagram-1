export const getTemplate = (parameterID, parameterClass) =>
  document.querySelector(parameterID).content.querySelector(parameterClass);
