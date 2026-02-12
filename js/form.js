const MAX_HASHTAG_COUNT = 5;
const MAX_COMMENT_LENGTH = 140;
const SCALE_STEP = 25;
const SCALE_MIN = 25;
const SCALE_MAX = 100;
const DEFAULT_SCALE = 100;

const EFFECTS = {
  none: null,
  chrome: {
    min: 0,
    max: 1,
    step: 0.1,
    filter: 'grayscale',
    unit: ''
  },
  sepia: {
    min: 0,
    max: 1,
    step: 0.1,
    filter: 'sepia',
    unit: ''
  },
  marvin: {
    min: 0,
    max: 100,
    step: 1,
    filter: 'invert',
    unit: '%'
  },
  phobos: {
    min: 0,
    max: 3,
    step: 0.1,
    filter: 'blur',
    unit: 'px'
  },
  heat: {
    min: 1,
    max: 3,
    step: 0.1,
    filter: 'brightness',
    unit: ''
  }
};

const formElement = document.querySelector('.img-upload__form');
const overlayElement = document.querySelector('.img-upload__overlay');
const bodyElement = document.body;
const fileInputElement = document.querySelector('.img-upload__input');
const cancelButtonElement = document.querySelector('.img-upload__cancel');
const hashtagInputElement = document.querySelector('.text__hashtags');
const commentInputElement = document.querySelector('.text__description');
const scaleSmallerButtonElement = document.querySelector('.scale__control--smaller');
const scaleBiggerButtonElement = document.querySelector('.scale__control--bigger');
const scaleControlValueElement = document.querySelector('.scale__control--value');
const effectsElement = document.querySelector('.img-upload__effects');
const effectLevelElement = document.querySelector('.img-upload__effect-level');
const effectValueElement = document.querySelector('.effect-level__value');
const effectSliderElement = document.querySelector('.effect-level__slider');
const previewImageElement = document.querySelector('.img-upload__preview img');

let currentEffect = 'none';

noUiSlider.create(effectSliderElement, {
  range: {
    min: 0,
    max: 1
  },
  start: 1,
  step: 0.1,
  connect: 'lower'
});

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

const setImageScale = (scaleValue) => {
  scaleControlValueElement.value = `${scaleValue}%`;
  previewImageElement.style.transform = `scale(${scaleValue / 100})`;
};

const changeImageScale = (step) => {
  const currentScale = parseInt(scaleControlValueElement.value, 10);
  const newScale = Math.min(SCALE_MAX, Math.max(SCALE_MIN, currentScale + step));
  setImageScale(newScale);
};

const hideEffectSlider = () => {
  effectLevelElement.classList.add('hidden');
};

const showEffectSlider = () => {
  effectLevelElement.classList.remove('hidden');
};

const clearImageEffect = () => {
  previewImageElement.style.filter = '';
  effectValueElement.value = '';
};

const applyImageEffect = (value) => {
  if (currentEffect === 'none') {
    clearImageEffect();
    return;
  }

  const { filter, unit } = EFFECTS[currentEffect];
  const effectLevel = Number(value);

  previewImageElement.style.filter = `${filter}(${effectLevel}${unit})`;
  effectValueElement.value = effectLevel;
};

const updateSliderOptions = ({ min, max, step }) => {
  effectSliderElement.noUiSlider.updateOptions({
    range: {
      min,
      max
    },
    step
  });

  effectSliderElement.noUiSlider.set(max);
};

const setImageEffect = (effectName) => {
  currentEffect = effectName;

  if (effectName === 'none') {
    hideEffectSlider();
    clearImageEffect();
    return;
  }

  showEffectSlider();
  updateSliderOptions(EFFECTS[effectName]);
};

const resetEditor = () => {
  setImageScale(DEFAULT_SCALE);
  setImageEffect('none');
};

const resetForm = () => {
  formElement.reset();
  pristine.reset();
  resetEditor();
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

const onScaleSmallerButtonClick = () => {
  changeImageScale(-SCALE_STEP);
};

const onScaleBiggerButtonClick = () => {
  changeImageScale(SCALE_STEP);
};

const onEffectsChange = (evt) => {
  if (!evt.target.classList.contains('effects__radio')) {
    return;
  }

  setImageEffect(evt.target.value);
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

effectSliderElement.noUiSlider.on('update', (values, handle) => {
  applyImageEffect(values[handle]);
});

fileInputElement.addEventListener('change', onFileInputChange);
cancelButtonElement.addEventListener('click', onCancelButtonClick);
formElement.addEventListener('submit', onFormSubmit);
scaleSmallerButtonElement.addEventListener('click', onScaleSmallerButtonClick);
scaleBiggerButtonElement.addEventListener('click', onScaleBiggerButtonClick);
effectsElement.addEventListener('change', onEffectsChange);

hashtagInputElement.addEventListener('keydown', onFieldKeydown);
commentInputElement.addEventListener('keydown', onFieldKeydown);

resetEditor();
