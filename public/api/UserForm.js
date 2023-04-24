class UserForm {
  // метод создает объект
  constructor() {
    // объект формы авторизации
    this.loginForm = document.getElementById('login');
    // объект формы регистрации
    this.registerForm = document.getElementById('register');
    this.loginForm.querySelector('.button').addEventListener('click', this.loginFormAction.bind(this));
    this.registerForm.querySelector('.button').addEventListener('click', this.registerFormAction.bind(this));

    // объект окна вывода сообщений на странице авторизации
    this.loginErrorMessageBox = this.loginForm.querySelector('.ui.message');
    this.loginErrorMessageBox.style.display = 'none';
    // объект окна вывода сообщений на странице регистрации
    this.registerErrorMessageBox = this.registerForm.querySelector('.ui.message');
    this.registerErrorMessageBox.style.display = 'none';

    // функция, которая будет выполняться при попытке авторизации
    this.loginFormCallback = (f) => f;
    // функция, которая будет выполняться при попытке регистрации
    this.registerFormCallback = (f) => f;
  }

  //  метод выводит сообщение с ошибкой при авторизации
  setLoginErrorMessage(message) {
    this.loginErrorMessageBox.innerText = message;
    this.loginErrorMessageBox.style.display = 'block';
    setTimeout(() => { this.loginErrorMessageBox.style.display = 'none'; }, 5000);
  }

  //  выводит сообщение с ошибкой при регистрации
  setRegisterErrorMessage(message) {
    this.registerErrorMessageBox.innerText = message;
    this.registerErrorMessageBox.style.display = 'block';
    setTimeout(() => { this.registerErrorMessageBox.style.display = 'none'; }, 5000);
  }

  // обработчик события сабмита формы авторизации
  loginFormAction(event) {
    event.preventDefault();
    this.loginFormCallback(this.getData(this.loginForm));
    this.loginForm.reset();
  }

  //  обработчик события сабмита формы регистрации
  registerFormAction(event) {
    event.preventDefault();
    this.registerFormCallback(this.getData(this.registerForm));
    this.registerForm.reset();
  }

  // метод получения данных из переданной формы
  getData(form) {
    const login = form.querySelector('[name="email"]').value;
    const password = form.querySelector('[name="password"]').value;
    return { login, password };
  }
}
