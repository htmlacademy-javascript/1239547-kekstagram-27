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

const allEffects = document.querySelectorAll('.effects__radio');
const picturePreview = document.querySelector('.img-upload__preview img');
const effectLevelSlider = document.querySelector('.effect-level__slider');
const effectLevelValue = document.querySelector('.effect-level__value');


const createSlider = () => {
  noUiSlider.create(effectLevelSlider, {
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
  effectLevelSlider.classList.add('hidden');
  element.value = 'none';
};

const showSlider = () => {
  effectLevelSlider.classList.remove('hidden');
};

const updateSlider = (effect) => {
  effectLevelSlider.noUiSlider.on('update', () => {
    effectLevelValue.value = effectLevelSlider.noUiSlider.get();
  });

  effectLevelSlider.noUiSlider.updateOptions({
    range: {
      min: EFFECTS_PARAMS[effect].min,
      max: EFFECTS_PARAMS[effect].max,
    },
    start: 100,
    step: EFFECTS_PARAMS[effect].step,
  });
};

const setEffectValue = (effect) => {
  const currentValue = effectLevelSlider.noUiSlider.get();
  if (effect !== 'none') {
    picturePreview.style.filter = `${EFFECTS_PARAMS[effect].effect}(${currentValue}${EFFECTS_PARAMS[effect].unit})`;
  } else {
    picturePreview.style.filter = '';
  }
};

const updateEffect = (effect) => {
  effectLevelSlider.noUiSlider.on('update', () => {
    setEffectValue(effect);
  });
};

const changeEffect = () => {
  allEffects.forEach((effect) => {
    effect.addEventListener('change', (evt) => {
      const nameSelectedEffect = evt.target.value;
      picturePreview.classList = '';
      picturePreview.classList.add(`effects__preview--${nameSelectedEffect}`);

      showSlider(effect);

      if(nameSelectedEffect === 'none') {
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

const loadPictureEffectsControl = () => {
  createSlider();
  changeEffect();
  hideSlider(allEffects.item(0));
};

export {loadPictureEffectsControl};
