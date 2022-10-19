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
getRandomPositiveInt(-6.8, 46);

const isMaxLengthLine = (line, maxLength) => line.length <= maxLength;
isMaxLengthLine('Cъешь ещё этих мягких французских булок, да выпей чаю', 90);
