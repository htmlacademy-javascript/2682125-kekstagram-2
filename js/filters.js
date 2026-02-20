import { renderThumbnails } from './render-thumbnails.js';
import { debounce, getRandomInteger } from './util.js';

const RANDOM_PHOTOS_COUNT = 10;
const RERENDER_DELAY = 500;

const Filter = {
  DEFAULT: 'filter-default',
  RANDOM: 'filter-random',
  DISCUSSED: 'filter-discussed',
};

const filtersContainerElement = document.querySelector('.img-filters');
const filtersFormElement = document.querySelector('.img-filters__form');

let currentFilter = Filter.DEFAULT;
let activeFilterButton = null;
let photos = [];

const getRandomPhotos = (items) => {
  const randomPhotos = [];
  const photosCopy = items.slice();

  for (let i = 0; i < Math.min(RANDOM_PHOTOS_COUNT, photosCopy.length); i++) {
    const randomIndex = getRandomInteger(0, photosCopy.length - 1);
    randomPhotos.push(photosCopy[randomIndex]);
    photosCopy.splice(randomIndex, 1);
  }

  return randomPhotos;
};

const getDiscussedPhotos = (items) =>
  items.slice().sort((a, b) => b.comments.length - a.comments.length);

const getFilteredPhotos = () => {
  switch (currentFilter) {
    case Filter.RANDOM:
      return getRandomPhotos(photos);
    case Filter.DISCUSSED:
      return getDiscussedPhotos(photos);
    default:
      return photos;
  }
};

const updatePhotos = () => {
  const filteredPhotos = getFilteredPhotos();
  renderThumbnails(filteredPhotos);
};

const debouncedUpdatePhotos = debounce(updatePhotos, RERENDER_DELAY);

const onFilterClick = (evt) => {
  if (!evt.target.classList.contains('img-filters__button')) {
    return;
  }

  const clickedButton = evt.target;
  if (clickedButton.id === currentFilter) {
    return;
  }

  if (activeFilterButton) {
    activeFilterButton.classList.remove('img-filters__button--active');
  }
  clickedButton.classList.add('img-filters__button--active');
  activeFilterButton = clickedButton;
  currentFilter = clickedButton.id;
  debouncedUpdatePhotos();
};

const initFilters = (loadedPhotos) => {
  photos = loadedPhotos.slice();
  filtersContainerElement.classList.remove('img-filters--inactive');
  activeFilterButton = filtersFormElement.querySelector('.img-filters__button--active');
  filtersFormElement.addEventListener('click', onFilterClick);
};

export { initFilters };
