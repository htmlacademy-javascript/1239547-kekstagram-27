const body = document.body;
const pictureModal = document.querySelector('.big-picture');
const closeModalButton = pictureModal.querySelector('.big-picture__cancel');
const allComments = document.querySelector('.social__comments');

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
  allComments.innerHTML = '';
  allComments.append(...comments.map(renderComment));
};

const renderFullPhoto = ({url, likes, comments, description}) => {
  pictureModal.querySelector('.big-picture__img img').src = url;
  pictureModal.querySelector('.likes-count').textContent = likes;
  pictureModal.querySelector('.comments-count').textContent = comments.length;
  pictureModal.querySelector('.social__caption').textContent = description;
};

const openModal = ({url, likes, comments, description}) => {
  const info = {url, likes, comments, description};

  body.classList.add('modal-open');
  pictureModal.classList.remove('hidden');
  pictureModal.querySelector('.social__comment-count').classList.add('hidden');
  pictureModal.querySelector('.comments-loader').classList.add('hidden');

  renderFullPhoto(info);
  renderComments(info.comments);

  closeModalButton.addEventListener('click', () => {
    closeModal();
  });
  document.addEventListener('keydown', (evt) => {
    if (evt.keyCode === 27) {
      closeModal();
    }
  });
};

export {openModal};
