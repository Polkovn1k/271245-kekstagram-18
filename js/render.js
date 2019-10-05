'use strict';

(function () {
  var similarPhotoTemplate = document.querySelector('#picture').content.querySelector('.picture');
  var picturesContainer = document.querySelector('.pictures');
  var photoBlock = document.querySelector('.big-picture');
  var commentBlock = document.querySelector('#photo').content.querySelector('.social__comment');
  var socialComments = document.querySelector('.social__comments');
  var uploadInputLabel = document.querySelector('.img-upload__label');
  var renderPhoto = function (photoArr) {
    var photoElement = similarPhotoTemplate.cloneNode(true);
    photoElement.querySelector('.picture__img').src = photoArr.url;
    photoElement.querySelector('.picture__likes').textContent = photoArr.likes;
    photoElement.querySelector('.picture__comments').textContent = photoArr.comments.length;
    return photoElement;
  };
  var appendPhotos = function (arr) {
    var fragment = document.createDocumentFragment();
    for (var i = 0; i < arr.length; i++) {
      fragment.appendChild(renderPhoto(arr[i]));
    }
    picturesContainer.appendChild(fragment);
  };
  appendPhotos(window.data.entity);
  var length = window.data.entity.length;
  var elementFromArr = window.utils.getRandomNum(length);
  var renderComments = function (commentsArr) {
    var nodeElement = commentBlock.cloneNode(true);
    var img = nodeElement.querySelector('.social__picture');
    img.src = commentsArr.avatar;
    img.alt = commentsArr.name;
    nodeElement.querySelector('.social__text').textContent = commentsArr.message;
    return nodeElement;
  };
  var appendComments = function (nodeElements) {
    var fragment = document.createDocumentFragment();
    for (var i = 0; i < nodeElements.length; i++) {
      fragment.appendChild(renderComments(nodeElements[i]));
    }
    socialComments.appendChild(fragment);
  };
  var renderBigPhoto = function (photo) {
    photoBlock.querySelector('.big-picture__img').src = photo.url;
    photoBlock.querySelector('.big-picture__img').src = photo.url;
    photoBlock.querySelector('.likes-count').textContent = photo.likes;
    photoBlock.querySelector('.social__caption').textContent = photo.description;
    photoBlock.querySelector('.comments-count').textContent = photo.comments.length;
    appendComments(photo.comments);
  };
  renderBigPhoto(window.data.entity[elementFromArr]);
  document.querySelector('.social__comment-count').classList.add('visually-hidden');
  document.querySelector('.comments-loader').classList.add('visually-hidden');
  uploadInputLabel.addEventListener('keydown', function (evt) {
    if (evt.keyCode === window.data.KEY_CODE_ENTER) {
      window.utils.openImgUploadOverlay();
    }
  });
  window.data.uploadOverlayClose.addEventListener('keydown', function (evt) {
    if (evt.keyCode === window.data.KEY_CODE_ENTER) {
      window.utils.closeImgUploadOverlay();
    }
  });
})();