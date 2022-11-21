import {openModal} from './full-picture.js';

const RANDOM_FILTER = 'filter-random';
const DISCUSSED_FILTER = 'filter-discussed';
const ACTIVE_FILTER = 'img-filters__button--active';
const COUNT_RANDOM_PHOTOS = 10;

const pictures = document.querySelector('.pictures');
const pictureTemplate = document.querySelector('#picture').content.querySelector('.picture');
const filter = document.querySelector('.img-filters');
let activeFilterButton = filter.querySelector(`.${ACTIVE_FILTER}`).id;

const comparePhotos = (photoFirst, photoSecond) => {
  activeFilterButton = filter.querySelector(`.${ACTIVE_FILTER}`).id;

  if (activeFilterButton === DISCUSSED_FILTER) {
    return photoSecond.comments.length - photoFirst.comments.length;
  }
  return 0;
};

const filterPhotos = (elem, index, elems) =>{
  activeFilterButton = filter.querySelector(`.${ACTIVE_FILTER}`).id;

  if (activeFilterButton === RANDOM_FILTER && elems.indexOf(elem) === index) {
    return 1;
  }
  return 0;
};


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
  activeFilterButton = filter.querySelector(`.${ACTIVE_FILTER}`).id;
  const allPhotos = pictures.querySelectorAll('.picture');
  let newPhotos = photos.slice();

  if (activeFilterButton === RANDOM_FILTER) {
    newPhotos = photos.filter(filterPhotos).slice(0, COUNT_RANDOM_PHOTOS);
  } else {
    newPhotos.sort(comparePhotos);
  }

  allPhotos.forEach((element) => element.remove());

  pictures.append(...newPhotos.map(renderPhoto));
};

export {renderPhotos};
