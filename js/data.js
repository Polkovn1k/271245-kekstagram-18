'use strict';

(function () {
  window.data = {
    entity: [],
    KEY_CODE_ESC: 27,
    KEY_CODE_ENTER: 13,
    imgUploadOverlay: document.querySelector('.img-upload__overlay'),
    uploadedImg: document.querySelector('.img-upload__preview img'),
    uploadInput: document.querySelector('.img-upload__input'),
    uploadOverlayClose: document.querySelector('.img-upload__cancel'),
    hashTagsInput: document.querySelector('.text__hashtags'),
    commentsTextArea: document.querySelector('.text__description'),
    render: {
      ENTITY_LIMIT: 25,
      AVATARS_COUNT: 6,
      LIKES_SPREAD_MIN: 15,
      LIKES_SPREAD_MAX: 200,
      COMMENTS_I_DESCR_SPREAD_MAX: 3,
    },
    descriptionMock: [
      'Очень красивый снимок.',
      'Красивая фотография!',
      'Хороший снимок!',
      'Какое-то описание №1.',
      'Это фотография.',
      'Тут что-то происходит.',
      'Какое-то описание №2.',
      'Хороший кадр!',
    ],
    commentsMock: [
      'Всё отлично!',
      'В целом всё неплохо. Но не всё.',
      'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
      'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
      'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
      'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!',
    ],
    names: [
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
    ],
  };
})();
