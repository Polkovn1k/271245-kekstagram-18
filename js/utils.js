'use strict';

(function () {

  window.utils = {

    showOrHidePinFilter: function (filter) {
      var pinContainer = document.querySelector('.img-upload__effect-level');
      if (filter === 'none') {
        pinContainer.classList.add('visually-hidden');
      } else {
        pinContainer.classList.remove('visually-hidden');
      }
    },

    documentKeydownHandler: function (evt) {
      if (evt.keyCode === window.data.KEY_CODE_ESC) {
        window.utils.closeImgUploadOverlay();
      }
    },

    openImgUploadOverlay: function () {
      window.utils.showOrHidePinFilter('none');
      window.data.imgUploadOverlay.classList.remove('hidden');
      document.addEventListener('keydown', window.utils.documentKeydownHandler);
    },

    inputReset: function () {
      window.data.hashTagsInput.value = '';
      window.data.commentsTextArea.value = '';
      window.data.uploadInput.value = '';
    },

    escKeydownHandler: function (callback, remove) {
      return function keyHandler(evt) {
        if (evt.type === 'keydown' && evt.keyCode === window.data.KEY_CODE_ESC) {
          callback();
        }
        if (remove === 'remove') {
          document.removeEventListener('keydown', keyHandler);
        }
      };
    },

    btnClickHandler: function (callback, remove) {
      return function clickHandler(evt) {
        if (evt.type === 'click' && evt.currentTarget === evt.target) {
          callback();
        }
        if (remove === 'remove') {
          document.removeEventListener('click', clickHandler);
        }
      };
    },

    debounce: function (eventFunc, waitTimeInTimeout) {
      var timeout;
      return function () {
        var args = arguments;
        clearTimeout(timeout);
        timeout = setTimeout(function () {
          timeout = null;
          eventFunc.apply(null, args);
        }, waitTimeInTimeout);
      };
    },

    closeImgUploadOverlay: function () {
      document.querySelector('#effect-none').checked = true;
      window.setPinPositionDefaultSettings();
      window.data.uploadedImg.className = '';
      window.utils.inputReset();
      window.updateScaleValue('default');
      window.setEffectForImg('default');
      document.removeEventListener('keydown', window.utils.documentKeydownHandler);
      window.data.imgUploadOverlay.classList.add('hidden');
    },
  };

})();
