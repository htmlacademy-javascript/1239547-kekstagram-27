const EFFECTS_PARAMS = {
  'none': {
    effect: '',
    min: 0,
    max: 0,
    step: 0,
    unit: '',
  },
  'chrome': {
    effect: 'grayscale',
    min: 0,
    max: 1,
    step: 0.1,
    unit: '',
  },
  'sepia': {
    effect: 'sepia',
    min: 0,
    max: 1,
    step: 0.1,
    unit: '',
  },
  'marvin': {
    effect: 'invert',
    min: 0,
    max: 100,
    step: 1,
    unit: '%',
  },
  'phobos': {
    effect: 'blur',
    min: 0,
    max: 3,
    step: 0.1,
    unit: 'px',
  },
  'heat': {
    effect: 'brightness',
    min: 1,
    max: 3,
    step: 0.1,
    unit: '',
  },
};

const DEFAULT_EFFECT = 'none';

const allEffectsElement = document.querySelectorAll('.effects__radio');
const picturePreviewElement = document.querySelector('.img-upload__preview img');
const effectLevelSliderElement = document.querySelector('.effect-level__slider');
const effectLevelValueElement = document.querySelector('.effect-level__value');

const createSlider = () => {
  noUiSlider.create(effectLevelSliderElement, {
    range: {
      min: EFFECTS_PARAMS.none.min,
      max: EFFECTS_PARAMS.none.max,
    },
    start: 100,
    step: EFFECTS_PARAMS.none.step,
    connect: 'lower',
    format: {
      to: function (value) {
        if (Number.isInteger(value)) {
          return value.toFixed(0);
        }
        return value.toFixed(1);
      },
      from: function (value) {
        return parseFloat(value);
      },
    },
  });
};

const hideSlider = (element) => {
  effectLevelSliderElement.classList.add('hidden');
  element.value = 'none';
};

const showSlider = () => {
  effectLevelSliderElement.classList.remove('hidden');
};

const updateSlider = (effect) => {
  effectLevelSliderElement.noUiSlider.on('update', () => {
    effectLevelValueElement.value = effectLevelSliderElement.noUiSlider.get();
  });

  effectLevelSliderElement.noUiSlider.updateOptions({
    range: {
      min: EFFECTS_PARAMS[effect].min,
      max: EFFECTS_PARAMS[effect].max,
    },
    start: 100,
    step: EFFECTS_PARAMS[effect].step,
  });
};

const setEffectValue = (effect) => {
  const currentValue = effectLevelSliderElement.noUiSlider.get();

  picturePreviewElement.style.filter = effect !== DEFAULT_EFFECT ? `${EFFECTS_PARAMS[effect].effect}(${currentValue}${EFFECTS_PARAMS[effect].unit})` : '';
};

const updateEffect = (effect) => {
  effectLevelSliderElement.noUiSlider.on('update', () => {
    setEffectValue(effect);
  });
};

const changeEffect = () => {
  allEffectsElement.forEach((effect) => {
    effect.addEventListener('change', (evt) => {
      const nameSelectedEffect = evt.target.value;
      picturePreviewElement.classList.value = `effects__preview--${nameSelectedEffect}`;

      showSlider(effect);

      if(nameSelectedEffect === DEFAULT_EFFECT) {
        hideSlider(effect);
      }

      updateSlider(nameSelectedEffect);
      updateEffect(nameSelectedEffect);
    });

    if (effect.querySelector('input[value="none"]:checked')) {
      hideSlider(effect);
    }
  });
};

const cleanEffect = () => {
  if(effectLevelSliderElement.noUiSlider) {
    effectLevelSliderElement.noUiSlider.destroy();
  }
  picturePreviewElement.style.filter = '';
  picturePreviewElement.classList.value = `effects__preview--${DEFAULT_EFFECT}`;
  effectLevelValueElement.value = DEFAULT_EFFECT;
};

const loadPictureEffectsControl = () => {
  createSlider();
  changeEffect();
  hideSlider(allEffectsElement.item(0));
};

export {loadPictureEffectsControl, cleanEffect};
