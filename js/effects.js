'use strict';

(function () {
  var nodes = {
    uploadedImg: window.data.imgUploadOverlay.querySelector('.img-upload__preview img'),
    scaleDown: window.data.imgUploadOverlay.querySelector('.scale__control--smaller'),
    scaleUp: window.data.imgUploadOverlay.querySelector('.scale__control--bigger'),
    scaleInput: window.data.imgUploadOverlay.querySelector('.scale__control--value'),
    effectsRadio: window.data.imgUploadOverlay.querySelectorAll('.effects__radio'),
    pinContainer: window.data.imgUploadOverlay.querySelector('.img-upload__effect-level'),
    effectLevelPin: window.data.imgUploadOverlay.querySelector('.effect-level__pin'),
    effectLevelLine: window.data.imgUploadOverlay.querySelector('.effect-level__line'),
    effectLevelValue: window.data.imgUploadOverlay.querySelector('.effect-level__value'),
  };
  var EFFECT_DEFAULT_VAL = 100;
  var SCALE_STEP = 25;
  var SCALE_PRE_FINAL = 75;
  var draged = false;

  var inputChangeHandler = function () {
    window.utils.openImgUploadOverlay();
  };

  window.updateScaleValue = function (operationType) {
    var scaleValue = +nodes.scaleInput.value.substring(0, nodes.scaleInput.value.length - 1);
    if (operationType === 'smaller') {
      scaleValue = (scaleValue < SCALE_STEP) ? 0 : scaleValue - SCALE_STEP;
    } else if (operationType === 'bigger') {
      scaleValue = (scaleValue > SCALE_PRE_FINAL) ? EFFECT_DEFAULT_VAL : scaleValue + SCALE_STEP;
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
    var radios = Array.from(nodes.effectsRadio);
    var element = radios.find(function (item) {
      return item.checked;
    });
    return element ? element.value : null;
  };

  var showOrHidePinFilter = function (filter) {
    if (filter === 'none') {
      nodes.pinContainer.classList.add('visually-hidden');
    } else {
      nodes.pinContainer.classList.remove('visually-hidden');
    }
  };

  window.setEffectForImg = function (number) {
    var reset = number === undefined || number === 'default';
    var filterType = reset ? 'default' : getCheckedInput();
    var style;
    switch (filterType) {
      case 'none':
        style = 'none';
        break;
      case 'chrome':
        style = 'grayscale(' + number / 100 + ')';
        break;
      case 'sepia':
        style = 'sepia(' + number / 100 + ')';
        break;
      case 'marvin':
        style = 'invert(' + number + '%)';
        break;
      case 'phobos':
        style = 'blur(' + number * (3 / 100) + 'px)';
        break;
      case 'heat':
        style = 'brightness(' + number * (3 / 100) + ')';
        break;
      case 'default':
        style = 'none';
        break;
    }
    showOrHidePinFilter(filterType);
    nodes.uploadedImg.style.filter = style;
  };

  var setValues = function (numtype) {
    var handlePosition = numtype;
    setEffectLevel(handlePosition);
    window.setEffectForImg(handlePosition);
  };

  var setImgEffect = function () {
    nodes.effectsRadio.forEach(function (item) {
      item.addEventListener('change', radioChangeHandler);
    });
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
