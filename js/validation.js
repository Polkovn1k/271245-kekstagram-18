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

  var getSplitTags = function () {
    return window.data.hashTagsInput.value.toLowerCase().trim().split(' ');
  };

  var isWordsDublicate = function () {
    var words = getSplitTags();
    var wordsForComparison = words.slice();
    return words.some(function (item) {
      wordsForComparison.splice(0, 1);
      return wordsForComparison.some(function (innerItem) {
        return item === innerItem;
      });
    });
  };

  var setNodeErrorStyle = function (node, isError) {
    node.style.boxShadow = isError ? INPUT_ERROR_STYLE : INPUT_VALID_STYLE;
  };

  var getInvalidTags = function (words) {
    for (var i = 0; i < words.length; i++) {
      if (words[i].charAt(0) !== '#') {
        return tagsErrorMessages.FIRST_CHAR;
      }
      if (words[i].length < MIN_HASH_LENGTH) {
        return tagsErrorMessages.MIN_HASH_LENGTH;
      }
      if (words[i].length > MAX_HASH_LENGTH) {
        return tagsErrorMessages.MAX_HASH_LENGTH;
      }
    }
    if (words.length > MAX_HASH_TAGS) {
      return tagsErrorMessages.MAX_HASH_COUNT;
    }
    if (isWordsDublicate()) {
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
    var words = getSplitTags();
    var invalidTagsMessage = getInvalidTags(words);
    var isValid = invalidTagsMessage !== VALID_FIELD_MESSAGE;
    setNodeErrorStyle(input, isValid);
    window.data.hashTagsInput.setCustomValidity(invalidTagsMessage);
  };

  var checkTextareaValidity = function (textarea) {
    var invalidTextareaMessage = getInvalidComment();
    var isValid = invalidTextareaMessage !== VALID_FIELD_MESSAGE;
    setNodeErrorStyle(textarea, isValid);
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
    window.upload(new FormData(form), function () {
      window.utils.closeImgUploadOverlay();
      window.showSuccess();
    }, window.uploadError);
    evt.preventDefault();
  });
})();
