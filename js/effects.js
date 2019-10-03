'use strict';

(function () {
  var uploadedImg = window.data.imgUploadOverlay.querySelector('.img-upload__preview img');
  var scaleDown = window.data.imgUploadOverlay.querySelector('.scale__control--smaller');
  var scaleUp = window.data.imgUploadOverlay.querySelector('.scale__control--bigger');
  var scaleInput = window.data.imgUploadOverlay.querySelector('.scale__control--value');
  var inputChangeHandler = function () {
    window.utils.openImgUploadOverlay();
  };
  var updateScaleValue = function (operationType) {
    var scaleValue = +scaleInput.value.substring(0, scaleInput.value.length - 1);
    if (operationType === 'smaller') {
      scaleValue = (scaleValue < 25) ? 0 : scaleValue - 25;
    } else {
      scaleValue = (scaleValue > 75) ? 100 : scaleValue + 25;
    }
    imgScale(scaleValue);
    scaleInput.value = scaleValue + '%';
  };
  var smallerBtnClickHandler = function () {
    updateScaleValue('smaller');
  };
  var biggerBtnClickHandler = function () {
    updateScaleValue('bigger');
  };
  var imgScale = function (value) {
    uploadedImg.style.transform = 'scale(' + value / 100 + ')';
  };
  scaleDown.addEventListener('click', smallerBtnClickHandler);
  scaleUp.addEventListener('click', biggerBtnClickHandler);
  window.data.uploadInput.addEventListener('change', inputChangeHandler);
  window.data.uploadOverlayClose.addEventListener('click', window.utils.closeImgUploadOverlay);
  var effectsRadio = window.data.imgUploadOverlay.querySelectorAll('.effects__radio');
  var effectLevelPin = window.data.imgUploadOverlay.querySelector('.effect-level__pin');
  var effectLevelLine = window.data.imgUploadOverlay.querySelector('.effect-level__line');
  var effectLevelValue = window.data.imgUploadOverlay.querySelector('.effect-level__value');
  var EFFECT_DEFAULT_VAL = 100;
  var pinPosition = function () {
    return effectLevelPin.offsetLeft / effectLevelLine.scrollWidth * 100;
  };
  var setEffectLevel = function (number) {
    effectLevelValue.value = number;
  };
  var getCheckedInput = function () {
    for (var i = 0; i < effectsRadio.length; i++) {
      if (effectsRadio[i].checked) {
        return effectsRadio[i].value;
      }
    }
    return false;
  };
  var setEffectForImg = function (number) {
    var filterType = getCheckedInput();
    switch (filterType) {
      case 'none':
        uploadedImg.style.filter = 'none';
        window.utils.closeImgUploadOverlay();
        break;
      case 'chrome':
        uploadedImg.style.filter = 'grayscale(' + number / 100 + ')';
        break;
      case 'sepia':
        uploadedImg.style.filter = 'sepia(' + number / 100 + ')';
        break;
      case 'marvin':
        uploadedImg.style.filter = 'invert(' + number + '%)';
        break;
      case 'phobos':
        uploadedImg.style.filter = 'blur(' + number * (3 / 100) + 'px)';
        break;
      case 'heat':
        uploadedImg.style.filter = 'brightness(' + number * (3 / 100) + ')';
        break;
    }
  };
  var setValues = function (numtype) {
    var handlePosition = numtype;
    setEffectLevel(handlePosition);
    setEffectForImg(handlePosition);
  };
  effectLevelPin.addEventListener('mouseup', function () {
    setValues(pinPosition());
  });
  var setImgEffect = function () {
    for (var i = 0; i < effectsRadio.length; i++) {
      effectsRadio[i].addEventListener('change', radioChangeHandler);
    }
  };
  var radioChangeHandler = function () {
    uploadedImg.className = 'effects__preview--' + effectsRadio.value;
    setValues(EFFECT_DEFAULT_VAL);
  };
  setImgEffect();
})();
