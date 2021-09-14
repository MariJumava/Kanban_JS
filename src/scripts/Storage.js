export const storage = {
  // Получить все данные из хранилки по ключу
  getDataByKey: function (key) {
    if (localStorage.getItem(key) !== null) {
      return JSON.parse(localStorage.getItem(key));
    } else {
      return [];
    }
  },
  // Добавить данные по ключу
  pushDataByKey: function (key, data) {
    let dataByKey = this.getDataByKey(key);
    dataByKey.push(data);
    localStorage.setItem(key, JSON.stringify(dataByKey));
  },
};
