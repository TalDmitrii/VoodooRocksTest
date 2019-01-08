'use strict';

(function () {
  var filterSection = document.querySelector('.filter');
  var filterInput = filterSection.querySelector('.form-control');

  filterInput.addEventListener('input', function (evt) {
    var target = evt.target;
    var searchResult = target.value;
    console.log(searchResult);

    
  });
})();
