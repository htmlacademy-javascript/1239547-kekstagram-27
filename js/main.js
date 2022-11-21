import {showAlert, debounce} from './util.js';
import {renderPhotos} from './picture.js';
import {uploadPhoto} from './form.js';
import {getData} from './api.js';
import {showFilter, changeFilter} from './filter.js';

const RERENDER_DELAY = 500;

getData((photos) => {
  renderPhotos(photos);
  showFilter();
  changeFilter(debounce(
    () => renderPhotos(photos),
    RERENDER_DELAY,
  ));
}, showAlert);

uploadPhoto();
