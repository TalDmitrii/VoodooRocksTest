'use strict';

(function () {
  function load(onLoad, onError, url) {
    var SUCCESS_RESPONSE_STATUS = 200;
    var xhr = new XMLHttpRequest();
    xhr.responseType = 'json';

    xhr.open('GET', url);

    xhr.addEventListener('load', function () {
      if (xhr.status === SUCCESS_RESPONSE_STATUS) {
        onLoad(xhr.response);
      } else {
        onError(xhr.status);
      }
    });


    xhr.addEventListener('error', function () {
      onError('Произошла ошибка соединения');
    });

    xhr.addEventListener('timeout', function () {
      onError('Запрос не успел выполниться за ' + xhr.timeout + 'мс');
    });

    xhr.send();
  }

  window.backend = {
    load: load
  }
})();
