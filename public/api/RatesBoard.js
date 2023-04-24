class RatesBoard {
  // создаёт объект
  constructor() {
    // объект тела таблицы для данных
    this.tableBody = document.querySelector('table.table.rates tbody');
  }

  // принимает объект и заполняет таблицу данными
  fillTable(data) {
    Object.keys(data).forEach((key) => {
      const element = data[key];
      this.tableBody.innerHTML += `
      <tr>
        <td>${key}</td>
        <td data-eur-ntc='${element}'>${element}</td>
      </tr>`;
    });
  }

  // очищает таблицу
  clearTable() {
    this.tableBody.innerHTML = '';
  }
}
