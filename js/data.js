import { getRandomInteger, getRandomArrayElement } from './util.js';

const NAMES = [
  'Иван',
  'Хуан Себастьян',
  'Мария',
  'Кристоф',
  'Виктор',
  'Юлия',
  'Люпита',
  'Вашингтон',
];

const DESCRIPTIONS = [
  'Прекрасный день на природе',
  'Закат над морем',
  'Городские пейзажи',
  'Вкусный ужин',
  'Встреча с друзьями',
  'Путешествие по горам',
  'Летние каникулы',
  'Новое приключение',
  'Момент счастья',
  'Красота природы',
  'Незабываемые впечатления',
  'Утренний кофе',
  'Вечерняя прогулка',
  'Особенный момент',
  'Яркие эмоции',
  'Любимое место',
  'Солнечный день',
  'Время отдыха',
  'Вдохновение дня',
  'Красивый вид',
  'Атмосфера уюта',
  'Позитивные моменты',
  'Жизнь прекрасна',
  'Новые открытия',
  'Магия момента'
];

const MESSAGES = [
  'Всё отлично!',
  'В целом всё неплохо. Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'
];

const PHOTOS_COUNT = 25;

const createMessage = () => {
  const message1 = getRandomArrayElement(MESSAGES);
  const message2 = getRandomArrayElement(MESSAGES);
  return getRandomInteger(1, 2) === 1 ? message1 : `${message1} ${message2}`;
};

let commentIdCounter = 1;

const createComment = () => ({
  id: commentIdCounter++,
  avatar: `img/avatar-${getRandomInteger(1, 6)}.svg`,
  message: createMessage(),
  name: getRandomArrayElement(NAMES),
});

const createPhoto = (index) => ({
  id: index,
  url: `photos/${index}.jpg`,
  description: getRandomArrayElement(DESCRIPTIONS),
  likes: getRandomInteger(15, 200),
  comments: Array.from({length: getRandomInteger(0, 30)}, createComment),
});

const getPhotos = () => Array.from({length: PHOTOS_COUNT}, (_, index) => createPhoto(index + 1));

export { getPhotos };

