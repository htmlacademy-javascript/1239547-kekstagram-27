const getRandomPositiveInt = (from, to) => {
  const isValid = Math.sign(from) < 0 ||
                  Math.sign(to) < 0 ||
                  !Number.isInteger(from) ||
                  !Number.isInteger(to);
  if (isValid) {
    return NaN;
  }
  if(from > to) {
    [from, to] = [to, from];
  }
  return Math.round(Math.random() * (to - from) + from);
};

const getRandomArrayElement = (elements) => elements[getRandomPositiveInt(0, elements.length - 1)];

const isEscapeKey = (evt) => evt.key === 'Escape';

export {getRandomPositiveInt, getRandomArrayElement, isEscapeKey};
