'use strict';

var slidersPin = document.querySelector('.effect-level__pin');
var fullLine = document.querySelector('.effect-level__line');
var lineDepth = document.querySelector('.effect-level__depth');

var changeStyle = function (shift) {
  var pinPosition = slidersPin.offsetLeft - shift;
  slidersPin.style.left = pinPosition + 'px';
  if (slidersPin.offsetLeft < 0) {
    pinPosition = 0;
  }
  if (slidersPin.offsetLeft > fullLine.offsetWidth) {
    pinPosition = fullLine.offsetWidth;
  }
  slidersPin.style.left = pinPosition + 'px';
  lineDepth.style.width = pinPosition + 'px';
};

slidersPin.addEventListener('mousedown', function (evt) {
  evt.preventDefault();
  var xCoordinate = evt.clientX;
  
  var pinMouseMoveHandler = function (movEvt) {
    movEvt.preventDefault();
    var xShift = xCoordinate - movEvt.clientX;
    xCoordinate = movEvt.clientX;
    changeStyle(xShift);
  };
  var pinMouseUpHandler = function (upEvt) {
    upEvt.preventDefault();
    document.removeEventListener('mousemove', pinMouseMoveHandler);
    document.removeEventListener('mouseup', pinMouseUpHandler);
  };
  document.addEventListener('mousemove', pinMouseMoveHandler);
  document.addEventListener('mouseup', pinMouseUpHandler);
});
/*
(function () {

})();
*/
