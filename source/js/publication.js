'use strict';

(function () {
  var url = {
    posts: 'http://jsonplaceholder.typicode.com/posts',
    users: 'http://jsonplaceholder.typicode.com/users'
  }

  // Загружает данные публикаций.
  window.backend.load(writeData, renderError, url.posts);

  // Создаёт элемент на основе шаблона, и заполняет его данными.
  // @param {object} publicationItem - Объект, свойствами которого заполняется созданный на основе шаблона элемент.
  function renderPublication(publicationItem) {
    var publicationTemplate = document.querySelector('#publication').content.querySelector('.publication');
    var newPublication = publicationTemplate.cloneNode(true);
    var listItem = document.createElement('li');

    // Это элемент списка публикаций, в котором будет содержаться каждая отдельная публикация.
    // Добавляет этому элементу классы стилизации.
    listItem.classList.add('publications__item', 'card');

    // Заполняет шаблон публикации данными из объекта.
    newPublication.querySelector('.publications__title').textContent = window.scaffolding.capitalizeFirstLetter(publicationItem.title);
    newPublication.querySelector('.publications__text').textContent = window.scaffolding.capitalizeFirstLetter(publicationItem.body);
    newPublication.querySelector('.publications__author').textContent = publicationItem.userId;

    // Добавляет шаблон, заполненный данными, в элемент списка.
    listItem.appendChild(newPublication);

    return listItem;
  }

  // Создаёт объект, и записывает в него полученные данные о публикациях.
  // Инициализирует загрузку дополнительных данных, об именах авторов публикаций.
  // @param {array} publicationArray - Массив объектов.
  function writeData(publicationArray) {
    window.publications = publicationArray;

    // Загружает дополнительные данные, объединяет эти и полученные ранее данные в один массив,
    // и на основе этого массива создаёт публикации.
    window.backend.load(renderPublicationsList, renderError, url.users);
  }

  // Выдаёт сообщение об ошибке при загрузке данных.
  // @param {object} message - Статус ответа.
  function renderError(message) {
    console.log('Не удалось загрузить данные. Статус ответа: ' + message);
  }

  // Загружает дополнительные данные, объединяет эти и полученные ранее данные в один массив,
  // и на основе этого массива создаёт публикации.
  // @param {array} names - Статус ответа.
  function renderPublicationsList(names) {
    var listPublication = document.querySelector('.publications__list');
    var customItem = listPublication.querySelectorAll('li');
    var fragment = document.createDocumentFragment();
    var publications = window.publications;

    window.names = names;


    // Удаляет базовые элементы, содержащиеся в разметке.
    window.scaffolding.deleteElems(customItem);

    // Перемешивает исходный массив, для отображения публикаций в случайном порядке.
    window.scaffolding.shuffleArray(publications);

    // Добавляет элементы одного массива в другой массив.
    window.scaffolding.joinArray(publications, names);

    // Создаёт публикацию для каждого элемента массива 'publications',
    // и добавляет этот элемент в 'fragment'.
    publications.forEach(function (item) {
      fragment.appendChild(renderPublication(item));
    });

    // Добавляет список элементов('fragment') в разметку, в список публикаций.
    listPublication.appendChild(fragment);
  }
})();
