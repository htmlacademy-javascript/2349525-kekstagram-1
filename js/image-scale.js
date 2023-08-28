import {imagePreview, buttonSmaller, buttonBigger, fieldScale, scale} from './form.js';

const SCALE_MIN = 25;
const SCALE_MAX = 100;
const SCALE_STEP = 25;
const SCALE_DEFAULT = 100;

const updateScaleValue = (newValue) => {
  imagePreview.style.transform = `scale(${newValue * 0.01})`;
  fieldScale.value = `${newValue}%`;
};

const getNewScaleValue = (operator) => {
  const currentScale = parseInt(fieldScale.value, 10);
  const newScale = operator === 'plus' ? currentScale + SCALE_STEP : currentScale - SCALE_STEP;
  if (newScale < SCALE_MIN) {
    return SCALE_MIN;
  } else if (newScale > SCALE_MAX) {
    return SCALE_MAX;
  }
  return newScale;
};

scale.addEventListener('click', (evt) => {
  if (evt.target === buttonSmaller) {
    updateScaleValue(getNewScaleValue('minus'));
  } else if (evt.target === buttonBigger) {
    updateScaleValue(getNewScaleValue('plus'));
  }
});

export const resetScaleImage = () => {
  updateScaleValue(SCALE_DEFAULT);
};
