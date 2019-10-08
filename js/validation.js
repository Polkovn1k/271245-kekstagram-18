'use strict';

(function () {
  var MAX_HASH_TAGS = 5;
  var MIN_HASH_LENGTH = 2;
  var MAX_HASH_LENGTH = 20;
  var MAX_COMMENT_LENGTH = 140;
  var INPUT_ERROR_STYLE = 'inset 0px 0px 1px 1px red';

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
    if (window.data.commentsTextArea.value.length > MAX_COMMENT_LENGTH) {
      return 'Длина комментария не может быть больше ' + MAX_COMMENT_LENGTH;
    }
    return '';
  };

  var checkValidity = function () {
    var invalidTagsMessage = getInvalidTags(getWordsArr());
    window.data.hashTagsInput.setCustomValidity(invalidTagsMessage);
  };

  var errorStyle = function (nodeElement) {
    if (!nodeElement.validity.valid) {
      nodeElement.style.boxShadow = INPUT_ERROR_STYLE;
      return false;
    }
    nodeElement.style.boxShadow = 'none';
    return false;
  }

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
    getWordsArr();
    checkValidity();
    errorStyle(evt.target);
  });

  window.data.commentsTextArea.addEventListener('input', function (evt) {
    var invalidCommentMessage = getInvalidComment();
    window.data.commentsTextArea.setCustomValidity(invalidCommentMessage);
    errorStyle(evt.target);
  });
  
  
  //var documentClickHandler = window.utils.closeOtherOverlays('.success');

  
  
  var form = document.querySelector('.img-upload__form');
  form.addEventListener('submit', function (evt) {
    window.upload(new FormData(form), function (response) {
      window.utils.closeImgUploadOverlay();
      window.logSuccess();
      var successOverlay = document.querySelector('.success');
      var successOverlayBtn = successOverlay.querySelector('.success__button');
      successOverlayBtn.addEventListener('click', window.utils.closeOtherOverlays(successOverlay));
      successOverlay.addEventListener('click', window.utils.closeOtherOverlays(successOverlay));
      document.addEventListener('keydown', window.utils.closeOtherOverlays(successOverlay));
      //document.querySelector('.success__button').addEventListener('click', documentClickHandler);
    });
    evt.preventDefault();
  });
})();
