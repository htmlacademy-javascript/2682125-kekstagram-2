import { renderThumbnails } from './render-thumbnails.js';
import { getData } from './api.js';
import { initFilters } from './filters.js';
import './form.js';

const showDataError = () => {
  const template = document.querySelector('#data-error').content.querySelector('.data-error');
  const errorElement = template.cloneNode(true);

  document.body.append(errorElement);

  setTimeout(() => {
    errorElement.remove();
  }, 5000);
};

const init = async () => {
  try {
    const photos = await getData();
    renderThumbnails(photos);
    initFilters(photos);
  } catch (err) {
    showDataError();
  }
};

init();
