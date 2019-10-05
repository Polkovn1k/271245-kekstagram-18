'use strict';

(function () {
  var hashInput = window.data.imgUploadOverlay.querySelector('.text__hashtags');
  var hashTextArea = window.data.imgUploadOverlay.querySelector('.text__description');
  var MAX_HASH_TAGS = 5;
  var MIN_HASH_LENGTH = 2;
  var MAX_HASH_LENGTH = 20;
  var MAX_COMMENT_LENGTH = 140;

  var getWordsArr = function () {
    return hashInput.value.toLowerCase().trim().split(' ');
  };

  var wordsDublicate = function () {
    for (var i = 0; i < getWordsArr().length; i++) {
      for (var j = i + 1; j < getWordsArr().length; j++) {
        if (getWordsArr()[i] === getWordsArr()[j]) {
          return true;
        }
      }
    }
    return false;
  };

  var getInvalidTags = function (arr) {
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

  var getInvalidComment = function () {
    if (hashTextArea.value.length > MAX_COMMENT_LENGTH) {
      return 'Длина комментария не может быть больше ' + MAX_COMMENT_LENGTH;
    }
    return '';
  };

  hashInput.addEventListener('blur', function () {
    document.addEventListener('keydown', window.utils.documentKeydownHandler);
  });

  hashInput.addEventListener('focus', function () {
    document.removeEventListener('keydown', window.utils.documentKeydownHandler);
  });

  hashTextArea.addEventListener('focus', function () {
    document.removeEventListener('keydown', window.utils.documentKeydownHandler);
  });

  hashTextArea.addEventListener('blur', function () {
    document.addEventListener('keydown', window.utils.documentKeydownHandler);
  });

  var checkValidity = function () {
    var invalidTagsMessage = getInvalidTags(getWordsArr());
    hashInput.setCustomValidity(invalidTagsMessage);
  };

  hashInput.addEventListener('input', function () {
    getWordsArr();
    checkValidity();
  });

  hashTextArea.addEventListener('input', function () {
    var invalidCommentMessage = getInvalidComment();
    hashTextArea.setCustomValidity(invalidCommentMessage);
  });
})();
