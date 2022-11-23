import {isEscapeKey} from './util.js';
import {loadPictureScaleControl, cleanScale} from './scale.js';
import {loadPictureEffectsControl, cleanEffect} from './effect.js';
import {sendData} from './api.js';
import {checkTypeMessage, openMessage} from './message.js';

const HASHTAG = /^(#[a-zа-яё0-9]{1,19}){0,20}$/i;
const SUCCESS_TYPE_MESSAGE = 'success';
const ERROR_TYPE_MESSAGE = 'error';

const body = document.body;
const uploadFormElement = document.querySelector('#upload-select-image');
const uploadModalElement = document.querySelector('.img-upload__overlay');
const filePhotoElement = uploadFormElement.querySelector('#upload-file');
const closeFormModalButtonElement = uploadModalElement.querySelector('#upload-cancel');
const hashtagElement = uploadFormElement.querySelector('.text__hashtags');
const commentElement = uploadFormElement.querySelector('.text__description');
const submitButtonElement = uploadFormElement.querySelector('.img-upload__submit');

const pristine = new Pristine(uploadFormElement, {
  classTo: 'img-upload__field-wrapper',
  errorTextParent: 'img-upload__field-wrapper',
  errorTextClass: 'img-upload__field-wrapper-error',
}, false);

const validateHashtag = (value) => HASHTAG.test(value);

const matchHashtags = (value) => {
  const lowerHashtags = value.map((elem) => elem.toLowerCase());
  return lowerHashtags.filter((elem, index, elems) => elems.indexOf(elem) !== index);
};

const validateHashtags = (value) => {
  const hashtags = value.trim().split(/\s+/);
  return hashtags.every(validateHashtag) && hashtags.length <= 5 && matchHashtags(hashtags).length === 0;
};

const validateComment = (value) => value.length <= 140;

const closeFormModal = () => {
  body.classList.remove('modal-open');
  uploadModalElement.classList.add('hidden');
  uploadFormElement.reset();
  cleanScale();
  cleanEffect();
};

const onModalEscapeKeydown = (evt) => {
  if (isEscapeKey(evt) && document.activeElement !== commentElement && document.activeElement !== hashtagElement && !checkTypeMessage()) {
    closeFormModal();
    uploadFormElement.reset();
    document.removeEventListener('keydown', onModalEscapeKeydown);
  }
};

const openFormModal = () => {
  body.classList.add('modal-open');
  uploadModalElement.classList.remove('hidden');

  loadPictureScaleControl();
  loadPictureEffectsControl();

  closeFormModalButtonElement.addEventListener('click', () => {
    closeFormModal();
    uploadFormElement.reset();
  });

  document.addEventListener('keydown', onModalEscapeKeydown);
};

const blockSubmitButton = () => {
  submitButtonElement.disabled = true;
};

const unblockSubmitButton = () => {
  submitButtonElement.disabled = false;
};

const uploadPhoto = () => {
  filePhotoElement.addEventListener('change', () => {
    openFormModal();
  });

  uploadFormElement.addEventListener('submit', (evt) => {
    evt.preventDefault();
    const isValid = pristine.validate();
    if (isValid) {
      blockSubmitButton();
      sendData(
        () => {
          closeFormModal();
          unblockSubmitButton();
          openMessage(SUCCESS_TYPE_MESSAGE);
        },
        () => {
          unblockSubmitButton();
          openMessage(ERROR_TYPE_MESSAGE);
        },
        new FormData(evt.target),
      );
    }
  });
};

pristine.addValidator(hashtagElement, validateHashtags, 'Длина до 20 символов, используются буквы и цифры, до 5 хэштегов');
pristine.addValidator(commentElement, validateComment, 'Максимальная длина 140 символов');

export {uploadPhoto, closeFormModal};
