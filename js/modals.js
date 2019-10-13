'use strict';

(function () {

  var errorBlockTemplate = document.querySelector('#error').content.querySelector('.error');
  var successBlockTemplate = document.querySelector('#success').content.querySelector('.success');

  var showModal = function (template) {
    var modal = template.cloneNode(true);
    document.querySelector('main').appendChild(modal);
    return modal;
  };

  var modalEvents = function (overlay, btns) {
    var btnHandler = window.utils.btnClickHandler(function () {
      overlay.remove();
    }, 'remove');
    var keydownHandler = window.utils.escKeydownHandler(function () {
      overlay.remove();
    }, 'remove');
    for (var i = 0; i < btns.length; i++) {
      btns[i].addEventListener('click', btnHandler);
    }
    overlay.addEventListener('click', btnHandler);
    document.addEventListener('keydown', keydownHandler);
  };

  window.logError = function () {
    var errorOverlay = showModal(errorBlockTemplate);
    var errorBtn = errorOverlay.querySelectorAll('.error__button');
    modalEvents(errorOverlay, errorBtn);
  };

  window.showSuccess = function () {
    var successOverlay = showModal(successBlockTemplate);
    var successBtn = successOverlay.querySelectorAll('.success__button');
    modalEvents(successOverlay, successBtn);
  };

})();
