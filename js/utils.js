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
    closeImgUploadOverlay: function () {
      window.data.imgUploadOverlay.classList.add('hidden');
      window.data.uploadInput.value = '';
      document.removeEventListener('keydown', window.utils.documentKeydownHandler);
    },
  };
})();
