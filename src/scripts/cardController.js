import { appController } from "./appController.js";
import { storage } from "./storage.js";
import { OpenCard } from "./card.js";
import { OpenCardDone } from "./card.js";

const warningModal = document.querySelector("#wrap-warning-modal");
const confirnModal = document.getElementById("wrap-confirm-modal");
const confirnModalYes = document.getElementById("modal-yes");
const confirnModalNo = document.getElementById("modal-no");
const authorsList = document.querySelector("#card-avatar");

export const cardController = {
    updateEventListeners: function () {
        let todoCards = document.querySelectorAll('.card');
        todoCards.forEach(card => {
            card.addEventListener(`dragstart`, (evt) => {
                evt.target.classList.add(`selected`);
            });

            card.addEventListener(`dragend`, (evt) => {
                evt.target.classList.remove(`selected`);
            });
        })
        let stageColums = document.querySelectorAll('.stages-column__cards');
        stageColums.forEach(stage => {
            stage.addEventListener(`dragover`, (evt) => {
                evt.preventDefault();
                const activeElement = document.querySelector(`.selected`);
                const dropElement = evt.target;
                const isMoveable = dropElement.classList.contains(`stages-column__cards`);
                if (!isMoveable) {
                    return;
                }
                dropElement.append(activeElement);
                const todoId = parseInt(activeElement.id);
                const activeTodo = storage.getDataByKey('todos').filter(item => item['id'] === todoId)[0];
                this.deleteItemById('todos', 'id', todoId);
                activeTodo.stage = parseInt(dropElement.parentElement.id);
                storage.pushDataByKey('todos', activeTodo);

            });
            stage.addEventListener('drop', (event) => {
                let stageColums = document.querySelectorAll('.stages-column__cards');
                stageColums.forEach(stage => {
                    stage.parentElement.querySelector('span.todo-count').textContent = stage.childElementCount;
                })
            });
        })
    },
    // Удалить данные по ключу и по атрибуту
    deleteItemById: function (key, itemKey, value) {
        if (localStorage.getItem(key)) {
            let dataByKey = storage.getDataByKey(key);
            localStorage.setItem(key, JSON.stringify(dataByKey.filter(item => item[itemKey] !== value)));
        } else {
            this.deleteItemById("todos", "stage", stageId);
            appController.render();

        }
    },
    transferCard: function (btn, targetPath) {
        let data = storage.getDataByKey('todos')
        let currentCard = data.find(elem => elem.id == targetPath)


        if (btn.parentNode.parentNode.parentNode.parentNode.id == 1) {
            // || btn.parentNode.parentNode.childNodes[3].childNodes[1].innerHTML == 1) 
            let dataLenght = appController.checkLength(2)
            if (dataLenght === 6) {
                appController.toggleModal(warningModal);
            } else {
                currentCard.stage = currentCard.stage + 1
                cardController.deleteItemById('todos', 'id', currentCard.id)
                storage.pushDataByKey('todos', currentCard)

            }
        } else {
            if (currentCard.stage !== 3) {
                currentCard.stage = currentCard.stage + 1
                cardController.deleteItemById('todos', 'id', currentCard.id)
                storage.pushDataByKey('todos', currentCard)

            } else {
                currentCard.stage = 1
                cardController.deleteItemById('todos', 'id', currentCard.id)
                storage.pushDataByKey('todos', currentCard)

            }
        }
    },
    removeCard: function (targetPath) {
        let data = storage.getDataByKey('todos')

        let currentCard = data.find(elem => elem.id == targetPath)
        confirnModalYes.addEventListener('click', () => {
            cardController.deleteItemById('todos', 'id', currentCard.id)
            appController.render();
            setTimeout(() => { this.updateEventListeners() }, 400)
            appController.toggleModalOff(confirnModal)
        })
        confirnModalNo.addEventListener('click', () => {
            appController.toggleModalOff(confirnModal)
        })

        if (currentCard.stage == 2) {
            appController.toggleModalOn(confirnModal)
        } else {
            cardController.deleteItemById('todos', 'id', currentCard.id)
            appController.render();
            setTimeout(() => { this.updateEventListeners() }, 400)


        }
    
    },

    displayAuthor: function (person) {
        authorsList.append(new Option(person.name, person.name));
        return authorsList;
    },
    buildOpenCard: function(card) {
        const {title, text, id, stage, author} = storage.getDataByKey('todos').find(obj => card.id == obj.id)
        let stages = document.querySelectorAll('.stages-column--item')
        for (let $stage of stages) {
        if ($stage.id == stage) {
            if ($stage.id != 3) {
                $stage.childNodes[3].insertAdjacentHTML('beforeend', new OpenCard(title, text, id, stage, author).createOpenCardHTML())
                } else {
                    $stage.childNodes[3].insertAdjacentHTML('beforeend', new OpenCardDone(title, text, id, stage, author).createOpenCardHTML()) 
                }
            }
        }
        const openCard = document.querySelector("#wrap-open-card") 
        setTimeout(() => {appController.toggleModal(openCard)}, 100)

        document.querySelector('#open-card-close').addEventListener('click', () => {
        appController.toggleModal(openCard)
        setTimeout(() => {openCard.parentNode.removeChild(openCard)}, 400)
        })
    
    },

    // Изменение данных в открытой карточке
    changeTitle: function() {
    let openCardTitle = document.getElementById("open-card-title");
    let openCardComment = document.getElementById("open-card-comment");

    // Замена заголовка на инпут
    let titleInput = document.createElement("textarea");
    titleInput.innerHTML = openCardTitle.innerHTML;
    titleInput.className = "new-title__input";
    openCardTitle.replaceWith(titleInput);
    // Замена комментария на инпут
    let commentInput = document.createElement("textarea");
    commentInput.innerHTML = openCardComment.innerHTML;
    commentInput.className = "new-comment__input";
    openCardComment.replaceWith(commentInput);
    },

    saveNewTitle: function () {
    // Перезапись заголовок в хранилке 
    let titleInput = document.querySelector(".new-title__input");
    let currentCardId = titleInput.parentNode.id;
    let data = storage.getDataByKey("todos");
    let currentCard = data.find((elem) => elem.id == currentCardId);

    let changedTitle = titleInput.value;
    currentCard.title = changedTitle;


    // Перезапись комментария в хранилке 
    let commentInput = document.querySelector(".new-comment__input");
    let changedComment = commentInput.value;
    currentCard.text = changedComment;



    cardController.deleteItemById('todos', 'id', currentCard.id)
    storage.pushDataByKey('todos', currentCard);

    appController.render();
  },
};
