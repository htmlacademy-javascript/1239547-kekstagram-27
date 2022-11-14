import {openModal} from './full-picture.js';

const pictures = document.querySelector('.pictures');
const pictureTemplate = document.querySelector('#picture').content.querySelector('.picture');

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
  pictures.append(...photos.map(renderPhoto));
};

export {renderPhotos};
