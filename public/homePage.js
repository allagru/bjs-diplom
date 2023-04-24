const logoutButton = new LogoutButton();
const ratesBoard = new RatesBoard();
const moneyManager = new MoneyManager();
const favoritesWidget = new FavoritesWidget();

logoutButton.action = () => {
    ApiConnector.logout((response) => {
        if (response.success) {
            location.reload();
        }
    });
};

function getUserInformation() {
    ApiConnector.current((response) => {
        if (response.success) {
            ProfileWidget.showProfile(response.data);
        }
    });
}

function getExchangeRate() {
    ApiConnector.getStocks((response) => {
        if (response.success) {
            ratesBoard.clearTable();
            ratesBoard.fillTable(response.data);
        }
    });
}

function getInitialListOfFavorites() {
    ApiConnector.getFavorites((response) => {
        console.log(response);
        if (response.success) {
            favoritesWidget.clearTable();
            favoritesWidget.fillTable(response.data);
            moneyManager.updateUsersList(response.data);
        }
    });
}

getUserInformation();
getExchangeRate();
getInitialListOfFavorites();

setInterval(() => {
    getExchangeRate();
}, 60000);

moneyManager.addMoneyCallback = (data) => {
    ApiConnector.addMoney(data, (response) => {
        console.log(response);
        if (response.success) {
            ProfileWidget.showProfile(response.data);
        }

        moneyManager.setMessage(
            response.success,
            response.error || 'Перевод выполнен успешно'
        );
    });
};

moneyManager.conversionMoneyCallback = (data) => {
    ApiConnector.convertMoney(data, (response) => {
        if (response.success) {
            ProfileWidget.showProfile(response.data);
        }

        moneyManager.setMessage(
            response.success,
            response.error || 'Конвертация выполнена успешно'
        );
    });
};

moneyManager.sendMoneyCallback = (data) => {
    ApiConnector.transferMoney(data, (response) => {
        if (response.success) {
            ProfileWidget.showProfile(response.data);
        }

        moneyManager.setMessage(
            response.success,
            response.error || 'Конвертация выполнена успешно'
        );
    });
};

favoritesWidget.addUserCallback = (data) => {
    ApiConnector.addUserToFavorites(data, (response) => {
        if (response.success) {
            favoritesWidget.clearTable();
            favoritesWidget.fillTable(response.data);
            moneyManager.updateUsersList(response.data);
        }

        favoritesWidget.setMessage(
            response.success,
            response.error || 'Добавление пользователя выполнено успешно'
        );
    });
};

favoritesWidget.removeUserCallback = (data) => {
    ApiConnector.removeUserFromFavorites(data, (response) => {
        if (response.success) {
            favoritesWidget.clearTable();
            favoritesWidget.fillTable(response.data);
            moneyManager.updateUsersList(response.data);
        }

        favoritesWidget.setMessage(
            response.success,
            response.error || 'Удаление пользователя выполнено успешно'
        );
    });
};