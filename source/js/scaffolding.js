'use strict';

(function () {
  // Удаляет элементы из родительского блока.
  // @param {array} arrayElem - Массив элементов, подвергающийся очистке.
  function deleteElems(arrayElem) {
    arrayElem.forEach(function (elem) {
      elem.parentNode.removeChild(elem);
    });
  }

  // Перемешивает элементы массива между собой в случайном порядке.
  // @param {array} arrayToSort - Массив подвергающийся перемешиванию.
  function shuffleArray(arrayToSort) {
  	var j, temp;

  	for (var i = arrayToSort.length - 1; i > 0; i--) {
  		j = Math.floor(Math.random()*(i + 1));
  		temp = arrayToSort[j];
  		arrayToSort[j] = arrayToSort[i];
  		arrayToSort[i] = temp;
  	}

  	return arrayToSort;
  }

  // Устанавливает первой букве строки заглавное написание.
  // @param {array} arrayToSort - Массив подвергающийся перемешиванию.
  function capitalizeFirstLetter(sampleString) {
    var capitalizeString;

    capitalizeString = sampleString[0].toUpperCase() + sampleString.substr(1).toLowerCase();

    return capitalizeString;
  }

  window.scaffolding = {
    deleteElems: deleteElems,
    shuffleArray: shuffleArray,
    capitalizeFirstLetter: capitalizeFirstLetter
  }
})();
