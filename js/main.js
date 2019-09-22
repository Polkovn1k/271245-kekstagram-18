'use strict';

var entity = [];
var ENTITY_LIMIT = 25;
var AVATARS_COUNT = 6;
var LIKES_SPREAD = {
  min: 15,
  max: 200,
};
var COMMENTS_I_DESCR_SPREAD = {
  min: 1,
  max: 3,
};
var descriptionMock = [
  'Очень красивый снимок.',
  'Красивая фотография!',
  'Хороший снимок!',
  'Какое-то описание №1.',
  'Это фотография.',
  'Тут что-то происходит.',
  'Какое-то описание №2.',
  'Хороший кадр!',
];
var commentsMock = [
  'Всё отлично!',
  'В целом всё неплохо. Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!',
];
var names = [
  'Гриша',
  'Андрюша',
  'Костик',
  'Жармейн Де Ран Дами',
  'Алсу',
  'Майкл',
  'Ахмед',
  'Ашот',
  'Никита',
  'Маруся',
];

var getRandomNum = function (max, min) {
  if (min === undefined) {
    min = 0;
  }
  return Math.floor(Math.random() * (max - min)) + min;
};

var makeEntity = function (imgName) {
  var tempObj = {
    url: 'photos/' + imgName + '.jpg',
    description: setTextProp(descriptionMock),
    likes: setLikes(LIKES_SPREAD.max, LIKES_SPREAD.min),
    comments: setCommentsArray(),
  };
  return tempObj;
};

var pushEntityToArray = function (entityArr) {
  for (var j = 1; j <= ENTITY_LIMIT; j++) {
    entityArr.push(makeEntity(j));
  }
};

var setTextProp = function (textArray) {
  var length = textArray.length;
  return textArray[getRandomNum(length)].trim();
};

var setCommentsArray = function () {
  var tempArray = [];
  for (var a = 0; a <= getRandomNum(COMMENTS_I_DESCR_SPREAD.max); a++) {
    var comentEntity = {
      avatar: 'img/avatar-' + getRandomNum(AVATARS_COUNT, 1) + '.svg',
      message: setTextProp(commentsMock),
      name: setTextProp(names),
    };
    tempArray.push(comentEntity);
  }
  return tempArray;
};

var setLikes = function (max, min) {
  return getRandomNum(max, min);
};

pushEntityToArray(entity);

var similarPhotoTemplate = document.querySelector('#picture').content.querySelector('.picture');
var fragment = document.createDocumentFragment();

var renderPhoto = function (photoArr) {
  var photoElement = similarPhotoTemplate.cloneNode(true);
  photoElement.querySelector('.picture__img').src = photoArr.url;
  photoElement.querySelector('.picture__likes').textContent = photoArr.likes;
  photoElement.querySelector('.picture__comments').textContent = photoArr.comments.length;
  return photoElement;
};

for (var e = 0; e < entity.length; e++) {
  fragment.appendChild(renderPhoto(entity[e]));
}

document.querySelector('.pictures').appendChild(fragment);
