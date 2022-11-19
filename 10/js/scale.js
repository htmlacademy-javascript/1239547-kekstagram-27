const SCALE_STEP = 25;
const SCALE_MIN = 25;
const SCALE_MAX = 100;
const SCALE_DEFAULT = 100;

const scaleSmaller = document.querySelector('.scale__control--smaller');
const scaleBigger = document.querySelector('.scale__control--bigger');
const scaleValue = document.querySelector('.scale__control--value');
const picturePreview = document.querySelector('.img-upload__preview img');

const getScaleCurrentValue = () => Number(scaleValue.value.slice(0, -1));

const setScaleNewValue = (value) => {
  scaleValue.value = `${value}%`;
  picturePreview.style.transform = `scale(${(value * 0.01).toFixed(2)})`;
};

const onScaleSmallerControl = () => {
  const scaleCurrentValue = getScaleCurrentValue();

  if (scaleCurrentValue !== SCALE_MIN) {
    setScaleNewValue(scaleCurrentValue - SCALE_STEP);
  }
};

const onScaleBiggerControl = () => {
  const scaleCurrentValue = getScaleCurrentValue();

  if (scaleCurrentValue !== SCALE_MAX) {
    setScaleNewValue(scaleCurrentValue + SCALE_STEP);
  }
};

const cleanScale = () => {
  setScaleNewValue(SCALE_DEFAULT);
};

const loadPictureScaleControl = () => {
  cleanScale();

  scaleSmaller.addEventListener('click', onScaleSmallerControl);
  scaleBigger.addEventListener('click', onScaleBiggerControl);
};

export {loadPictureScaleControl, cleanScale};
