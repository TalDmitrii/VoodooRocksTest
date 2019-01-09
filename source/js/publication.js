'use strict';

(function () {
  var ESC_CODE = 27;
  var url = {
    posts: 'http://jsonplaceholder.typicode.com/posts',
    users: 'http://jsonplaceholder.typicode.com/users'
  }

  // Загружает данные публикаций.
  window.backend.load(writeData, renderError, url.posts);

  // Создаёт объект, и записывает в него полученные данные о публикациях.
  // Инициализирует загрузку дополнительных данных, об именах авторов публикаций.
  // @param {array} publicationArray - Массив объектов.
  function writeData(publicationArray) {
    window.publications = publicationArray;

    // Загружает дополнительные данные, объединяет эти и полученные ранее данные в один массив.
    window.backend.load(joinArray, renderError, url.users);
  }

  // Добавляет в массив публикаций имена авторов, в соответствии с 'id'-номерами.
  // @param {array} namesArray - Массив с именами авторов публикаций.
  function joinArray(namesArray) {
    var publications = window.publications;

    for (var i = 0; i <= publications.length - 1; i++) {
      for (var j = 0; j <= namesArray.length - 1; j++) {
        if (publications[i].userId === namesArray[j].id) {
          publications[i].userId = namesArray[j].name;
          break;
        }
      }
    }

    // Отрисовывает на страницу измененный массив.
    renderPublicationsList(publications);
  }

  // Делает подготовку для отрисовки элементов на страницу.
  // Отрисовывает элементы на страницу.
  // @param {array} publications - Массив публикаций.
  function renderPublicationsList(publications) {
    var listPublication = document.querySelector('.publications__list');
    var customItem = listPublication.querySelectorAll('li');
    var fragment = document.createDocumentFragment();

    // Удаляет элементы, уже содержащиеся в разметке.
    window.scaffolding.deleteElems(customItem);

    // Перемешивает исходный массив, для отображения публикаций в случайном порядке.
    window.scaffolding.shuffleArray(publications);

    // Создаёт публикацию для каждого элемента массива 'publications',
    // и добавляет этот элемент в 'fragment'.
    publications.forEach(function (item) {
      fragment.appendChild(renderPublication(item));
    });

    // Добавляет список элементов('fragment') в разметку, в список публикаций.
    listPublication.appendChild(fragment);
  }

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

  // Отрисовывает на страницу сообщение об ошибке при загрузке данных, на основе шаблона.
  // @param {object} message - Статус ответа.
  function renderError(message) {
    var messageTemplate = document.querySelector('#modal').content.querySelector('.modal');
    var newMessage = messageTemplate.cloneNode(true);
    var buttonClose = newMessage.querySelector('.close');
    var sitePage = document.querySelector('.site-page');

    // Заполняет шаблон сообщения данными.
    newMessage.querySelector('.modal-title').textContent = 'Не удалось загрузить данные';
    newMessage.querySelector('.modal-body').textContent = 'Статус ошибки ' + message;

    // Вставляет сообщение в разметку первым элементом.
    sitePage.insertBefore(newMessage, sitePage.firstChild);

    // Показывает сообщение.
    newMessage.style.display = 'block';

    // При клике на кнопку 'buttonClose' закрывает сообщение.
    buttonClose.addEventListener('click', function () {
      newMessage.style.display = 'none';
    });

    // При нажатии на клавишу ESC закрывает сообщение.
    document.addEventListener('keydown', function (evt) {
      if (evt.keyCode === ESC_CODE) {
        newMessage.style.display = 'none';
      }
    });
  }

  window.publication = {
    renderPublicationsList: renderPublicationsList
  }
})();
