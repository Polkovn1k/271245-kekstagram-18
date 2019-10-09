'use strict';

(function () {

  window.utils = {
    getRandomNum: function (max, min) {
      if (min === undefined) {
        min = 0;
      }
      return Math.floor(Math.random() * (max - min)) + min;
    },

    documentKeydownHandler: function (evt) {
      if (evt.keyCode === window.data.KEY_CODE_ESC) {
        window.utils.closeImgUploadOverlay();
      }
    },

    openImgUploadOverlay: function () {
      window.data.imgUploadOverlay.classList.remove('hidden');
      document.addEventListener('keydown', window.utils.documentKeydownHandler);
    },

    inputReset: function () {
      window.data.hashTagsInput.value = '';
      window.data.commentsTextArea.value = '';
      window.data.uploadInput.value = '';
    },

    documentKeydownHandler: function (removedElem) {
      return function keyHandler(evt) {
        if (evt.type === 'keydown' && evt.keyCode === window.data.KEY_CODE_ESC) {
          removedElem.remove();
        }
        document.removeEventListener('keydown', keyHandler);
      };
    },

    btnClickHandler: function (removedElem) {
      return function clickHandler(evt) {
        if (evt.type === 'click' && evt.currentTarget === evt.target) {
          removedElem.remove();
        }
        document.removeEventListener('click', clickHandler);
      };
    },

    closeImgUploadOverlay: function () {
      window.pinPositionDefaultSettings();
      window.data.uploadedImg.className = '';
      window.utils.inputReset();
      window.updateScaleValue('default');
      window.setEffectForImg('default');
      document.removeEventListener('keydown', window.utils.documentKeydownHandler);
      window.data.imgUploadOverlay.classList.add('hidden');
    },
  };

})();
