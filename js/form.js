import {isEscapeKey} from './util.js';
import {loadPictureScaleControl, cleanScale} from './scale.js';
import {loadPictureEffectsControl, cleanEffect} from './effect.js';
import {sendData} from './api.js';

import {checkTypeMessage, openMessage} from './message.js';

const HASHTAG = /^#[a-zа-яё0-9]{1,19}$/i;
const SUCCESS_TYPE_MESSAGE = 'success';
const ERROR_TYPE_MESSAGE = 'error';

const body = document.body;
const uploadForm = document.querySelector('#upload-select-image');
const uploadModal = document.querySelector('.img-upload__overlay');
const filePhoto = uploadForm.querySelector('#upload-file');
const closeFormModalButton = uploadModal.querySelector('#upload-cancel');
const hashtag = uploadForm.querySelector('.text__hashtags');
const comment = uploadForm.querySelector('.text__description');
const submitButton = uploadForm.querySelector('.img-upload__submit');

const pristine = new Pristine(uploadForm, {
  classTo: 'img-upload__field-wrapper',
  errorTextParent: 'img-upload__field-wrapper',
  errorTextClass: 'img-upload__field-wrapper-error',
}, false);

const validateHashtag = (value) => HASHTAG.test(value);

const hashtagsMatch = (value) => {
  const lowerHashtags = value.map((elem) => elem.toLowerCase());
  return lowerHashtags.filter((elem, index, elems) => elems.indexOf(elem) !== index);
};

const validateHashtags = (value) => {
  const hashtags = value.trim().split(/\s+/);
  return hashtags.every(validateHashtag) && hashtags.length <= 5 && hashtagsMatch(hashtags).length === 0;
};

const validateComment = (value) => value.length <= 140;

const closeFormModal = () => {
  body.classList.remove('modal-open');
  uploadModal.classList.add('hidden');
  uploadForm.reset();
  cleanScale();
  cleanEffect();
};

const onModalEscapeKeydown = (evt) => {
  if (isEscapeKey(evt) && document.activeElement !== comment && document.activeElement !== hashtag && !checkTypeMessage()) {
    closeFormModal();
    uploadForm.reset();
    document.removeEventListener('keydown', onModalEscapeKeydown);
  }
};

const openFormModal = () => {
  body.classList.add('modal-open');
  uploadModal.classList.remove('hidden');

  loadPictureScaleControl();
  loadPictureEffectsControl();

  closeFormModalButton.addEventListener('click', () => {
    closeFormModal();
    uploadForm.reset();
  });

  document.addEventListener('keydown', onModalEscapeKeydown);
};

const blockSubmitButton = () => {
  submitButton.disabled = true;
};

const unblockSubmitButton = () => {
  submitButton.disabled = false;
};

const uploadPhoto = () => {

  filePhoto.addEventListener('change', () => {
    openFormModal();
  });

  uploadForm.addEventListener('submit', (evt) => {
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

pristine.addValidator(hashtag, validateHashtags, 'Длина до 20 символов, используются буквы и цифры, до 5 хэштегов');
pristine.addValidator(comment, validateComment, 'Максимальная длина 140 символов');

export {uploadPhoto, closeFormModal};
