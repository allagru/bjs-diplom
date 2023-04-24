class FavoritesWidget {
  // создаёт объект
  constructor() {
    // объект таблицы избранного
    this.favoritesTableBody = document.querySelector('table.table.addresses tbody');
    // объект формы для добавления пользователя в избранное
    this.addUserToFavoritesForm = document.getElementById('addUser');
    // объект окна для вывода сообщений
    this.favoritesMessageBox = document.getElementById('favoritesMessageBox');
    this.favoritesMessageBox.style.display = 'none';

    // функция, которая будет выполняться при добавлении пользователя в избранное
    this.addUserCallback = (f) => f;
    // функция, которая будет запускаться при попытке удаления пользователя из избранного
    this.removeUserCallback = (f) => f;

    this.addUserToFavoritesForm.querySelector('.button')
      .addEventListener('click', () => {
        this.addUserCallback(this.getData());
        this.addUserToFavoritesForm.reset();
      });

    this.favoritesTableBody.addEventListener('click', (event) => {
      if (event.target.closest('button')) {
        const userId = event.target.closest('tr').children[0].textContent;
        this.removeUserCallback(userId);
      }
    });
  }

  //  принимает объект и заполняет таблицу данными
  fillTable(data) {
    Object.keys(data).forEach((key) => {
      const element = data[key];
      this.favoritesTableBody.innerHTML += `
        <tr>
          <td data-addressee-id='${key}'>${key.length > 15 ? `${key.slice(0, 15)}...` : key}</td>
          <td data-addressee-name='${element}'>${element}</td>
          <td>
            <button class='ui purple icon button mini'>
            <i class='trash icon'></i>
            </button>
          </td>
        </tr>`;
    });
  }

  // очищает таблицу
  clearTable() {
    this.favoritesTableBody.innerHTML = '';
  }

  // метод получения данных из формы добавления пользователя
  getData() {
    const id = this.addUserToFavoritesForm.querySelector("[placeholder='ID']").value;
    const name = this.addUserToFavoritesForm.querySelector("[placeholder='Имя']").value;
    return { id, name };
  }

  // метод отображает сообщение (ошибку или успешность) в окне с информацией
  setMessage(isSuccess, message) {
    if (isSuccess) {
      this.favoritesMessageBox.className = 'ui message fluid success';
    } else {
      this.favoritesMessageBox.className = 'ui message fluid error';
    }

    this.favoritesMessageBox.innerText = message;
    this.favoritesMessageBox.style.display = 'block';
    setTimeout(() => { this.favoritesMessageBox.style.display = 'none'; }, 5000);
  }
}
