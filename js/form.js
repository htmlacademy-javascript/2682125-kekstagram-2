const MAX_HASHTAG_COUNT = 5;
const MAX_COMMENT_LENGTH = 140;

const formElement = document.querySelector('.img-upload__form');
const overlayElement = document.querySelector('.img-upload__overlay');
const bodyElement = document.body;
const fileInputElement = document.querySelector('.img-upload__input');
const cancelButtonElement = document.querySelector('.img-upload__cancel');
const hashtagInputElement = document.querySelector('.text__hashtags');
const commentInputElement = document.querySelector('.text__description');

const pristine = new Pristine(formElement, {
  classTo: 'img-upload__field-wrapper',
  errorClass: 'img-upload__field-wrapper--error',
  errorTextParent: 'img-upload__field-wrapper',
  errorTextTag: 'div',
  errorTextClass: 'pristine-error'
});

const normalizeHashtags = (value) => value.trim().split(/\s+/).filter((tag) => tag.length > 0);

const validateHashtagFormat = (value) => {
  if (!value.trim()) {
    return true;
  }

  const hashtags = normalizeHashtags(value);
  const hashtagRegex = /^#[a-zа-яё0-9]{1,19}$/i;
  return hashtags.every((tag) => hashtagRegex.test(tag));
};

const validateHashtagCount = (value) => {
  if (!value.trim()) {
    return true;
  }

  const hashtags = normalizeHashtags(value);
  return hashtags.length <= MAX_HASHTAG_COUNT;
};

const validateHashtagUniqueness = (value) => {
  if (!value.trim()) {
    return true;
  }

  const hashtags = normalizeHashtags(value);
  const lowerCaseHashtags = hashtags.map((tag) => tag.toLowerCase());
  const uniqueHashtags = new Set(lowerCaseHashtags);

  return uniqueHashtags.size === hashtags.length;
};

const validateCommentLength = (value) => value.length <= MAX_COMMENT_LENGTH;

pristine.addValidator(
  hashtagInputElement,
  validateHashtagFormat,
  'Неправильный хэштег'
);

pristine.addValidator(
  hashtagInputElement,
  validateHashtagCount,
  `Превышено количество хэштегов (максимум ${MAX_HASHTAG_COUNT})`
);

pristine.addValidator(
  hashtagInputElement,
  validateHashtagUniqueness,
  'Хэштеги повторяются'
);

pristine.addValidator(
  commentInputElement,
  validateCommentLength,
  `Длина комментария больше ${MAX_COMMENT_LENGTH} символов`
);

const resetForm = () => {
  formElement.reset();
  pristine.reset();
};

const closeForm = () => {
  overlayElement.classList.add('hidden');
  bodyElement.classList.remove('modal-open');
  document.removeEventListener('keydown', onDocumentKeydown);
  resetForm();
};

function onDocumentKeydown(evt) {
  if (evt.key === 'Escape') {
    evt.preventDefault();
    closeForm();
  }
}

const onFieldKeydown = (evt) => {
  if (evt.key === 'Escape') {
    evt.stopPropagation();
  }
};

const openForm = () => {
  overlayElement.classList.remove('hidden');
  bodyElement.classList.add('modal-open');
  document.addEventListener('keydown', onDocumentKeydown);
};

const onFileInputChange = () => {
  openForm();
};

const onCancelButtonClick = () => {
  closeForm();
};

const onFormSubmit = (evt) => {
  evt.preventDefault();

  const isValid = pristine.validate();

  if (isValid) {
    formElement.submit();
  }
};

fileInputElement.addEventListener('change', onFileInputChange);
cancelButtonElement.addEventListener('click', onCancelButtonClick);
formElement.addEventListener('submit', onFormSubmit);

hashtagInputElement.addEventListener('keydown', onFieldKeydown);
commentInputElement.addEventListener('keydown', onFieldKeydown);
