
import {isEscapeKey} from './util.js';

const successMessageTemplate = document.querySelector('#success').content.querySelector('.success');
const errorMessageTemplate = document.querySelector('#error').content.querySelector('.error');

const checkTypeMessage = () => document.querySelector('.success, .error');

const closeMessage = () => {
  const messageElement = checkTypeMessage();
  if (messageElement) {
    messageElement.remove();
  }
};

const onMessageEscapeKeydown = (evt) => {
  if (isEscapeKey(evt) && checkTypeMessage()) {
    evt.preventDefault();
    document.removeEventListener('keydown', onMessageEscapeKeydown);
    closeMessage();
  }
};

const onOutsideMessage = (evt) => {
  const messageElement = checkTypeMessage();

  if (messageElement && messageElement.contains(evt.target)) {
    document.removeEventListener('click', onOutsideMessage);
    closeMessage();
  }
};

const openMessage = (typeMessage) => {
  const message = typeMessage === 'success' ? successMessageTemplate.cloneNode(true) : errorMessageTemplate.cloneNode(true);
  const messageButton = message.querySelector(`.${typeMessage}__button`);
  document.body.append(message);

  messageButton.addEventListener('click', () => {
    closeMessage();
  });

  document.addEventListener('keydown', onMessageEscapeKeydown);
  document.addEventListener('click', onOutsideMessage);
};

export {checkTypeMessage, openMessage};
