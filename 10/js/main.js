import {showAlert} from './util.js';
import {renderPhotos} from './picture.js';
import {uploadPhoto, closeFormModal} from './form.js';
import {getData} from './api.js';

getData(
  (photos) => {
    renderPhotos(photos);
  },
  () => {
    showAlert('Не удалось получить данные с сервера. Попробуйте обновить страницу');
  }
);

uploadPhoto(closeFormModal);
