'use strict';

var entity = [];
var ENTITY_LIMIT = 25;
var LIKES_SPREAD = {
  min: 15,
  max: 200,
};
var COMMENTS_I_DESCR_SPREAD = {
  min: 1,
  max: 3,
};
var descriptionMock = [
  'Очень красивый снимок. ',
  'Красивая фотография! ',
  'Хороший снимок! ',
  'Какое-то описание №1. ',
  'Это фотография. ',
  'Тут что-то происходит. ',
  'Какое-то описание №2. ',
  'Хороший кадр! ',
];
var commentsMock = [
  'Всё отлично!',
  'В целом всё неплохо. Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!',
];

var getRandomNum = function (max, min) {
  if (min === undefined) {
    min = 0;
  }
  return Math.floor(Math.random() * (max - min)) + min;
};

var makeEntity = function (imgName) {
  var tempObj = {};
  tempObj.url = setUrl(imgName);
  tempObj.description = setDescOrComments(descriptionMock, COMMENTS_I_DESCR_SPREAD.max);
  tempObj.comments = setDescOrComments(commentsMock, COMMENTS_I_DESCR_SPREAD.max);
  tempObj.likes = setLikes(LIKES_SPREAD.max, LIKES_SPREAD.min);
  return tempObj;
};

var pushEntityToArray = function (entityArr) {
  for (var j = 1; j <= ENTITY_LIMIT; j++) {
    entityArr.push(makeEntity(j));
  }
};

var setUrl = function (img) {
  return 'photos/' + img + '.jpg';
};

var setDescOrComments = function (descrCommentsArray, arrayLimit) {
  var limit = getRandomNum(arrayLimit);
  var length = descrCommentsArray.length;
  var unitedString = '';
  for (var i = 0; i <= limit; i++) {
    unitedString = unitedString + descrCommentsArray[getRandomNum(length)];
  }
  return unitedString;
};

var setLikes = function (max, min) {
  return getRandomNum(max, min);
};

pushEntityToArray(entity);
