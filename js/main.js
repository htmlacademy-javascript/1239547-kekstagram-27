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

const createComment = (id) => ({
  id: id,
  avatar: `img/avatar-${getRandomPositiveInt(1, 6)}.svg`,
  message: getRandomArrayElement(MESSAGES),
  name: getRandomArrayElement(NAMES),
});

const createComments = () => Array.from({length: getRandomPositiveInt(1,2)}, (_, id) => createComment(id + 1));

const createPhoto = (id) => ({
  id: id,
  url: `photos/${id}.jpg`,
  description: getRandomArrayElement(DESCRIPTION),
  likes: getRandomPositiveInt(15, 200),
  comments: createComments(),
});

const createPhotos = () => Array.from({length: 25}, (_, id) => createPhoto(id + 1));

createPhotos();
