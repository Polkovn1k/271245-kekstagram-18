'use strict';

(function () {
  var slidersPin = document.querySelector('.effect-level__pin');
  var fullLine = slidersPin.parentNode;
  var lineDepth = slidersPin.nextElementSibling;

  var setPinStyle = function (pinPosition) {
    slidersPin.style.left = pinPosition + 'px';
    lineDepth.style.width = pinPosition + 'px';
  };

  var setPinPositionSettings = function (shift) {
    var pinPosition = slidersPin.offsetLeft - shift;
    slidersPin.style.left = pinPosition + 'px';
    if (slidersPin.offsetLeft < 0) {
      pinPosition = 0;
    }
    if (slidersPin.offsetLeft > fullLine.offsetWidth) {
      pinPosition = fullLine.offsetWidth;
    }
    setPinStyle(pinPosition);
  };

  window.setPinPositionDefaultSettings = function () {
    setPinStyle(fullLine.offsetWidth);
  };

  slidersPin.addEventListener('mousedown', function (evt) {
    evt.preventDefault();
    var limit = {
      leftSide: fullLine.getBoundingClientRect().left,
      rightSide: fullLine.getBoundingClientRect().right,
    };
    var xCoordinate = evt.clientX;

    var pinMouseMoveHandler = function (movEvt) {
      movEvt.preventDefault();
      var xShift = xCoordinate - movEvt.clientX;
      xCoordinate = movEvt.clientX;
      if (xCoordinate > limit.leftSide && xCoordinate < limit.rightSide) {
        setPinPositionSettings(xShift);
      }
    };

    var pinMouseUpHandler = function (upEvt) {
      upEvt.preventDefault();
      document.removeEventListener('mousemove', pinMouseMoveHandler);
      document.removeEventListener('mouseup', pinMouseUpHandler);
    };

    document.addEventListener('mousemove', pinMouseMoveHandler);
    document.addEventListener('mouseup', pinMouseUpHandler);
  });
})();
