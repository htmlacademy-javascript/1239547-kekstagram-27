const isMaxLengthLine = (line, maxLength) => line.length <= maxLength;
isMaxLengthLine('Cъешь ещё этих мягких французских булок, да выпей чаю', 90);

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

const getArrRandomUniqueInt = (from, to) => {
  const usedUniqueInt = [];
  if(from > to) {
    [from, to] = [to, from];
  }
  for(let i = from; i <= to; i++) {
    let isInclude = true;
    let elementUnique;
    while (isInclude) {
      elementUnique = getRandomPositiveInt(from, to);
      isInclude = usedUniqueInt.includes(elementUnique);
    }
    usedUniqueInt.push(elementUnique);
  }
  return usedUniqueInt;
};

const MESSAGES = [
  'Всё отлично!',
  'В целом всё неплохо. Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!',
];

const NAMES = [
  'Артём',
  'Дарья',
  'Василий',
  'Петуния',
  'Геннадий',
  'Ариана',
  'Джек',
];

const DESCRIPTION = [
  'Я прекрасный человек',
  'Обожаю играть на барабанах, но соседи меня до сих пор любят!',
  'Котик, который любит лежать на печи',
  'Отличный компаньон для туристического похода',
  'Здесь могло бы быть описание, но мне лень',
];

const ID_UNIQUE_PHOTO = getArrRandomUniqueInt(1,25);
const ID_UNIQUE_URL_PHOTO = getArrRandomUniqueInt(1,25);
const ID_UNIQUE_PROFILE_COMMENT = getArrRandomUniqueInt(1000, 1100);

const getUniqueArrayElement = (elements) => {
  const current = elements[0];
  elements.shift();
  return current;
};

const getRandomArrayElement = (elements) => elements[getRandomPositiveInt(0, elements.length - 1)];

const createComment = () => ({
  id: getUniqueArrayElement(ID_UNIQUE_PROFILE_COMMENT),
  avatar: `img/avatar-${getRandomPositiveInt(1, 6)}.svg`,
  message: getRandomArrayElement(MESSAGES),
  name: getRandomArrayElement(NAMES),
});

const createPhoto = () => ({
  id: getUniqueArrayElement(ID_UNIQUE_PHOTO),
  url: `photos/${getUniqueArrayElement(ID_UNIQUE_URL_PHOTO)}.jpg`,
  description: getRandomArrayElement(DESCRIPTION),
  likes: getRandomPositiveInt(15, 200),
  comments: Array.from({length: getRandomPositiveInt(1,2)},createComment),
});

const photos = Array.from({length: 25}, createPhoto);
