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

    debounce: function (eventFunc, waitTimeInTimeout, immediateFlag, elementOnEvent) {
      var timeout;
      return function () {
        var args = arguments;
        var callNow = immediateFlag && !timeout;
        clearTimeout(timeout);
        timeout = setTimeout(function () {
          timeout = null;
          if (!immediateFlag) {
            eventFunc.apply(elementOnEvent, args);
          }
        }, waitTimeInTimeout);
        if (callNow) {
          eventFunc.apply(elementOnEvent, args);
        }
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
