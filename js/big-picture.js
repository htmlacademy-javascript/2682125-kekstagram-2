const bigPictureElement = document.querySelector('.big-picture');
const bigPictureImgElement = bigPictureElement.querySelector('.big-picture__img img');
const likesCountElement = bigPictureElement.querySelector('.likes-count');
const commentShownCountElement = bigPictureElement.querySelector('.social__comment-shown-count');
const commentTotalCountElement = bigPictureElement.querySelector('.social__comment-total-count');
const commentsContainerElement = bigPictureElement.querySelector('.social__comments');
const socialCaptionElement = bigPictureElement.querySelector('.social__caption');
const commentCountElement = bigPictureElement.querySelector('.social__comment-count');
const commentsLoaderElement = bigPictureElement.querySelector('.comments-loader');
const bigPictureCancelElement = bigPictureElement.querySelector('.big-picture__cancel');

const createComment = ({ avatar, name, message }) => {
  const comment = document.createElement('li');
  comment.classList.add('social__comment');

  const img = document.createElement('img');
  img.classList.add('social__picture');
  img.src = avatar;
  img.alt = name;
  img.width = 35;
  img.height = 35;

  const text = document.createElement('p');
  text.classList.add('social__text');
  text.textContent = message;

  comment.appendChild(img);
  comment.appendChild(text);

  return comment;
};

const renderComments = (comments) => {
  commentsContainerElement.innerHTML = '';
  const fragment = document.createDocumentFragment();

  comments.forEach((comment) => {
    const commentElement = createComment(comment);
    fragment.appendChild(commentElement);
  });

  commentsContainerElement.appendChild(fragment);
};

function closeBigPicture() {
  bigPictureElement.classList.add('hidden');
  document.body.classList.remove('modal-open');
  document.removeEventListener('keydown', onDocumentKeydown);

  bigPictureImgElement.src = '';
  bigPictureImgElement.alt = '';
  likesCountElement.textContent = '';
  commentTotalCountElement.textContent = '';
  commentShownCountElement.textContent = '';
  socialCaptionElement.textContent = '';
  commentsContainerElement.innerHTML = '';
}

function onDocumentKeydown(evt) {
  if (evt.key === 'Escape') {
    evt.preventDefault();
    closeBigPicture();
  }
}

const onCancelButtonClick = () => {
  closeBigPicture();
};

const openBigPicture = ({ url, description, likes, comments }) => {
  bigPictureElement.classList.remove('hidden');
  document.body.classList.add('modal-open');

  bigPictureImgElement.src = url;
  bigPictureImgElement.alt = description;
  likesCountElement.textContent = likes;
  commentTotalCountElement.textContent = comments.length;
  commentShownCountElement.textContent = comments.length;
  socialCaptionElement.textContent = description;

  renderComments(comments);

  commentCountElement.classList.add('hidden');
  commentsLoaderElement.classList.add('hidden');

  document.addEventListener('keydown', onDocumentKeydown);
};

bigPictureCancelElement.addEventListener('click', onCancelButtonClick);

export { openBigPicture };
