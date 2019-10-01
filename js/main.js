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
var elementFromArr = getRandomNum(length);

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
  photoBlock.querySelector('.likes-count').textContent = photo.likes;
  photoBlock.querySelector('.social__caption').textContent = photo.description;
  photoBlock.querySelector('.comments-count').textContent = photo.comments.length;
  appendComments(photo.comments);
};

renderBigPhoto(entity[elementFromArr]);

document.querySelector('.social__comment-count').classList.add('visually-hidden');
document.querySelector('.comments-loader').classList.add('visually-hidden');

//------------------SCALE

var keyCodes = {
  ESC: 27,
  ENTER: 13,
};
var uploadInput = document.querySelector('.img-upload__input');
var uploadInputLabel = document.querySelector('.img-upload__label');
var imgUploadOverlay = document.querySelector('.img-upload__overlay');
var uploadOverlayClose = imgUploadOverlay.querySelector('.img-upload__cancel');
var uploadedImg = imgUploadOverlay.querySelector('.img-upload__preview img');

var documentKeydownHandler = function (evt) {
  if (evt.keyCode === keyCodes.ESC) {
    closeImgUploadOverlay();
  }
};

var openImgUploadOverlay = function () {
  imgUploadOverlay.classList.remove('hidden');
  document.addEventListener('keydown', documentKeydownHandler);
};

var closeImgUploadOverlay = function () {
  imgUploadOverlay.classList.add('hidden');
  uploadInput.value = '';
  document.removeEventListener('keydown', documentKeydownHandler);
};

var inputChangeHandler = function () {
  openImgUploadOverlay();
};

uploadInputLabel.addEventListener('keydown', function (evt) {
  if (evt.keyCode === keyCodes.ENTER) {
    openImgUploadOverlay();
  }
});

uploadOverlayClose.addEventListener('keydown', function (evt) {
  if (evt.keyCode === keyCodes.ENTER) {
    closeImgUploadOverlay();
  }
});

var scaleDown = imgUploadOverlay.querySelector('.scale__control--smaller');
var scaleUp = imgUploadOverlay.querySelector('.scale__control--bigger');
var scaleInput = imgUploadOverlay.querySelector('.scale__control--value');

var updateScaleValue = function (operationType) {
  var scaleValue = +scaleInput.value.substring(0, scaleInput.value.length - 1);
  if (operationType === 'smaller') {
    scaleValue = (scaleValue < 25) ? 0 : scaleValue - 25;
  } else {
    scaleValue = (scaleValue > 75) ? 100 : scaleValue + 25;
  }
  imgScale(scaleValue);
  scaleInput.value = scaleValue + '%';
};

var smallerBtnClickHandler = function () {
  var scaleValue = updateScaleValue('smaller');
};

var biggerBtnClickHandler = function () {
  var scaleValue = updateScaleValue('bigger');
};

var imgScale = function (value) {
  uploadedImg.style.transform = 'scale(' + value / 100 + ')';
};

scaleDown.addEventListener('click', smallerBtnClickHandler);
scaleUp.addEventListener('click', biggerBtnClickHandler);

uploadInput.addEventListener('change', inputChangeHandler);
uploadOverlayClose.addEventListener('click', closeImgUploadOverlay);

//------------------EFFECTS & INTENSITY

var effectsRadio = imgUploadOverlay.querySelectorAll('.effects__radio');
var effectLevelPin = imgUploadOverlay.querySelector('.effect-level__pin');
var effectLevelLine = imgUploadOverlay.querySelector('.effect-level__line');
var effectLevelValue = imgUploadOverlay.querySelector('.effect-level__value');
var EFFECT_DEFAULT_VAL = 100;

var pinPosition = function () {
  return effectLevelPin.offsetLeft / effectLevelLine.scrollWidth * 100;
};

var setEffectLevel = function (number) {
  effectLevelValue.value = number;
};

var getCheckedInput = function () {
  for (var i = 0; i < effectsRadio.length; i++) {
    if (effectsRadio[i].checked) return effectsRadio[i].value;
  }
};

var setEffectForImg = function (number) {
  var filterType = getCheckedInput();
  switch (filterType) {
    case 'none':
      uploadedImg.style.filter = 'none';
      closeImgUploadOverlay();
      break;
    case 'chrome':
      uploadedImg.style.filter = 'grayscale(' + number / 100 + ')';
      break;
    case 'sepia':
      uploadedImg.style.filter = 'sepia(' + number / 100 + ')';
      break;
    case 'marvin':
      uploadedImg.style.filter = 'invert(' + number + '%)';
      break;
    case 'phobos':
      uploadedImg.style.filter = 'blur(' + number * (3 / 100) + 'px)';
      break;
    case 'heat':
      uploadedImg.style.filter = 'brightness(' + number * (3 / 100) + ')';
      break;
  }
};

var setValues = function (numtype) {
  var handlePosition = numtype;
  setEffectLevel(handlePosition);
  setEffectForImg(handlePosition);
};

effectLevelPin.addEventListener('mouseup', function () {
  setValues(pinPosition());
});

var setImgEffect = function () {
  for (var i = 0; i < effectsRadio.length; i++) {
    effectsRadio[i].addEventListener('change', radioChangeHandler);
  }
};

var radioChangeHandler = function () {
  uploadedImg.className = 'effects__preview--' + this.value;
  setValues(EFFECT_DEFAULT_VAL);
};

setImgEffect();

//------------------INPUT VALIDATION

var hashInput = imgUploadOverlay.querySelector('.text__hashtags');
var imgForm = document.querySelector('.img-upload__form');
var MAX_HASH_TAGS = 5;
var MIN_HASH_LENGTH = 2;
var MAX_HASH_LENGTH = 20;
var wordsArr = [];
var invalidMessage;

var getWordsArr = function () {
  wordsArr = hashInput.value.toLowerCase().trim().split(' ');
};

let wordsDublicate = function () {
  var haveDublie;
  var newArr = wordsArr.forEach(function(item, index, array) {
    for (var i = index + 1; i < wordsArr.length; i++) {
      if (item === wordsArr[i]) {
        haveDublie = true;
        break;
      }
    }
  });
  return haveDublie;
}

var getInvalidMessage = function (arr) {
  for (var i = 0; i < arr.length; i++) {
    if (arr[i].charAt(0) !== '#') {
      return 'Хэш-теги должны начинаться с символа #';
    }
    if (arr[i].length < MIN_HASH_LENGTH) {
      return 'Длина хэш-тега не может быть меньше ' + MIN_HASH_LENGTH;
    }
    if (arr[i].length > MAX_HASH_LENGTH) {
      return 'Длина хэш-тега не может быть больше ' + MAX_HASH_LENGTH;
    }
  }
  if (arr.length > MAX_HASH_TAGS) {
    return 'Не более ' + MAX_HASH_TAGS + ' хэш-тегов';
  }
  if (wordsDublicate()) {
    return 'У вас есть одинаковые хэш-теги!';
  }
  return '';
};

var checkValidity = function () {
  invalidMessage = getInvalidMessage(wordsArr);
  hashInput.setCustomValidity(invalidMessage);
};

hashInput.addEventListener('input', function () {
  getWordsArr();
  checkValidity();
});

/*imgForm.addEventListener('submit', function (evt) {
  getWordsArr();
  console.log(wordsArr);
  checkValidity();
  evt.preventDefault();
});*/






/*imgForm.addEventListener('submit', function (evt) {
  console.dir(hashInput.validity.valid);
  getWordsArr();
  checkValidity();
  evt.preventDefault();
  console.dir(hashInput.validity.valid);
});*/

/*
hashInput.addEventListener('invalid', function (evt) {
  if (userNameInput.validity.tooShort) {
    userNameInput.setCustomValidity('Имя должно состоять минимум из 2-х символов');
  } else if (userNameInput.validity.tooLong) {
    userNameInput.setCustomValidity('Имя не должно превышать 25-ти символов');
  } else if (userNameInput.validity.valueMissing) {
    userNameInput.setCustomValidity('Обязательное поле');
  } else {
    userNameInput.setCustomValidity('');
  }
});*/

/*hashInput.addEventListener('invalid', function () {
  checkValidity();
});*/


