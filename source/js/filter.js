'use strict';

(function () {
  var filterSection = document.querySelector('.filter');
  var filterInput = filterSection.querySelector('.form-control');

  // Сравнивает содержимое поля 'input' с именами авторов публикаций.
  filterInput.addEventListener('input', function (evt) {
    // При наступлении события берёт значение поля 'input',
    // и массив имён авторов публикаций.
    var target = evt.target;
    var inputResult = target.value;
    var publications = window.publications;
    var listPublications = [];

    // Проверяет массив имён авторов публикаций.
    for (var i = 0; i <= publications.length - 1; i++) {
      // Принимает имя автора публикации из свойства объекта 'userId',
      // и разбивает его на массив символов.
      var authorName = publications[i].userId;
      var authorNameLettersArray = authorName.split('');
      var authorNameString;

      // Устанавливает длину массива, содержащего имя, равной длине строки
      // в поле 'input'.
      authorNameLettersArray.length = inputResult.length;

      // Собирает обратно в строку имя автора публикации.
      authorNameString = authorNameLettersArray.join('');

      // Проверяет на соответствие укороченное имя автора и содержимое поля 'input'.
      // Если условие выполняется, то вносит публикацию данного автора в массив,
      // который будет впоследствии отрисован на странице.
      if (authorNameString.toLowerCase() === inputResult.toLowerCase()) {
        filterInput.style.border = '';
        listPublications.push(publications[i]);
      }
    }

    // Если совпадающих имён нет, выделяет поле 'input'.
    if (listPublications.length === 0) {
      filterInput.style.border = '1px solid red';
    }

    window.publication.renderPublicationsList(listPublications);
  });
})();
