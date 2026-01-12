import { openBigPicture } from './big-picture.js';

const picturesContainerElement = document.querySelector('.pictures');
const pictureTemplateElement = document.querySelector('#picture').content.querySelector('.picture');

const createThumbnail = ({ url, description, likes, comments }) => {
  const thumbnail = pictureTemplateElement.cloneNode(true);

  const thumbnailImageElement = thumbnail.querySelector('.picture__img');
  thumbnailImageElement.src = url;
  thumbnailImageElement.alt = description;

  thumbnail.querySelector('.picture__likes').textContent = likes;
  thumbnail.querySelector('.picture__comments').textContent = comments.length;

  return thumbnail;
};

const renderThumbnails = (photos) => {
  const oldThumbnails = picturesContainerElement.querySelectorAll('.picture');
  oldThumbnails.forEach((thumbnail) => thumbnail.remove());

  const fragment = document.createDocumentFragment();

  photos.forEach((photo) => {
    const thumbnail = createThumbnail(photo);
    thumbnail.addEventListener('click', (evt) => {
      evt.preventDefault();
      openBigPicture(photo);
    });
    fragment.appendChild(thumbnail);
  });

  picturesContainerElement.appendChild(fragment);
};

export { renderThumbnails };
