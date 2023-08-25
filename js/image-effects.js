const SLIDER_SETTINGS = [
  {
    name: 'none',
    filter: 'none',
    min: 0,
    max: 100,
    unit: '',
    start: 100,
    step: 1,
  },
  {
    name: 'chrome',
    filter: 'grayscale',
    min: 0,
    max: 1,
    unit: '',
    start: 1,
    step: 0.1,
  },
  {
    name: 'sepia',
    filter: 'sepia',
    min: 0,
    max: 1,
    unit: '',
    start: 1,
    step: 0.1,
  },
  {
    name: 'marvin',
    filter: 'invert',
    min: 0,
    max: 100,
    unit: '%',
    start: 100,
    step: 1,
  },
  {
    name: 'phobos',
    filter: 'blur',
    min: 0,
    max: 3,
    unit: 'px',
    start: 3,
    step: 0.1,
  },
  {
    name: 'heat',
    filter: 'brightness',
    min: 1,
    max: 3,
    unit: '',
    start: 3,
    step: 0.1,
  },
];

const DEFAULT_SETTINGS = SLIDER_SETTINGS[0];
let newSettings = DEFAULT_SETTINGS;

const imagePreview = document.querySelector('.img-upload__preview img');
const blockEffects = document.querySelector('.effects');
const sliderContainer = document.querySelector('.img-upload__effect-level');
const slider = document.querySelector('.effect-level__slider');
const fieldEffectLevel = document.querySelector('.effect-level__value');

const isDefault = () => newSettings === DEFAULT_SETTINGS;

const showSlider = () => {
  sliderContainer.classList.remove('hidden');
};

const hideSlider = () => {
  sliderContainer.classList.add('hidden');
};

const updateSlider = () => {
  slider.noUiSlider.updateOptions({
    range: {
      min: newSettings.min,
      max: newSettings.max,
    },
    start: newSettings.start,
    step: newSettings.step,
  });

  if (isDefault()) {
    hideSlider();
  } else {
    showSlider();
  }
};

const onEffectChange = (evt) => {
  if (!evt.target.classList.contains('effects__radio')) {
    return;
  }
  newSettings = SLIDER_SETTINGS.find((settings) => settings.name === evt.target.value);
  imagePreview.className = `effects__preview--${newSettings.name}`;
  updateSlider();
};

const onSliderUpdate = () => {
  const sliderValue = slider.noUiSlider.get();
  let newFilter = '';
  if (isDefault()) {
    newFilter = DEFAULT_SETTINGS.filter;
  } else {
    newFilter = `${newSettings.filter}(${sliderValue}${newSettings.unit})`;
  }
  imagePreview.style.filter = newFilter;
  fieldEffectLevel.value = sliderValue;
};

export const resetEffectsImage = () => {
  newSettings = DEFAULT_SETTINGS;
  updateSlider();
};

noUiSlider.create(slider, {
  range: {
    min: DEFAULT_SETTINGS.min,
    max: DEFAULT_SETTINGS.max,
  },
  start: DEFAULT_SETTINGS.start,
  step: DEFAULT_SETTINGS.step,
  connect: 'lower',
});

blockEffects.addEventListener('change', onEffectChange);
slider.noUiSlider.on('update', onSliderUpdate);
