import {isEscapeKey} from './util.js';

const body = document.body;
const pictureModal = document.querySelector('.big-picture');
const closeModalButton = pictureModal.querySelector('.big-picture__cancel');
const allComments = pictureModal.querySelector('.social__comments');
const countComments = pictureModal.querySelector('.social__comment-count');
const loaderCommentsButton = pictureModal.querySelector('.comments-loader');

const makeElement = (tagName, className, text) => {
  const element = document.createElement(tagName);
  element.classList.add(className);
  if (text) {
    element.textContent = text;
  }
  return element;
};

const closeModal = () => {
  body.classList.remove('modal-open');
  pictureModal.classList.add('hidden');
  countComments.classList.add('hidden');
};

const renderComment = ({avatar, message, name}) => {
  const commentElement = makeElement('li', 'social__comment');
  const img = makeElement('img', 'social__picture');
  const text = makeElement('p', 'social__text', message);

  img.src = avatar;
  img.alt = name;
  img.width = 35;
  img.height = 35;

  commentElement.append(img);
  commentElement.append(text);

  return commentElement;
};

const renderComments = (comments) => {
  allComments.append(...comments.map(renderComment));
};

const renderFullPhoto = ({url, likes, comments, description}) => {
  pictureModal.querySelector('.big-picture__img img').src = url;
  pictureModal.querySelector('.likes-count').textContent = likes;
  pictureModal.querySelector('.comments-count').textContent = comments.length;
  pictureModal.querySelector('.social__caption').textContent = description;
};

const checkAllComments = (comments) => {
  let lastComments = [];
  if (comments.length <= 5) {
    loaderCommentsButton.classList.add('hidden');
    renderComments(comments);
  } else {
    loaderCommentsButton.classList.remove('hidden');
    lastComments = comments.slice(5);
    renderComments(comments.slice(0,5));
  }
  return lastComments;
};

const openModal = ({url, likes, comments, description}) => {
  const info = {url, likes, comments, description};
  let lastComments = [];
  allComments.innerHTML = '';

  body.classList.add('modal-open');
  pictureModal.classList.remove('hidden');
  countComments.classList.add('hidden');
  loaderCommentsButton.classList.add('hidden');
  countComments.classList.remove('hidden');

  renderFullPhoto(info);

  lastComments = checkAllComments(info.comments);

  loaderCommentsButton.addEventListener('click', () => {
    lastComments = checkAllComments(lastComments);
  });

  closeModalButton.addEventListener('click', () => {
    closeModal();
  });
  document.addEventListener('keydown', (evt) => {
    if (isEscapeKey(evt)) {
      closeModal();
    }
  });
};

export {openModal};
