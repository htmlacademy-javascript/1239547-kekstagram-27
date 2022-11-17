import {isEscapeKey} from './util.js';

const MAX_COUNT_COMMETS = 5;

const body = document.body;
const pictureModal = document.querySelector('.big-picture');
const closeModalButton = pictureModal.querySelector('.big-picture__cancel');
const allComments = pictureModal.querySelector('.social__comments');
const countComments = pictureModal.querySelector('.social__comment-count');
const loaderCommentsButton = pictureModal.querySelector('.comments-loader');

let onMoreLoaderClick;

const makeElement = (tagName, className, text) => {
  const element = document.createElement(tagName);
  element.classList.add(className);
  if (text) {
    element.textContent = text;
  }
  return element;
};

const onModalEscapeKeydown = (evt) => {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    closeModal();
  }
};

const onModalCloseButtonClick = () => closeModal();

function closeModal () {
  body.classList.remove('modal-open');
  pictureModal.classList.add('hidden');
  countComments.classList.add('hidden');

  document.removeEventListener('keydown', onModalEscapeKeydown);
  closeModalButton.removeEventListener('click', onModalCloseButtonClick);
  loaderCommentsButton.removeEventListener('click', onMoreLoaderClick);
}

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
  if (comments.length <= MAX_COUNT_COMMETS) {
    loaderCommentsButton.classList.add('hidden');
    renderComments(comments);
    return [];
  }

  loaderCommentsButton.classList.remove('hidden');
  renderComments(comments.slice(0, MAX_COUNT_COMMETS));
  return comments.slice(MAX_COUNT_COMMETS);
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

  loaderCommentsButton.addEventListener('click', onMoreLoaderClick = () => {
    lastComments = checkAllComments(lastComments);
  });

  closeModalButton.addEventListener('click', onModalCloseButtonClick);
  document.addEventListener('keydown', onModalEscapeKeydown);
};

export {openModal};
