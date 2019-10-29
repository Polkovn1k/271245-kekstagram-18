'use strict';

(function () {
  var similarPhotoTemplate = document.querySelector('#picture').content.querySelector('.picture');
  var picturesContainer = document.querySelector('.pictures');
  var photoBlock = document.querySelector('.big-picture');
  var photoBlockCancel = photoBlock.querySelectorAll('.big-picture__cancel');
  var commentBlock = document.querySelector('#photo').content.querySelector('.social__comment');
  var socialCommentsList = document.querySelector('.social__comments');
  var uploadInputLabel = document.querySelector('.img-upload__label');
  var topFilter = document.querySelector('.img-filters');
  var topFilterBtns = {
    popular: topFilter.querySelector('#filter-popular'),
    random: topFilter.querySelector('#filter-random'),
    discussed: topFilter.querySelector('#filter-discussed'),
  };

  var clearPreviousComments = function () {
    var socialCommentsItems = socialCommentsList.querySelectorAll('.social__comment');
    for (var i = 0; i < socialCommentsItems.length; i++) {
      socialCommentsItems[i].remove();
    }
  };

  var renderPhoto = function (photoArr) {
    var photoElement = similarPhotoTemplate.cloneNode(true);
    photoElement.querySelector('.picture__img').src = photoArr.url;
    photoElement.querySelector('.picture__likes').textContent = photoArr.likes;
    photoElement.querySelector('.picture__comments').textContent = photoArr.comments.length;
    return photoElement;
  };

  var renderBigPhotoAndDescription = function (photo) {
    photoBlock.querySelector('.big-picture__img img').src = photo.url;
    photoBlock.querySelector('.likes-count').textContent = photo.likes;
    photoBlock.querySelector('.social__caption').textContent = photo.description;
    photoBlock.querySelector('.comments-count').textContent = photo.comments.length;
  };

  var addListener = function (element, objProps) {
    element.addEventListener('click', function (evt) {
      evt.preventDefault();
      clearPreviousComments();
      renderBigPhotoAndDescription(objProps);
      appendNewComments(objProps.comments);
      photoBlock.classList.remove('hidden');
    });
  };

  var appendPhotos = function (arr) {
    var fragment = document.createDocumentFragment();
    for (var i = 0; i < arr.length; i++) {
      var props = arr[i];
      var imgNode = renderPhoto(props);
      fragment.appendChild(imgNode);
      addListener(imgNode, props);
    }
    picturesContainer.appendChild(fragment);
  };

  var renderComments = function (commentsArr) {
    var nodeElement = commentBlock.cloneNode(true);
    var img = nodeElement.querySelector('.social__picture');
    img.src = commentsArr.avatar;
    img.alt = commentsArr.name;
    nodeElement.querySelector('.social__text').textContent = commentsArr.message;
    return nodeElement;
  };

  var appendNewComments = function (nodeElements) {
    var fragment = document.createDocumentFragment();
    for (var i = 0; i < nodeElements.length; i++) {
      fragment.appendChild(renderComments(nodeElements[i]));
    }
    socialCommentsList.appendChild(fragment);
  };

  var showTopFilter = function () {
    topFilter.classList.remove('img-filters--inactive');
  };

  var addListeners = function (obj) {
    topFilterBtns.random.addEventListener('click', function (evt) {
      var arrayForRandom = obj.slice();
      arrayForRandom.sort(() => Math.random() - 0.5);
      console.dir(arrayForRandom);
      console.dir(obj);
    });
  };

  var renderItems = function (obj) {
    appendPhotos(obj);
    showTopFilter();
    addListeners(obj);
  };

  var hideBigPhotoOverlay = function (overlay, btns) {
    var btnHandler = window.utils.btnClickHandler(function () {
      overlay.classList.add('hidden');
    });
    var keydownHandler = window.utils.escKeydownHandler(function () {
      overlay.classList.add('hidden');
    });
    for (var i = 0; i < btns.length; i++) {
      btns[i].addEventListener('click', btnHandler);
    }
    overlay.addEventListener('click', btnHandler);
    document.addEventListener('keydown', keydownHandler);
  };

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

  document.querySelector('.social__comment-count').classList.add('visually-hidden');
  document.querySelector('.comments-loader').classList.add('visually-hidden');

  window.load('https://js.dump.academy/kekstagram/data', renderItems, window.logError);
  hideBigPhotoOverlay(photoBlock, photoBlockCancel);
})();
