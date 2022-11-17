import {isEscapeKey} from './util.js';
import {loadPictureScaleControl} from './scale.js';

import {loadPictureEffectsControl} from './effect.js';

const HASHTAG = /^#[a-zа-яё0-9]{1,19}$/i;

const body = document.body;
const uploadForm = document.querySelector('#upload-select-image');
const uploadModal = document.querySelector('.img-upload__overlay');
const closeModalButton = uploadModal.querySelector('#upload-cancel');
const hashtag = uploadForm.querySelector('.text__hashtags');
const comment = uploadForm.querySelector('.text__description');


const pristine = new Pristine(uploadForm, {
  classTo: 'img-upload__field-wrapper',
  errorTextParent: 'img-upload__field-wrapper',
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

const closeModal = () => {
  body.classList.remove('modal-open');
  uploadModal.classList.add('hidden');
};

const openModal = () => {
  body.classList.add('modal-open');
  uploadModal.classList.remove('hidden');

  loadPictureScaleControl();
  loadPictureEffectsControl();

  closeModalButton.addEventListener('click', () => {
    closeModal();
    uploadForm.reset();
  });

  document.addEventListener('keydown', (evt) => {
    if (isEscapeKey(evt) && document.activeElement !== comment && document.activeElement !== hashtag) {
      closeModal();
      uploadForm.reset();
    }
  });
};

const uploadPhoto = () => {
  openModal();

  uploadForm.addEventListener('submit', (evt) => {
    evt.preventDefault();
    const isValid = pristine.validate();
    if (isValid) {
      uploadForm.reset();
      closeModal();
    }
  });
};

pristine.addValidator(hashtag, validateHashtags, 'Длина до 20 символов, используются буквы и цифры, до 5 хэштегов');
pristine.addValidator(comment, validateComment, 'Максимальная длина 140 символов');

export {uploadPhoto};
