"use strict";

import { storage } from "./storage.js";
import { appController } from "./appController.js";
import { cardController } from "./cardController.js";

// Кнопки окна создания
const modal = document.querySelector("#wrap-card-modal");
const fieldTitle = document.getElementById("card-modal__input-title");
const fieldText = document.getElementById("card-modal__textarea-desc");
const saveCardButton = document.getElementById("create-btn");
const cancelBtn = document.getElementById("cancel-btn");
const closeModal = document.getElementById("close-modal");
const openModalCreateCard = document.getElementById("create-card");
// Кнопки окна предупреждения in progress length === 6
const warningModal = document.querySelector("#wrap-warning-modal");
const closeWarningModal = document.getElementById("warning-cancel-btn");

const authorsList = document.querySelector("#card-avatar");
const stages = document.querySelector(".stages-columns");


const app = () => {
  appController.render();
  appController.initUserList();
  cardController.updateEventListeners();
 

  //   Окно добавления карточки
  openModalCreateCard.addEventListener("click", () => {
    appController.toggleModal(modal);
  });

  cancelBtn.addEventListener("click", () => {
    appController.toggleModal(modal);
  });

  closeModal.addEventListener("click", () => {
    appController.toggleModal(modal);
  });

  saveCardButton.addEventListener("click", () => {
    let cardValidation = document.forms["card-form"]["card-modal__input-title"].value;
    if (cardValidation == "") {
      fieldTitle.setCustomValidity("Please enter your ToDo title");
        return false;
    }
    let card = appController.buildCard(
      fieldTitle.value,
      fieldText.value,
      authorsList.value
    );
    
    storage.pushDataByKey("todos", card);
    appController.toggleModal(modal);
    appController.render();
    cardController.updateEventListeners();
  });
  // Окно предупреждения in progress length === 6
  closeWarningModal.addEventListener("click", () => {
    appController.toggleModal(warningModal);
  });


  // Клики по кнопкам карточки
  stages.onclick = function (event) {
    let btn = event.target.closest("button");
    if (btn) {
      if (!btn) return;
    switch (btn.id) {
      case "card-btn-transfer-list":
        if (!btn.id) return;
        let targetPath = btn.parentNode.parentNode.id
        cardController.transferCard(btn, targetPath);
        appController.render();
        setTimeout(() => {cardController.updateEventListeners()}, 400)
        break;

      case "close-card-btn-delete":
        if (!btn.id) return;
        targetPath = btn.parentNode.parentNode.id
        cardController.removeCard(targetPath);
        appController.render();
        setTimeout(() => {cardController.updateEventListeners()}, 400)
        break;

      case "delete-all-btn":
        if (!btn.id) return;
      
        appController.deleteAllCards(btn)
        appController.render()
        setTimeout(() => {cardController.updateEventListeners()}, 400)
        break;
    }
    } else {
      let card = event.target.closest(".card");
      if (!card) return;
      cardController.buildOpenCard(card)
      let openCard = document.querySelector('.open-card')

      if (openCard !== null) {
        openCard.onclick = function (event) {
          let btn = event.target.closest("button");
          if (!btn) return;
          let openCardWindow = document.getElementById('wrap-open-card')
          let targetPath = btn.parentNode.parentNode.id;
  
        switch (btn.id) {
          case "open-card__readiness":
            if (!btn.id) return;
            
            appController.toggleModal(openCardWindow)
            setTimeout(() => {openCard.parentNode.removeChild(openCard)}, 400)
            cardController.transferCard(btn, targetPath);
            appController.render();
            setTimeout(() => {cardController.updateEventListeners()}, 400)
            
            break;

          case "open-card__delete":
            if (!btn.id) return;

            cardController.removeCard(targetPath);
            setTimeout(() => {openCard.parentNode.removeChild(openCard)}, 400)
            appController.toggleModal(openCardWindow)
            setTimeout(() => {appController.render()}, 300);
            setTimeout(() => {cardController.updateEventListeners()}, 400)
            
          break;


          case "open-card__change":
          if (!btn.id) return;
          cardController.changeTitle();
          break;


          case "open-card-save-change":
          if (!btn.id) return;
          cardController.saveNewTitle();
          appController.render();
          setTimeout(() => {cardController.updateEventListeners()}, 400)
          break;


        }
      }
    }
    }
  },
  
  appController.render();
  cardController.updateEventListeners();
};

app();
