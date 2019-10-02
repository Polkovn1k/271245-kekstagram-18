'use strict';

(function () {
  window.getRandomNum = function (max, min) {
    if (min === undefined) {
      min = 0;
    }
    return Math.floor(Math.random() * (max - min)) + min;
  };
})();
