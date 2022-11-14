const HASHTAG = /^#[a-zа-яё0-9]{1,19}/i;

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
  const hashtags = value.trim().split(' ');
  return hashtags.every(validateHashtag) && hashtags.length <= 5 && hashtagsMatch(hashtags).length === 0;
};

pristine.addValidator(hashtag, validateHashtags, 'Длина до 20 символов, используются буквы и цифры, до 5 хэштегов');

const validateComment = (value) => value.length <= 140;

pristine.addValidator(comment, validateComment, 'Максимальная длина 140 символов');


const closeModal = () => {
  body.classList.remove('modal-open');
  uploadModal.classList.add('hidden');
};

const openModal = () => {
  body.classList.add('modal-open');
  uploadModal.classList.remove('hidden');

  closeModalButton.addEventListener('click', () => {
    closeModal();
    uploadForm.reset();
  });

  document.addEventListener('keydown', (evt) => {
    if (evt.keyCode === 27 && document.activeElement !== comment && document.activeElement !== hashtag) {
      closeModal();
      uploadForm.reset();
    }
  });
};

const uploadPhoto = () => {
  openModal(uploadModal, closeModalButton);

  uploadForm.addEventListener('submit', (evt) => {
    evt.preventDefault();
    const isValid = pristine.validate();
    if (isValid) {
      uploadForm.reset();
      closeModal(uploadModal);
    }
  });
};

export {uploadPhoto};
