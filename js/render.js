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
  var RANDOM_FILTER_LIMIT = 10;
  var filterBtns = document.querySelectorAll('.img-filters__button');
  var topFilterForm = document.querySelector('.img-filters__form');

  var deleteNodes = function (nodes) {
    for (var i = 0; i < nodes.length; i++) {
      nodes[i].remove();
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
      var socialCommentsItems = socialCommentsList.querySelectorAll('.social__comment');
      deleteNodes(socialCommentsItems);
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

  var appendNewComments = function (nodeElements) {
    var fragment = document.createDocumentFragment();
    console.dir(nodeElements);
    for (var i = 0; i < nodeElements.length; i++) {
      fragment.appendChild(renderComments(nodeElements[i]));
    }
    socialCommentsList.appendChild(fragment);
  };

  var showTopFilter = function () {
    topFilter.classList.remove('img-filters--inactive');
  };
  
  var setActiveForBtn = function (currentBtn) {
    filterBtns.forEach(function (btn){
      btn.classList.remove('img-filters__button--active');
    });
    currentBtn.classList.add('img-filters__button--active');
  };

  var getRandomArray = function (array) {
    var arrayForRandom = array.slice().sort(() => Math.random() - 0.5);
    arrayForRandom.splice(RANDOM_FILTER_LIMIT);
    return arrayForRandom;
  };
  
  var getDiscussedArray = function (array) {
    var arrayForDiscussed = array.slice().sort((a, b) =>  b.likes - a.likes);
    return arrayForDiscussed;
  };

  var topFilterBtnClickHandler = function (obj) {
    return function (evt) {
      if (evt.target.id === 'filter-popular') {
        setActiveForBtn(evt.target);
        appendPhotos(obj);
      } else if (evt.target.id === 'filter-random') {
        setActiveForBtn(evt.target);
        var randomArray = getRandomArray(obj);
        appendPhotos(randomArray);
      } else if (evt.target.id === 'filter-discussed') {
        setActiveForBtn(evt.target);
        var discussedArray = getDiscussedArray(obj);
        appendPhotos(discussedArray);
      }
    };
  };

  var addListeners = function (obj) {
    var debouncedEvent = window.utils.debounce(topFilterBtnClickHandler(obj), 500, false);
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
