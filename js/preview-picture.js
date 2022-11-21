const FILE_TYPES = ['jpg', 'jpeg', 'png'];

const uploadedPhoto = document.querySelector('.img-upload__form input[type=file]');
const preview = document.querySelector('.img-upload__preview img');

uploadedPhoto.addEventListener('change', () => {
  const filePhoto = uploadedPhoto.files[0];
  const filePhotoName = filePhoto.name.toLowerCase();

  const matches = FILE_TYPES.some((it) => filePhotoName.endsWith(it));

  if (matches) {
    preview.src = URL.createObjectURL(filePhoto);
  }
});
