import {createPhotos} from './data.js';
import {renderPhotos} from './picture.js';
import {uploadPhoto} from './form.js';

const photos = createPhotos();
renderPhotos(photos);

uploadPhoto();
