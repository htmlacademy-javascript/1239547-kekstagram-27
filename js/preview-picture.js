const FILE_TYPES = ['jpg', 'jpeg', 'png'];

const uploadedPhotoElement = document.querySelector('.img-upload__form input[type=file]');
const previewElement = document.querySelector('.img-upload__preview img');

uploadedPhotoElement.addEventListener('change', () => {
  const filePhoto = uploadedPhotoElement.files[0];
  const filePhotoName = filePhoto.name.toLowerCase();

  const matches = FILE_TYPES.some((it) => filePhotoName.endsWith(it));

  if (matches) {
    previewElement.src = URL.createObjectURL(filePhoto);
  }
});
