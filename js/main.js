import { renderThumbnails } from './render-thumbnails.js';
import { getPhotos } from './data.js';
import './form.js';

const photos = getPhotos();

renderThumbnails(photos);
