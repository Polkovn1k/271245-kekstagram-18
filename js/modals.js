'use strict';

(function () {

  var errorBlockTemplate = document.querySelector('#error').content.querySelector('.error');
  var successBlockTemplate = document.querySelector('#success').content.querySelector('.success');

  window.showModal = function (template) {
    var modal = template.cloneNode(true);
    document.querySelector('main').appendChild(modal);
    return modal;
  };

  window.modalEvents = function (overlay, btns) {
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
  };

  window.uploadError = function (message) {
    window.utils.closeImgUploadOverlay();
    var errorOverlay = window.showModal(errorBlockTemplate);
    var errorBtn = errorOverlay.querySelectorAll('.error__button');
    errorOverlay.querySelector('.error__text').innerText = message;
    window.modalEvents(errorOverlay, errorBtn);
  };

  window.showSuccess = function () {
    var successOverlay = window.showModal(successBlockTemplate);
    var successBtn = successOverlay.querySelectorAll('.success__button');
    window.modalEvents(successOverlay, successBtn);
  };

})();
