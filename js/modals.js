'use strict';

(function () {

  var errorBlockTemplate = document.querySelector('#error').content.querySelector('.error');
  var successBlockTemplate = document.querySelector('#success').content.querySelector('.success');

  window.modals = {

    showModal: function (template) {
      var modal = template.cloneNode(true);
      document.querySelector('main').appendChild(modal);
      return modal;
    },

    modalEvents: function (overlay, btns) {
      var btnHandler = window.utils.btnClickHandler(function () {
        overlay.remove();
      }, 'remove');
      var keydownHandler = window.utils.escKeydownHandler(function () {
        overlay.remove();
      }, 'remove');
      btns.forEach(function (item) {
        item.addEventListener('click', btnHandler);
      });
      overlay.addEventListener('click', btnHandler);
      document.addEventListener('keydown', keydownHandler);
    },

    uploadError: function (message) {
      window.utils.closeImgUploadOverlay();
      var errorOverlay = window.modals.showModal(errorBlockTemplate);
      var errorBtn = errorOverlay.querySelectorAll('.error__button');
      errorOverlay.querySelector('.error__text').innerText = message;
      window.modals.modalEvents(errorOverlay, errorBtn);
    },

    showSuccess: function () {
      var successOverlay = window.modals.showModal(successBlockTemplate);
      var successBtn = successOverlay.querySelectorAll('.success__button');
      window.modals.modalEvents(successOverlay, successBtn);
    },

  };

})();
