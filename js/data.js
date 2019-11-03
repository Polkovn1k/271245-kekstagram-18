'use strict';

(function () {
  window.data = {
    entity: [],
    KEY_CODE_ESC: 27,
    KEY_CODE_ENTER: 13,
    imgUploadOverlay: document.querySelector('.img-upload__overlay'),
    uploadedImg: document.querySelector('.img-upload__preview img'),
    uploadInput: document.querySelector('.img-upload__input'),
    uploadOverlayClose: document.querySelector('.img-upload__cancel'),
    hashTagsInput: document.querySelector('.text__hashtags'),
    commentsTextArea: document.querySelector('.text__description'),
    render: {
      ENTITY_LIMIT: 25,
      AVATARS_COUNT: 6,
      LIKES_SPREAD_MIN: 15,
      LIKES_SPREAD_MAX: 200,
      COMMENTS_I_DESCR_SPREAD_MAX: 3,
    },
  };
})();
