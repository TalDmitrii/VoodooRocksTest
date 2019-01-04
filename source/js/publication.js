'use strict';

(function () {
  window.backend.load(renderPublicationsList);

  // Создаёт элемент на основе шаблона, и заполняет его данными.
  // @param {object} publicationItem - Объект, свойствами которого заполняется созданный на основе шаблона элемент.
  function renderPublication(publicationItem) {
    var publicationTemplate = document.querySelector('#publication').content.querySelector('.publication');
    var newPublication = publicationTemplate.cloneNode(true);
    var listItem = document.createElement('li');

    listItem.classList.add('publications__item', 'card');

    newPublication.querySelector('.publications__title').textContent = publicationItem.title;
    newPublication.querySelector('.publications__text').textContent = publicationItem.body;
    newPublication.querySelector('.publications__author').textContent = publicationItem.userId;

    listItem.appendChild(newPublication);

    return listItem;
  }

  // Создаёт элементы, и импортирует их в 'listPublication'.
  // @param {array} publicationArray - Массив объектов.
  function renderPublicationsList(publicationArray) {
    var listPublication = document.querySelector('.publications__list');
    var customItem = listPublication.querySelectorAll('li');
    var fragment = document.createDocumentFragment();

    // Удаляет базовые элементы, содержащиеся в разметке.
    deleteElems(customItem);

    // Создаёт новый элемент для каждого объекта массива 'publicationArray',
    // и добавляет этот элемент в 'fragment'.
    publicationArray.forEach(function (item) {
      fragment.appendChild(renderPublication(item));
    });

    // Добавляет список элементов('fragment') в разметку, в список публикаций.
    listPublication.appendChild(fragment);

    // // Применяет библиотеку Masonry, для построения сетки, в виде кирпичной кладки.
    // $(document).ready(function(){
    //   $(listPublication).masonry({
    //     itemSelector: 'li',
    //     columnWidth: '.grid-sizer',
    //     horizontalOrder: true,
    //     gutter: '.gutter-sizer',
    //     percentPosition: true
    //   });
    // });
  }

  // Удаляет элементы из родительского блока.
  // @param {array} arrayElem - Массив элементов.
  function deleteElems(arrayElem) {
    arrayElem.forEach(function (elem) {
      elem.parentNode.removeChild(elem);
    });
  }
})();
