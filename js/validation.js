'use strict';

(function () {
  var MAX_HASH_TAGS = 5;
  var MIN_HASH_LENGTH = 2;
  var MAX_HASH_LENGTH = 20;
  var MAX_COMMENT_LENGTH = 140;
  var INPUT_ERROR_STYLE = 'inset 0px 0px 1px 1px red';
  var INPUT_VALID_STYLE = 'none';
  var VALID_FIELD_MESSAGE = '';
  var tagsErrorMessages = {
    FIRST_CHAR: 'Хэш-теги должны начинаться с символа #',
    MIN_HASH_LENGTH: 'Длина хэш-тега не может быть меньше ' + MIN_HASH_LENGTH,
    MAX_HASH_LENGTH: 'Длина хэш-тега не может быть больше ' + MAX_HASH_LENGTH,
    MAX_HASH_COUNT: 'Не более ' + MAX_HASH_TAGS + ' хэш-тегов',
    EQUAL_HASH: 'У вас есть одинаковые хэш-теги!',
  };
  var COMMENTS_ERROR_MESSAGES = 'Длина комментария не может быть больше ' + MAX_COMMENT_LENGTH;

  var getWordsArr = function () {
    return window.data.hashTagsInput.value.toLowerCase().trim().split(' ');
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

  var setNodeErrorStyle = function (node, isError) {
    node.style.boxShadow = isError ? INPUT_ERROR_STYLE : INPUT_VALID_STYLE;
  }

  var getInvalidTags = function (arr) {
    for (var i = 0; i < arr.length; i++) {
      if (arr[i].charAt(0) !== '#') {
        return tagsErrorMessages.FIRST_CHAR;
      }
      if (arr[i].length < MIN_HASH_LENGTH) {
        return tagsErrorMessages.MIN_HASH_LENGTH;
      }
      if (arr[i].length > MAX_HASH_LENGTH) {
        return tagsErrorMessages.MAX_HASH_LENGTH;
      }
    }
    if (arr.length > MAX_HASH_TAGS) {
      return tagsErrorMessages.MAX_HASH_COUNT;
    }
    if (wordsDublicate()) {
      return tagsErrorMessages.EQUAL_HASH;
    }
    return VALID_FIELD_MESSAGE;
  };

  var getInvalidComment = function () {
    if (window.data.commentsTextArea.value.length > MAX_COMMENT_LENGTH) {
      return COMMENTS_ERROR_MESSAGES;
    }
    return VALID_FIELD_MESSAGE;
  };

  var checkInputValidity = function (input) {
    var words = getWordsArr();
    var invalidTagsMessage = getInvalidTags(words);
    if (invalidTagsMessage !== VALID_FIELD_MESSAGE) {
      setNodeErrorStyle(input, true);
    } else {
      setNodeErrorStyle(input, false);
    }
    window.data.hashTagsInput.setCustomValidity(invalidTagsMessage);
  };

  var checkTextareaValidity = function (textarea) {
    var invalidTextareaMessage = getInvalidComment();
    if (invalidTextareaMessage !== VALID_FIELD_MESSAGE) {
      setNodeErrorStyle(textarea, true);
    } else {
      setNodeErrorStyle(textarea, false);
    }
    window.data.commentsTextArea.setCustomValidity(invalidTextareaMessage);
  };

  window.data.hashTagsInput.addEventListener('blur', function () {
    document.addEventListener('keydown', window.utils.documentKeydownHandler);
  });

  window.data.hashTagsInput.addEventListener('focus', function () {
    document.removeEventListener('keydown', window.utils.documentKeydownHandler);
  });

  window.data.commentsTextArea.addEventListener('focus', function () {
    document.removeEventListener('keydown', window.utils.documentKeydownHandler);
  });

  window.data.commentsTextArea.addEventListener('blur', function () {
    document.addEventListener('keydown', window.utils.documentKeydownHandler);
  });

  window.data.hashTagsInput.addEventListener('input', function (evt) {
    checkInputValidity(evt.target);
  });

  window.data.commentsTextArea.addEventListener('input', function (evt) {
    checkTextareaValidity(evt.target);
  });

  var form = document.querySelector('.img-upload__form');
  form.addEventListener('submit', function (evt) {
    window.upload(new FormData(form), function (response) {
      window.utils.closeImgUploadOverlay();
      window.logSuccess();
      var successOverlay = document.querySelector('.success');
      var successOverlayBtn = successOverlay.querySelector('.success__button');
      successOverlayBtn.addEventListener('click', window.utils.closeOverlayAfterClick(successOverlay));
      successOverlay.addEventListener('click', window.utils.closeOverlayAfterClick(successOverlay));
      document.addEventListener('keydown', window.utils.closeOverlayAfterKeydown(successOverlay));
    });
    evt.preventDefault();
  });
})();
