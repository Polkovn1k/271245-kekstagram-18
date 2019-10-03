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
  return textArray[window.utils.getRandomNum(length)].trim();
};

var setCommentsArray = function () {
  var tempArray = [];
  for (var a = 0; a <= window.utils.getRandomNum(COMMENTS_I_DESCR_SPREAD.max); a++) {
    var comentEntity = {
      avatar: 'img/avatar-' + window.utils.getRandomNum(AVATARS_COUNT, 1) + '.svg',
      message: setTextProp(commentsMock),
      name: setTextProp(names),
    };
    tempArray.push(comentEntity);
  }
  return tempArray;
};

var setLikes = function (max, min) {
  return window.utils.getRandomNum(max, min);
};

pushEntityToArray(entity);

var similarPhotoTemplate = document.querySelector('#picture').content.querySelector('.picture');

var renderPhoto = function (photoArr) {
  var photoElement = similarPhotoTemplate.cloneNode(true);
  photoElement.querySelector('.picture__img').src = photoArr.url;
  photoElement.querySelector('.picture__likes').textContent = photoArr.likes;
  photoElement.querySelector('.picture__comments').textContent = photoArr.comments.length;
  return photoElement;
};

var picturesContainer = document.querySelector('.pictures');
var appendPhotos = function (arr) {
  var fragment = document.createDocumentFragment();
  for (var i = 0; i < arr.length; i++) {
    fragment.appendChild(renderPhoto(arr[i]));
  }
  picturesContainer.appendChild(fragment);
};
appendPhotos(entity);

var photoBlock = document.querySelector('.big-picture');
var commentBlock = document.querySelector('#photo').content.querySelector('.social__comment');

var length = entity.length;
var elementFromArr = window.utils.getRandomNum(length);

var renderComments = function (commentsArr) {
  var nodeElement = commentBlock.cloneNode(true);
  var img = nodeElement.querySelector('.social__picture');
  img.src = commentsArr.avatar;
  img.alt = commentsArr.name;
  nodeElement.querySelector('.social__text').textContent = commentsArr.message;
  return nodeElement;
};

var socialComments = document.querySelector('.social__comments');
var appendComments = function (nodeElements) {
  var fragment = document.createDocumentFragment();
  for (var i = 0; i < nodeElements.length; i++) {
    fragment.appendChild(renderComments(nodeElements[i]));
  }
  socialComments.appendChild(fragment);
};

var renderBigPhoto = function (photo) {
  photoBlock.querySelector('.big-picture__img').src = photo.url;
  photoBlock.querySelector('.big-picture__img').src = photo.url;
  photoBlock.querySelector('.likes-count').textContent = photo.likes;
  photoBlock.querySelector('.social__caption').textContent = photo.description;
  photoBlock.querySelector('.comments-count').textContent = photo.comments.length;
  appendComments(photo.comments);
};

renderBigPhoto(entity[elementFromArr]);

document.querySelector('.social__comment-count').classList.add('visually-hidden');
document.querySelector('.comments-loader').classList.add('visually-hidden');

var uploadInputLabel = document.querySelector('.img-upload__label');

uploadInputLabel.addEventListener('keydown', function (evt) {
  if (evt.keyCode === window.data.KEY_CODE_ENTER) {
    window.utils.openImgUploadOverlay();
  }
});

window.data.uploadOverlayClose.addEventListener('keydown', function (evt) {
  if (evt.keyCode === window.data.KEY_CODE_ENTER) {
    window.utils.closeImgUploadOverlay();
  }
});
