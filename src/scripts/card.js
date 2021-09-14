export class Card {
  constructor(title, text, id, stage, author) {
    this.id = id;
    this.title = title;
    this.text = text;
    this.author = author;
    this.stage = stage;
    this.time = Card.getTimeCreateCard();
  }

  static getTimeCreateCard() {
    let year = new Date().getFullYear();
    let month = new Date().getMonth() + 1;
    if (month < 10) {
      month = "0" + month;
    }
    let day = new Date().getDate();
    let hours = new Date().getHours();
    if (hours < 10) {
      hours = "0" + hours;
    }
    let minutes = new Date().getMinutes();
    if (minutes < 10) {
      minutes = "0" + minutes;
    }
    return `${day}/${month}/${year} ${hours}:${minutes}`;
  }

  createHTML() {
    return `
    <div id="${this.id}" draggable="true" class="card" id="card">
      <div class="card__header">
            <button id="card-btn-transfer-list" type="button" class="btn card__btn--transfer">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" 
                  stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-arrow-right">
                  <line x1="5" y1="12" x2="19" y2="12"></line>
                  <polyline points="12 5 19 12 12 19"></polyline>
              </svg>
            </button>
            <button id="close-card-btn-delete" type="button" class="btn card__btn--delete">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" 
                    stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-trash-2">
                    <polyline points="3 6 5 6 21 6"></polyline>
                    <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
                    <line x1="10" y1="11" x2="10" y2="17"></line>
                    <line x1="14" y1="11" x2="14" y2="17"></line>
                </svg>
            </button>
      </div>
    
    <h3 class="card__title">${this.title}</h3>
    <div class="card__footer">
     <p class="card__author">${this.author}</p>
     <time class="card__visit-time">${this.time}</time>
    </div>
  </div>`;
  }
  
}

export class OpenCard extends Card {
  constructor (title, text, id, stage, author) {
    super (title, text, id, stage, author)
    this.stageName = this.getStageName()
  }
  getStageName () {
    let stages = document.querySelectorAll('.stages-column__title')
    for (let title of stages) {
      if (title.parentNode.parentNode.id == this.stage) {
        let result = title.innerHTML
        return result
      }
    }
  }
  createOpenCardHTML() {
    return `
    <div id="wrap-open-card" class="modal__wrap">
    <div id =${this.id} class="open-card">
    <button id="open-card-close" "class="open-card__close">
      <svg xmlns="http://www.w3.org/2000/svg" width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="#ffffff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-x"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
    </button>
    <div class="open-card__stage">
        <h3 class="open-card__stage-text">${this.stageName}</h3>
    </div>
    <h3 id="open-card-title" class="open-card__title">${this.title}</h3>
    <p id="open-card-comment" class="open-card__comment">${this.text}</p>
    <button class="open-card__author">${this.author}</button>
    <p>${this.time}</p>
    <div class="open-card__options">
        <button id="open-card__change" class="open-card__changes">Сhange</button>
        <button id="open-card-save-change" class="open-card__changes">Save changes</button>
        <button id="open-card__readiness" class="open-card__readiness">Start working</button>
        <button id="open-card__delete" class="open-card__delete">Delete task</button>
    </div>
    </div>
  </div>  
    `
  }
}

export class OpenCardDone extends OpenCard {
  constructor (title, text, id, stage, author, stageName) {
    super (title, text, id, stage, author, stageName)
  }
  createOpenCardHTML() {
    return `
    <div id="wrap-open-card" class="modal__wrap">
    <div id =${this.id} class="open-card">
    <button id="open-card-close" "class="open-card__close">
      <svg xmlns="http://www.w3.org/2000/svg" width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="#ffffff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-x"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
    </button>
    <div class="open-card__stage">
        <h3 class="open-card__stage-text">${this.stageName}</h3>
    </div>
    <h3 class="open-card__title">${this.title}</h3>
    <button class="open-card__author">${this.author}</button>
    <p>${this.time}</p>
    <div class="open-card__options">
        <button id="open-card__change" class="open-card__changes">Сhange</button>
        <button id="open-card-save-change" class="open-card__changes">Save changes</button>
        <button id="open-card__readiness" class="open-card__readiness">Start working</button>
        <button id="open-card__delete" class="open-card__delete">Delete task</button>
    </div>
    </div>
  </div>  
    `
  }
}