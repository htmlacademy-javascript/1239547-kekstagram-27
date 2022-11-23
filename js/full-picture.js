import {isEscapeKey} from './util.js';

const MAX_COUNT_COMMETS = 5;

const body = document.body;
const pictureModalElement = document.querySelector('.big-picture');
const closeModalButtonElement = pictureModalElement.querySelector('.big-picture__cancel');
const allCommentsElement = pictureModalElement.querySelector('.social__comments');
const countCommentsElement = pictureModalElement.querySelector('.social__comment-count');
const loaderCommentsButtonElement = pictureModalElement.querySelector('.comments-loader');

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
  pictureModalElement.classList.add('hidden');
  countCommentsElement.classList.add('hidden');

  document.removeEventListener('keydown', onModalEscapeKeydown);
  closeModalButtonElement.removeEventListener('click', onModalCloseButtonClick);
  loaderCommentsButtonElement.removeEventListener('click', onMoreLoaderClick);
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
  allCommentsElement.append(...comments.map(renderComment));
};

const renderFullPhoto = ({url, likes, comments, description}) => {
  pictureModalElement.querySelector('.big-picture__img img').src = url;
  pictureModalElement.querySelector('.likes-count').textContent = likes;
  pictureModalElement.querySelector('.comments-count').textContent = comments.length;
  pictureModalElement.querySelector('.social__caption').textContent = description;
};

const checkAllComments = (comments, allCommentsCount) => {
  const notLoadedCommentsCount = comments.length;
  const loadedCommentsCount = notLoadedCommentsCount <= MAX_COUNT_COMMETS ? allCommentsCount : MAX_COUNT_COMMETS + allCommentsCount - notLoadedCommentsCount;

  countCommentsElement.innerHTML = `${loadedCommentsCount} из <span class="comments-count">${allCommentsCount}</span> комментариев`;

  if (notLoadedCommentsCount <= MAX_COUNT_COMMETS) {
    loaderCommentsButtonElement.classList.add('hidden');
    renderComments(comments);
    return [];
  }

  loaderCommentsButtonElement.classList.remove('hidden');
  renderComments(comments.slice(0, MAX_COUNT_COMMETS));
  return comments.slice(MAX_COUNT_COMMETS);
};

const openModal = ({url, likes, comments, description}) => {
  const info = {url, likes, comments, description};
  let lastComments = [];
  allCommentsElement.innerHTML = '';

  body.classList.add('modal-open');
  pictureModalElement.classList.remove('hidden');
  countCommentsElement.classList.add('hidden');
  loaderCommentsButtonElement.classList.add('hidden');
  countCommentsElement.classList.remove('hidden');

  renderFullPhoto(info);

  lastComments = checkAllComments(info.comments, info.comments.length);

  onMoreLoaderClick = () => {
    lastComments = checkAllComments(lastComments, info.comments.length);
  };

  loaderCommentsButtonElement.addEventListener('click', onMoreLoaderClick);

  closeModalButtonElement.addEventListener('click', onModalCloseButtonClick);
  document.addEventListener('keydown', onModalEscapeKeydown);
};

export {openModal};
