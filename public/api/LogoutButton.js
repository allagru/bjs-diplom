class LogoutButton {
  // создаёт объект
  constructor() {
    // объект кнопки выхода
    [this.logoutBtn] = document.getElementsByClassName('logout');
    // действие, которое будет вызываться по клику и выполнять нужные действия
    this.action = (f) => f;
    this.logoutBtn.addEventListener('click', this.logoutClick.bind(this));
  }

  // обработчик события клика по кнопке
  logoutClick(event) {
    event.preventDefault();
    this.action();
  }
}
