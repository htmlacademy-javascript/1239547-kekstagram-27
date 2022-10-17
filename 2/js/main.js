const getRandomNumber = (fromNumber, toNumber) => {
  if (Math.sign(fromNumber) < 0 || Math.sign(toNumber) < 0 || !Number.isInteger(fromNumber) || !Number.isInteger(toNumber)) {
    return NaN;
  }
  if(fromNumber > toNumber) {
    return Math.round(Math.random() * (fromNumber - toNumber) + toNumber);
  }
  return Math.round(Math.random() * (toNumber - fromNumber) + fromNumber);
};
getRandomNumber(-6.8, 46);

const isMaxLengthString = (inputString, lengthString) => {
  if (inputString.length <= lengthString) {
    return true;
  } else {
    return false;
  }
};
isMaxLengthString('Cъешь ещё этих мягких французских булок, да выпей чаю', 90);
