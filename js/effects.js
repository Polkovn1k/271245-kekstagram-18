'use strict';

(function () {
  var nodes = {
    uploadedImg: window.data.imgUploadOverlay.querySelector('.img-upload__preview img'),
    scaleDown: window.data.imgUploadOverlay.querySelector('.scale__control--smaller'),
    scaleUp: window.data.imgUploadOverlay.querySelector('.scale__control--bigger'),
    scaleInput: window.data.imgUploadOverlay.querySelector('.scale__control--value'),
    effectsRadio: window.data.imgUploadOverlay.querySelectorAll('.effects__radio'),
    effectLevelPin: window.data.imgUploadOverlay.querySelector('.effect-level__pin'),
    effectLevelLine: window.data.imgUploadOverlay.querySelector('.effect-level__line'),
    effectLevelValue: window.data.imgUploadOverlay.querySelector('.effect-level__value'),
  };
  var EFFECT_DEFAULT_VAL = 100;
  var draged = false;

  var inputChangeHandler = function () {
    window.utils.openImgUploadOverlay();
  };

  window.updateScaleValue = function (operationType) {
    var scaleValue = +nodes.scaleInput.value.substring(0, nodes.scaleInput.value.length - 1);
    if (operationType === 'smaller') {
      scaleValue = (scaleValue < 25) ? 0 : scaleValue - 25;
    } else if (operationType === 'bigger') {
      scaleValue = (scaleValue > 75) ? 100 : scaleValue + 25;
    } else {
      scaleValue = EFFECT_DEFAULT_VAL;
    }
    imgScale(scaleValue);
    nodes.scaleInput.value = scaleValue + '%';
  };

  var smallerBtnClickHandler = function () {
    window.updateScaleValue('smaller');
  };

  var biggerBtnClickHandler = function () {
    window.updateScaleValue('bigger');
  };

  var imgScale = function (value) {
    nodes.uploadedImg.style.transform = 'scale(' + value / 100 + ')';
  };

  var pinPosition = function () {
    return nodes.effectLevelPin.offsetLeft / nodes.effectLevelLine.scrollWidth * 100;
  };

  var setEffectLevel = function (number) {
    nodes.effectLevelValue.value = number;
  };

  var getCheckedInput = function () {
    for (var i = 0; i < nodes.effectsRadio.length; i++) {
      if (nodes.effectsRadio[i].checked) {
        return nodes.effectsRadio[i].value;
      }
    }
    return false;
  };

  window.setEffectForImg = function (number) {
    if (number === 'default' || number === undefined) {
      nodes.uploadedImg.style.filter = 'none';
      return false;
    }
    var filterType = getCheckedInput();
    switch (filterType) {
      case 'none':
        nodes.uploadedImg.style.filter = 'none';
        window.utils.closeImgUploadOverlay();
        break;
      case 'chrome':
        nodes.uploadedImg.style.filter = 'grayscale(' + number / 100 + ')';
        break;
      case 'sepia':
        nodes.uploadedImg.style.filter = 'sepia(' + number / 100 + ')';
        break;
      case 'marvin':
        nodes.uploadedImg.style.filter = 'invert(' + number + '%)';
        break;
      case 'phobos':
        nodes.uploadedImg.style.filter = 'blur(' + number * (3 / 100) + 'px)';
        break;
      case 'heat':
        nodes.uploadedImg.style.filter = 'brightness(' + number * (3 / 100) + ')';
        break;
    }
  };

  var setValues = function (numtype) {
    var handlePosition = numtype;
    setEffectLevel(handlePosition);
    window.setEffectForImg(handlePosition);
  };

  var setImgEffect = function () {
    for (var i = 0; i < nodes.effectsRadio.length; i++) {
      nodes.effectsRadio[i].addEventListener('change', radioChangeHandler);
    }
  };

  var radioChangeHandler = function () {
    nodes.uploadedImg.className = 'effects__preview--' + nodes.effectsRadio.value;
    setValues(EFFECT_DEFAULT_VAL);
    window.pinPositionDefaultSettings();
  };

  nodes.scaleDown.addEventListener('click', smallerBtnClickHandler);
  nodes.scaleUp.addEventListener('click', biggerBtnClickHandler);
  window.data.uploadInput.addEventListener('change', inputChangeHandler);
  window.data.uploadOverlayClose.addEventListener('click', window.utils.closeImgUploadOverlay);

  nodes.effectLevelPin.addEventListener('mousedown', function () {
    draged = true;
  });

  nodes.effectLevelPin.addEventListener('mousemove', function () {
    if (draged) {
      setValues(pinPosition());
    }
  });

  nodes.effectLevelPin.addEventListener('mouseup', function () {
    draged = false;
  });

  setImgEffect();
})();
