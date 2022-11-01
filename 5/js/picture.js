import {createPhotos} from './data.js';

const pictures = document.querySelector('.pictures');

//const similarListElement = userDialog.querySelector('.setup-similar-list');
const pictureTemplate = document.querySelector('#picture').content.querySelector('.picture');

const photos = createPhotos();

const picturesFragment = document.createDocumentFragment();

photos.forEach(({url, likes, comments}) => {
  const pictureElement = pictureTemplate.cloneNode(true);
  pictureElement.querySelector('.picture__img').src = url;
  pictureElement.querySelector('.picture__likes').textContent = likes;
  pictureElement.querySelector('.picture__comments').textContent = comments.length;
  picturesFragment.appendChild(pictureElement);
});

pictures.appendChild(picturesFragment);
