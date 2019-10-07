'use strict';

(function () {
  /*var makeEntity = function (imgName) {
    var tempObj = {
      url: 'photos/' + imgName + '.jpg',
      description: setTextProp(window.data.descriptionMock),
      likes: setLikes(window.data.render.LIKES_SPREAD_MAX, window.data.render.LIKES_SPREAD_MIN),
      comments: setCommentsArray(),
    };
    console.log(window.data.entity);
    return tempObj;
  };*/

  var pushEntityToArray = function (entityArr) {
    for (var j = 1; j <= window.data.render.ENTITY_LIMIT; j++) {
      entityArr.push(makeEntity(j));
    }
  };

  var setTextProp = function (textArray) {
    var length = textArray.length;
    return textArray[window.utils.getRandomNum(length)].trim();
  };

  var setCommentsArray = function () {
    var tempArray = [];
    for (var a = 0; a <= window.utils.getRandomNum(window.data.render.COMMENTS_I_DESCR_SPREAD_MAX); a++) {
      var comentEntity = {
        avatar: 'img/avatar-' + window.utils.getRandomNum(window.data.render.AVATARS_COUNT, 1) + '.svg',
        message: setTextProp(window.data.commentsMock),
        name: setTextProp(window.data.names),
      };
      tempArray.push(comentEntity);
    }
    return tempArray;
  };

  var setLikes = function (max, min) {
    return window.utils.getRandomNum(max, min);
  };

  var returnObj = function (obj) {
    window.data.entity = obj;
  };

  var logError = function (errLog) {
    console.log(errLog);
  };

  pushEntityToArray(window.data.entity);
  //window.load('https://js.dump.academy/kekstagram/data', returnObj, logError);
})();
