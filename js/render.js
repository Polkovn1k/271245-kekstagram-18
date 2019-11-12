'use strict';

(function () {

  var RANDOM_FILTER_LIMIT = 10;
  var SHOW_COMMENTS_LIMIT = 5;
  var similarPhotoTemplate = document.querySelector('#picture').content.querySelector('.picture');
  var picturesContainer = document.querySelector('.pictures');
  var photoBlock = document.querySelector('.big-picture');
  var photoBlockCancel = photoBlock.querySelector('.big-picture__cancel');
  var commentBlock = document.querySelector('#photo').content.querySelector('.social__comment');
  var socialCommentsList = document.querySelector('.social__comments');
  var topFilter = document.querySelector('.img-filters');
  var filterBtns = document.querySelectorAll('.img-filters__button');
  var topFilterForm = document.querySelector('.img-filters__form');
  var loadComments = document.querySelector('.comments-loader');


  var deleteNodes = function (nodes) {
    nodes.forEach(function (item) {
      item.remove();
    });
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
      var socialCommentsItems = socialCommentsList.querySelectorAll('.social__comment');
      deleteNodes(socialCommentsItems);
      renderBigPhotoAndDescription(objProps);
      showComments(objProps.comments);
      photoBlock.classList.remove('hidden');
    });
  };

  var appendPhotos = function (arr) {
    var fragment = document.createDocumentFragment();
    arr.forEach(function (item) {
      var imgNode = renderPhoto(item);
      fragment.appendChild(imgNode);
      addListener(imgNode, item);
    });
    deleteNodes(document.querySelectorAll('.picture'));
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

  var comments = function (arr) {
    var fragment = document.createDocumentFragment();
    arr.forEach(function (item) {
      fragment.appendChild(renderComments(item));
    });
    socialCommentsList.appendChild(fragment);
  };

  var hideLoadBtn = function () {
    loadComments.classList.add('visually-hidden');
  };

  var appendNewComments = function (commentsArr, startIndex) {
    var newComments = commentsArr.slice(startIndex, startIndex + SHOW_COMMENTS_LIMIT);
    comments(newComments);
    if (newComments.length < SHOW_COMMENTS_LIMIT) {
      hideLoadBtn();
    }
  };

  var showComments = function (commentsArr) {
    if (commentsArr.length <= SHOW_COMMENTS_LIMIT) {
      comments(commentsArr);
    } else {
      loadComments.classList.remove('visually-hidden');
      var startIndex = 0;
      var newArr = commentsArr.slice(startIndex, startIndex + SHOW_COMMENTS_LIMIT);
      comments(newArr);
      window.addCommentBtnClickHandler = function () {
        startIndex += SHOW_COMMENTS_LIMIT;
        appendNewComments(commentsArr, startIndex);
      };
      loadComments.addEventListener('click', window.addCommentBtnClickHandler);
    }
  };

  var showTopFilter = function () {
    topFilter.classList.remove('img-filters--inactive');
  };

  var setActiveForBtn = function (currentBtn) {
    filterBtns.forEach(function (btn) {
      btn.classList.remove('img-filters__button--active');
    });
    currentBtn.classList.add('img-filters__button--active');
  };

  var getRandomArray = function (array) {
    var arrayForRandom = array.slice().sort(function () {
      return Math.random() - 0.5;
    });
    arrayForRandom.splice(RANDOM_FILTER_LIMIT);
    return arrayForRandom;
  };

  var getDiscussedArray = function (array) {
    var arrayForDiscussed = array.slice().sort(function (a, b) {
      return b.likes - a.likes;
    });
    return arrayForDiscussed;
  };

  var topFilterBtnClickHandler = function (evt, photos) {
    if (evt.target.id === 'filter-random') {
      photos = getRandomArray(photos);
    }
    if (evt.target.id === 'filter-discussed') {
      photos = getDiscussedArray(photos);
    }
    setActiveForBtn(evt.target);
    appendPhotos(photos);
  };

  var addListeners = function (obj) {
    var debouncedEvent = window.utils.debounce(function (evt) {
      topFilterBtnClickHandler(evt, obj);
    }, 500);
    topFilterForm.addEventListener('click', debouncedEvent);
  };

  var renderItems = function (obj) {
    appendPhotos(obj);
    showTopFilter();
    addListeners(obj);
  };

  var hideBigPhotoOverlay = function (overlay, btns) {
    var btnHandler = window.utils.btnClickHandler(function () {
      overlay.classList.add('hidden');
      loadComments.removeEventListener('click', window.addCommentBtnClickHandler);
    });
    var keydownHandler = window.utils.escKeydownHandler(function () {
      overlay.classList.add('hidden');
      loadComments.removeEventListener('click', window.addCommentBtnClickHandler);
    });
    btns.addEventListener('click', btnHandler);
    overlay.addEventListener('click', btnHandler);
    document.addEventListener('keydown', keydownHandler);
  };

  window.data.uploadOverlayClose.addEventListener('keydown', function (evt) {
    if (evt.keyCode === window.data.KEY_CODE_ENTER) {
      window.utils.closeImgUploadOverlay();
    }
  });

  var loadError = function (message) {
    window.utils.closeImgUploadOverlay();
    var errorOverlay = window.modals.show(document.querySelector('#error').content.querySelector('.load-error'));
    var errorBtn = errorOverlay.querySelectorAll('.error__btn');
    errorOverlay.querySelector('.error__text').innerText = message;
    window.modals.addEvents(errorOverlay, errorBtn);
  };

  document.querySelector('.social__comment-count').classList.add('visually-hidden');
  document.querySelector('.comments-loader').classList.add('visually-hidden');

  window.load('https://js.dump.academy/kekstagram/data', renderItems, loadError);
  hideBigPhotoOverlay(photoBlock, photoBlockCancel);
})();
