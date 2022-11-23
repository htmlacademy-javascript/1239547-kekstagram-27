import {openModal} from './full-picture.js';

const RANDOM_FILTER = 'filter-random';
const DISCUSSED_FILTER = 'filter-discussed';
const ACTIVE_FILTER = 'img-filters__button--active';
const COUNT_RANDOM_PHOTOS = 10;

const picturesElement = document.querySelector('.pictures');
const pictureTemplate = document.querySelector('#picture').content.querySelector('.picture');
const filterElement = document.querySelector('.img-filters');
let activeFilterButtonElement = filterElement.querySelector(`.${ACTIVE_FILTER}`).id;

const sortByMostDiscussied = (photos) => photos.sort((photoFirst, photoSecond) => photoSecond.comments.length - photoFirst.comments.length);

const filterRandom = (photos) => photos.sort(() => Math.random() - Math.random()).slice(0, COUNT_RANDOM_PHOTOS);

const renderPhoto = ({url, likes, comments, description}) => {
  const pictureElement = pictureTemplate.cloneNode(true);
  const info = {url, likes, comments, description};

  pictureElement.querySelector('.picture__img').src = url;
  pictureElement.querySelector('.picture__likes').textContent = likes;
  pictureElement.querySelector('.picture__comments').textContent = comments.length;
  pictureElement.addEventListener('click', () => {
    openModal(info);
  });
  return pictureElement;
};

const renderPhotos = (photos) => {
  activeFilterButtonElement = filterElement.querySelector(`.${ACTIVE_FILTER}`).id;
  const allPhotos = picturesElement.querySelectorAll('.picture');
  let newPhotos = photos.slice();

  if (activeFilterButtonElement === RANDOM_FILTER) {
    newPhotos = filterRandom(newPhotos);
  } else if (activeFilterButtonElement === DISCUSSED_FILTER) {
    newPhotos = sortByMostDiscussied(newPhotos);
  }

  allPhotos.forEach((element) => element.remove());

  picturesElement.append(...newPhotos.map(renderPhoto));
};

export {renderPhotos};
