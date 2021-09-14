import { storage } from "./storage.js";
import { Card } from "./card.js";
import { cardController } from "./cardController.js";
import { getUserData } from "./serviceApi.js";



export const appController = {

  render: function () {
    let todosData = storage.getDataByKey('todos');
    let newData = todosData.map(function (card) {
      return new Card(card.title, card.text, card.id, card.stage, card.author)
    })
    let stages = document.querySelectorAll('.stages-column--item')
    for (let stage of stages) {
      if (todosData !== null) {
        let filteredData = newData.filter(function (card) {
          return stage.id == card.stage
        });
        stage.querySelector('span.todo-count').textContent = filteredData.length;
        stage.childNodes[3].innerHTML = filteredData.map(card => card.createHTML(card)).join(' ');
      } else return

    }
  },
  toggleModal: function (elem) {
    elem.classList.toggle("active");
  },

  toggleModalOn: function (elem) {
    elem.classList.add("active");
  },

  toggleModalOff: function (elem) {
    elem.classList.remove("active");
  },

  checkLength: function(stage) {
    let data = storage.getDataByKey('todos')
    let filteredDataLength = data.filter(card => card.stage === stage).length
    return filteredDataLength
  },
  
  // buildCard: function (title, text, author) {
  //   let nextId = 1;
  //   if (localStorage.getItem("nextCardId") !== null) {
  //     nextId = parseInt(JSON.parse(localStorage.getItem("nextCardId")));
  //     localStorage.setItem("nextCardId", JSON.stringify(++nextId));
  //   } else {
  //     localStorage.setItem("nextCardId", JSON.stringify(nextId));
  //   }
  //   return new Card(title, text, nextId, 1, author);
  // },

  initUserList: function () {
    getUserData().then((authorsList) =>
      authorsList.forEach((author) => {
        cardController.displayAuthor(author);
      })
    );
  },
  
    
  buildCard: function (title, text, author) {
    let nextId = 1;
    if (localStorage.getItem("nextCardId") !== null) {
      nextId = parseInt(JSON.parse(localStorage.getItem("nextCardId")));
      localStorage.setItem("nextCardId", JSON.stringify(++nextId));
      } else {
      localStorage.setItem("nextCardId", JSON.stringify(nextId));
      }
      return new Card(title, text, nextId, 1, author);
  },
    initUserList: function()  {
      getUserData().then((authorsList) =>
    authorsList.forEach((author) => {
      cardController.displayAuthor(author);
    })
  );
    },
    deleteAllCards: function(btn) {
      let data = storage.getDataByKey('todos')
      const confirmModal = document.getElementById("wrap-confirm-modal");
      const confirnModalYes = document.getElementById("modal-yes");
      const confirnModalNo = document.getElementById("modal-no");
      


    if (+btn.parentNode.parentNode.id === 2) {
      this.toggleModalOn(confirmModal)
      confirnModalYes.addEventListener('click', () => {
        let filteredData = data.filter(elem => elem.stage != btn.parentNode.parentNode.id)
        localStorage.removeItem('todos')
        storage.pushDataByKey('todos', filteredData)
        localStorage.setItem('todos', JSON.stringify(filteredData));
        this.toggleModalOff(confirmModal)
        this.render()

      })
      confirnModalNo.addEventListener('click', () => {
        this.toggleModalOff(confirmModal)
      })
    } else {
      let filteredData = data.filter(elem => elem.stage != btn.parentNode.parentNode.id)

      localStorage.removeItem('todos')
      storage.pushDataByKey('todos', filteredData)
      localStorage.setItem('todos', JSON.stringify(filteredData));
    }
  },



  //   localStorage.removeItem('todos')
  //   storage.pushDataByKey('todos', filteredData)
  //   localStorage.setItem('todos', JSON.stringify(filteredData));
  // }
};

