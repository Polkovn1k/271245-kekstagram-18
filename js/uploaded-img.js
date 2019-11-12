'use strict';

(function () {

  var FILE_TYPES = ['gif', 'jpg', 'jpeg', 'png', 'wepb'];

  var overlay = window.data.imgUploadOverlay;
  var fileChooser = window.data.uploadInput;
  var preview = window.data.uploadedImg;

  var thumbnails = function (img) {
    overlay.querySelectorAll('.effects__preview').forEach(function (item) {
      item.style.backgroundImage = 'url(' + img + ')';
    });
  };

  fileChooser.addEventListener('change', function () {
    var file = fileChooser.files[0];
    var fileName = file.name.toLowerCase();

    var matches = FILE_TYPES.some(function (it) {
      return fileName.endsWith(it);
    });

    if (matches) {
      var reader = new FileReader();

      reader.addEventListener('load', function () {
        thumbnails(reader.result);
        preview.src = reader.result;
      });

      reader.readAsDataURL(file);
    }
  });

})();
