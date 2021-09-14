// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles
parcelRequire = (function (modules, cache, entry, globalName) {
  // Save the require from previous bundle to this closure if any
  var previousRequire = typeof parcelRequire === 'function' && parcelRequire;
  var nodeRequire = typeof require === 'function' && require;

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire = typeof parcelRequire === 'function' && parcelRequire;
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        // Try the node require function if it exists.
        if (nodeRequire && typeof name === 'string') {
          return nodeRequire(name);
        }

        var err = new Error('Cannot find module \'' + name + '\'');
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;
      localRequire.cache = {};

      var module = cache[name] = new newRequire.Module(name);

      modules[name][0].call(module.exports, localRequire, module, module.exports, this);
    }

    return cache[name].exports;

    function localRequire(x){
      return newRequire(localRequire.resolve(x));
    }

    function resolve(x){
      return modules[name][1][x] || x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;
  newRequire.register = function (id, exports) {
    modules[id] = [function (require, module) {
      module.exports = exports;
    }, {}];
  };

  var error;
  for (var i = 0; i < entry.length; i++) {
    try {
      newRequire(entry[i]);
    } catch (e) {
      // Save first error but execute all entries
      if (!error) {
        error = e;
      }
    }
  }

  if (entry.length) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(entry[entry.length - 1]);

    // CommonJS
    if (typeof exports === "object" && typeof module !== "undefined") {
      module.exports = mainExports;

    // RequireJS
    } else if (typeof define === "function" && define.amd) {
     define(function () {
       return mainExports;
     });

    // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }

  // Override the current require with this new one
  parcelRequire = newRequire;

  if (error) {
    // throw error from earlier, _after updating parcelRequire_
    throw error;
  }

  return newRequire;
})({"scripts/storage.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.storage = void 0;
var storage = {
  // Получить все данные из хранилки по ключу
  getDataByKey: function getDataByKey(key) {
    if (localStorage.getItem(key) !== null) {
      return JSON.parse(localStorage.getItem(key));
    } else {
      return [];
    }
  },
  // Добавить данные по ключу
  pushDataByKey: function pushDataByKey(key, data) {
    var dataByKey = this.getDataByKey(key);
    dataByKey.push(data);
    localStorage.setItem(key, JSON.stringify(dataByKey));
  }
};
exports.storage = storage;
},{}],"scripts/card.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.OpenCardDone = exports.OpenCard = exports.Card = void 0;

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _createForOfIteratorHelper(o, allowArrayLike) { var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"]; if (!it) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = it.call(o); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it.return != null) it.return(); } finally { if (didErr) throw err; } } }; }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var Card = /*#__PURE__*/function () {
  function Card(title, text, id, stage, author) {
    _classCallCheck(this, Card);

    this.id = id;
    this.title = title;
    this.text = text;
    this.author = author;
    this.stage = stage;
    this.time = Card.getTimeCreateCard();
  }

  _createClass(Card, [{
    key: "createHTML",
    value: function createHTML() {
      return "\n    <div id=\"".concat(this.id, "\" draggable=\"true\" class=\"card\" id=\"card\">\n      <div class=\"card__header\">\n            <button id=\"card-btn-transfer-list\" type=\"button\" class=\"btn card__btn--transfer\">\n              <svg xmlns=\"http://www.w3.org/2000/svg\" width=\"16\" height=\"16\" viewBox=\"0 0 24 24\" fill=\"none\" \n                  stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\" class=\"feather feather-arrow-right\">\n                  <line x1=\"5\" y1=\"12\" x2=\"19\" y2=\"12\"></line>\n                  <polyline points=\"12 5 19 12 12 19\"></polyline>\n              </svg>\n            </button>\n            <button id=\"close-card-btn-delete\" type=\"button\" class=\"btn card__btn--delete\">\n                <svg xmlns=\"http://www.w3.org/2000/svg\" width=\"16\" height=\"16\" viewBox=\"0 0 24 24\" fill=\"none\" \n                    stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\" class=\"feather feather-trash-2\">\n                    <polyline points=\"3 6 5 6 21 6\"></polyline>\n                    <path d=\"M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2\"></path>\n                    <line x1=\"10\" y1=\"11\" x2=\"10\" y2=\"17\"></line>\n                    <line x1=\"14\" y1=\"11\" x2=\"14\" y2=\"17\"></line>\n                </svg>\n            </button>\n      </div>\n    \n    <h3 class=\"card__title\">").concat(this.title, "</h3>\n    <div class=\"card__footer\">\n     <p class=\"card__author\">").concat(this.author, "</p>\n     <time class=\"card__visit-time\">").concat(this.time, "</time>\n    </div>\n  </div>");
    }
  }], [{
    key: "getTimeCreateCard",
    value: function getTimeCreateCard() {
      var year = new Date().getFullYear();
      var month = new Date().getMonth() + 1;

      if (month < 10) {
        month = "0" + month;
      }

      var day = new Date().getDate();
      var hours = new Date().getHours();

      if (hours < 10) {
        hours = "0" + hours;
      }

      var minutes = new Date().getMinutes();

      if (minutes < 10) {
        minutes = "0" + minutes;
      }

      return "".concat(day, "/").concat(month, "/").concat(year, " ").concat(hours, ":").concat(minutes);
    }
  }]);

  return Card;
}();

exports.Card = Card;

var OpenCard = /*#__PURE__*/function (_Card) {
  _inherits(OpenCard, _Card);

  var _super = _createSuper(OpenCard);

  function OpenCard(title, text, id, stage, author) {
    var _this;

    _classCallCheck(this, OpenCard);

    _this = _super.call(this, title, text, id, stage, author);
    _this.stageName = _this.getStageName();
    return _this;
  }

  _createClass(OpenCard, [{
    key: "getStageName",
    value: function getStageName() {
      var stages = document.querySelectorAll('.stages-column__title');

      var _iterator = _createForOfIteratorHelper(stages),
          _step;

      try {
        for (_iterator.s(); !(_step = _iterator.n()).done;) {
          var title = _step.value;

          if (title.parentNode.parentNode.id == this.stage) {
            var result = title.innerHTML;
            return result;
          }
        }
      } catch (err) {
        _iterator.e(err);
      } finally {
        _iterator.f();
      }
    }
  }, {
    key: "createOpenCardHTML",
    value: function createOpenCardHTML() {
      return "\n    <div id=\"wrap-open-card\" class=\"modal__wrap\">\n    <div id =".concat(this.id, " class=\"open-card\">\n    <button id=\"open-card-close\" \"class=\"open-card__close\">\n      <svg xmlns=\"http://www.w3.org/2000/svg\" width=\"26\" height=\"26\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"#ffffff\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\" class=\"feather feather-x\"><line x1=\"18\" y1=\"6\" x2=\"6\" y2=\"18\"/><line x1=\"6\" y1=\"6\" x2=\"18\" y2=\"18\"/></svg>\n    </button>\n    <div class=\"open-card__stage\">\n        <h3 class=\"open-card__stage-text\">").concat(this.stageName, "</h3>\n    </div>\n    <h3 id=\"open-card-title\" class=\"open-card__title\">").concat(this.title, "</h3>\n    <p id=\"open-card-comment\" class=\"open-card__comment\">").concat(this.text, "</p>\n    <button class=\"open-card__author\">").concat(this.author, "</button>\n    <p>").concat(this.time, "</p>\n    <div class=\"open-card__options\">\n        <button id=\"open-card__change\" class=\"open-card__changes\">\u0421hange</button>\n        <button id=\"open-card-save-change\" class=\"open-card__changes\">Save changes</button>\n        <button id=\"open-card__readiness\" class=\"open-card__readiness\">Start working</button>\n        <button id=\"open-card__delete\" class=\"open-card__delete\">Delete task</button>\n    </div>\n    </div>\n  </div>  \n    ");
    }
  }]);

  return OpenCard;
}(Card);

exports.OpenCard = OpenCard;

var OpenCardDone = /*#__PURE__*/function (_OpenCard) {
  _inherits(OpenCardDone, _OpenCard);

  var _super2 = _createSuper(OpenCardDone);

  function OpenCardDone(title, text, id, stage, author, stageName) {
    _classCallCheck(this, OpenCardDone);

    return _super2.call(this, title, text, id, stage, author, stageName);
  }

  _createClass(OpenCardDone, [{
    key: "createOpenCardHTML",
    value: function createOpenCardHTML() {
      return "\n    <div id=\"wrap-open-card\" class=\"modal__wrap\">\n    <div id =".concat(this.id, " class=\"open-card\">\n    <button id=\"open-card-close\" \"class=\"open-card__close\">\n      <svg xmlns=\"http://www.w3.org/2000/svg\" width=\"26\" height=\"26\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"#ffffff\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\" class=\"feather feather-x\"><line x1=\"18\" y1=\"6\" x2=\"6\" y2=\"18\"/><line x1=\"6\" y1=\"6\" x2=\"18\" y2=\"18\"/></svg>\n    </button>\n    <div class=\"open-card__stage\">\n        <h3 class=\"open-card__stage-text\">").concat(this.stageName, "</h3>\n    </div>\n    <h3 class=\"open-card__title\">").concat(this.title, "</h3>\n    <button class=\"open-card__author\">").concat(this.author, "</button>\n    <p>").concat(this.time, "</p>\n    <div class=\"open-card__options\">\n        <button id=\"open-card__change\" class=\"open-card__changes\">\u0421hange</button>\n        <button id=\"open-card-save-change\" class=\"open-card__changes\">Save changes</button>\n        <button id=\"open-card__readiness\" class=\"open-card__readiness\">Start working</button>\n        <button id=\"open-card__delete\" class=\"open-card__delete\">Delete task</button>\n    </div>\n    </div>\n  </div>  \n    ");
    }
  }]);

  return OpenCardDone;
}(OpenCard);

exports.OpenCardDone = OpenCardDone;
},{}],"scripts/cardController.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.cardController = void 0;

var _appController = require("./appController.js");

var _storage = require("./storage.js");

var _card = require("./card.js");

function _createForOfIteratorHelper(o, allowArrayLike) { var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"]; if (!it) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = it.call(o); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it.return != null) it.return(); } finally { if (didErr) throw err; } } }; }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

var warningModal = document.querySelector("#wrap-warning-modal");
var confirnModal = document.getElementById("wrap-confirm-modal");
var confirnModalYes = document.getElementById("modal-yes");
var confirnModalNo = document.getElementById("modal-no");
var authorsList = document.querySelector("#card-avatar");
var cardController = {
  updateEventListeners: function updateEventListeners() {
    var _this = this;

    var todoCards = document.querySelectorAll('.card');
    todoCards.forEach(function (card) {
      card.addEventListener("dragstart", function (evt) {
        evt.target.classList.add("selected");
      });
      card.addEventListener("dragend", function (evt) {
        evt.target.classList.remove("selected");
      });
    });
    var stageColums = document.querySelectorAll('.stages-column__cards');
    stageColums.forEach(function (stage) {
      stage.addEventListener("dragover", function (evt) {
        evt.preventDefault();
        var activeElement = document.querySelector(".selected");
        var dropElement = evt.target;
        var isMoveable = dropElement.classList.contains("stages-column__cards");

        if (!isMoveable) {
          return;
        }

        dropElement.append(activeElement);
        var todoId = parseInt(activeElement.id);

        var activeTodo = _storage.storage.getDataByKey('todos').filter(function (item) {
          return item['id'] === todoId;
        })[0];

        _this.deleteItemById('todos', 'id', todoId);

        activeTodo.stage = parseInt(dropElement.parentElement.id);

        _storage.storage.pushDataByKey('todos', activeTodo);
      });
      stage.addEventListener('drop', function (event) {
        var stageColums = document.querySelectorAll('.stages-column__cards');
        stageColums.forEach(function (stage) {
          stage.parentElement.querySelector('span.todo-count').textContent = stage.childElementCount;
        });
      });
    });
  },
  // Удалить данные по ключу и по атрибуту
  deleteItemById: function deleteItemById(key, itemKey, value) {
    if (localStorage.getItem(key)) {
      var dataByKey = _storage.storage.getDataByKey(key);

      localStorage.setItem(key, JSON.stringify(dataByKey.filter(function (item) {
        return item[itemKey] !== value;
      })));
    } else {
      this.deleteItemById("todos", "stage", stageId);

      _appController.appController.render();
    }
  },
  transferCard: function transferCard(btn, targetPath) {
    var data = _storage.storage.getDataByKey('todos');

    var currentCard = data.find(function (elem) {
      return elem.id == targetPath;
    });

    if (btn.parentNode.parentNode.parentNode.parentNode.id == 1) {
      // || btn.parentNode.parentNode.childNodes[3].childNodes[1].innerHTML == 1) 
      var dataLenght = _appController.appController.checkLength(2);

      if (dataLenght === 6) {
        _appController.appController.toggleModal(warningModal);
      } else {
        currentCard.stage = currentCard.stage + 1;
        cardController.deleteItemById('todos', 'id', currentCard.id);

        _storage.storage.pushDataByKey('todos', currentCard);
      }
    } else {
      if (currentCard.stage !== 3) {
        currentCard.stage = currentCard.stage + 1;
        cardController.deleteItemById('todos', 'id', currentCard.id);

        _storage.storage.pushDataByKey('todos', currentCard);
      } else {
        currentCard.stage = 1;
        cardController.deleteItemById('todos', 'id', currentCard.id);

        _storage.storage.pushDataByKey('todos', currentCard);
      }
    }
  },
  removeCard: function removeCard(targetPath) {
    var _this2 = this;

    var data = _storage.storage.getDataByKey('todos');

    var currentCard = data.find(function (elem) {
      return elem.id == targetPath;
    });
    confirnModalYes.addEventListener('click', function () {
      cardController.deleteItemById('todos', 'id', currentCard.id);

      _appController.appController.render();

      setTimeout(function () {
        _this2.updateEventListeners();
      }, 400);

      _appController.appController.toggleModalOff(confirnModal);
    });
    confirnModalNo.addEventListener('click', function () {
      _appController.appController.toggleModalOff(confirnModal);
    });

    if (currentCard.stage == 2) {
      _appController.appController.toggleModalOn(confirnModal);
    } else {
      cardController.deleteItemById('todos', 'id', currentCard.id);

      _appController.appController.render();

      setTimeout(function () {
        _this2.updateEventListeners();
      }, 400);
    }
  },
  displayAuthor: function displayAuthor(person) {
    authorsList.append(new Option(person.name, person.name));
    return authorsList;
  },
  buildOpenCard: function buildOpenCard(card) {
    var _storage$getDataByKey = _storage.storage.getDataByKey('todos').find(function (obj) {
      return card.id == obj.id;
    }),
        title = _storage$getDataByKey.title,
        text = _storage$getDataByKey.text,
        id = _storage$getDataByKey.id,
        stage = _storage$getDataByKey.stage,
        author = _storage$getDataByKey.author;

    var stages = document.querySelectorAll('.stages-column--item');

    var _iterator = _createForOfIteratorHelper(stages),
        _step;

    try {
      for (_iterator.s(); !(_step = _iterator.n()).done;) {
        var $stage = _step.value;

        if ($stage.id == stage) {
          if ($stage.id != 3) {
            $stage.childNodes[3].insertAdjacentHTML('beforeend', new _card.OpenCard(title, text, id, stage, author).createOpenCardHTML());
          } else {
            $stage.childNodes[3].insertAdjacentHTML('beforeend', new _card.OpenCardDone(title, text, id, stage, author).createOpenCardHTML());
          }
        }
      }
    } catch (err) {
      _iterator.e(err);
    } finally {
      _iterator.f();
    }

    var openCard = document.querySelector("#wrap-open-card");
    setTimeout(function () {
      _appController.appController.toggleModal(openCard);
    }, 100);
    document.querySelector('#open-card-close').addEventListener('click', function () {
      _appController.appController.toggleModal(openCard);

      setTimeout(function () {
        openCard.parentNode.removeChild(openCard);
      }, 400);
    });
  },
  // Изменение данных в открытой карточке
  changeTitle: function changeTitle() {
    var openCardTitle = document.getElementById("open-card-title");
    var openCardComment = document.getElementById("open-card-comment"); // Замена заголовка на инпут

    var titleInput = document.createElement("textarea");
    titleInput.innerHTML = openCardTitle.innerHTML;
    titleInput.className = "new-title__input";
    openCardTitle.replaceWith(titleInput); // Замена комментария на инпут

    var commentInput = document.createElement("textarea");
    commentInput.innerHTML = openCardComment.innerHTML;
    commentInput.className = "new-comment__input";
    openCardComment.replaceWith(commentInput);
  },
  saveNewTitle: function saveNewTitle() {
    // Перезапись заголовок в хранилке 
    var titleInput = document.querySelector(".new-title__input");
    var currentCardId = titleInput.parentNode.id;

    var data = _storage.storage.getDataByKey("todos");

    var currentCard = data.find(function (elem) {
      return elem.id == currentCardId;
    });
    var changedTitle = titleInput.value;
    currentCard.title = changedTitle; // Перезапись комментария в хранилке 

    var commentInput = document.querySelector(".new-comment__input");
    var changedComment = commentInput.value;
    currentCard.text = changedComment;
    cardController.deleteItemById('todos', 'id', currentCard.id);

    _storage.storage.pushDataByKey('todos', currentCard);

    _appController.appController.render();
  }
};
exports.cardController = cardController;
},{"./appController.js":"scripts/appController.js","./storage.js":"scripts/storage.js","./card.js":"scripts/card.js"}],"scripts/configApi.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.configApi = void 0;
var configApi = {
  baseUrl: "https://jsonplaceholder.typicode.com/",
  endPoint: {
    listUsers: "users"
  }
};
exports.configApi = configApi;
},{}],"scripts/serviceApi.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getUserData = void 0;

var _configApi = require("./configApi.js");

var getUserData = function getUserData() {
  return fetch(_configApi.configApi.baseUrl + _configApi.configApi.endPoint.listUsers).then(function (data) {
    return data.json();
  });
};

exports.getUserData = getUserData;
},{"./configApi.js":"scripts/configApi.js"}],"scripts/appController.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.appController = void 0;

var _storage = require("./storage.js");

var _card = require("./card.js");

var _cardController = require("./cardController.js");

var _serviceApi = require("./serviceApi.js");

var _appController;

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _createForOfIteratorHelper(o, allowArrayLike) { var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"]; if (!it) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = it.call(o); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it.return != null) it.return(); } finally { if (didErr) throw err; } } }; }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

var appController = (_appController = {
  render: function render() {
    var todosData = _storage.storage.getDataByKey('todos');

    var newData = todosData.map(function (card) {
      return new _card.Card(card.title, card.text, card.id, card.stage, card.author);
    });
    var stages = document.querySelectorAll('.stages-column--item');

    var _iterator = _createForOfIteratorHelper(stages),
        _step;

    try {
      var _loop = function _loop() {
        var stage = _step.value;

        if (todosData !== null) {
          var filteredData = newData.filter(function (card) {
            return stage.id == card.stage;
          });
          stage.querySelector('span.todo-count').textContent = filteredData.length;
          stage.childNodes[3].innerHTML = filteredData.map(function (card) {
            return card.createHTML(card);
          }).join(' ');
        } else return {
          v: void 0
        };
      };

      for (_iterator.s(); !(_step = _iterator.n()).done;) {
        var _ret = _loop();

        if (_typeof(_ret) === "object") return _ret.v;
      }
    } catch (err) {
      _iterator.e(err);
    } finally {
      _iterator.f();
    }
  },
  toggleModal: function toggleModal(elem) {
    elem.classList.toggle("active");
  },
  toggleModalOn: function toggleModalOn(elem) {
    elem.classList.add("active");
  },
  toggleModalOff: function toggleModalOff(elem) {
    elem.classList.remove("active");
  },
  checkLength: function checkLength(stage) {
    var data = _storage.storage.getDataByKey('todos');

    var filteredDataLength = data.filter(function (card) {
      return card.stage === stage;
    }).length;
    return filteredDataLength;
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
  initUserList: function initUserList() {
    (0, _serviceApi.getUserData)().then(function (authorsList) {
      return authorsList.forEach(function (author) {
        _cardController.cardController.displayAuthor(author);
      });
    });
  },
  buildCard: function buildCard(title, text, author) {
    var nextId = 1;

    if (localStorage.getItem("nextCardId") !== null) {
      nextId = parseInt(JSON.parse(localStorage.getItem("nextCardId")));
      localStorage.setItem("nextCardId", JSON.stringify(++nextId));
    } else {
      localStorage.setItem("nextCardId", JSON.stringify(nextId));
    }

    return new _card.Card(title, text, nextId, 1, author);
  }
}, _defineProperty(_appController, "initUserList", function initUserList() {
  (0, _serviceApi.getUserData)().then(function (authorsList) {
    return authorsList.forEach(function (author) {
      _cardController.cardController.displayAuthor(author);
    });
  });
}), _defineProperty(_appController, "deleteAllCards", function deleteAllCards(btn) {
  var _this = this;

  var data = _storage.storage.getDataByKey('todos');

  var confirmModal = document.getElementById("wrap-confirm-modal");
  var confirnModalYes = document.getElementById("modal-yes");
  var confirnModalNo = document.getElementById("modal-no");

  if (+btn.parentNode.parentNode.id === 2) {
    this.toggleModalOn(confirmModal);
    confirnModalYes.addEventListener('click', function () {
      var filteredData = data.filter(function (elem) {
        return elem.stage != btn.parentNode.parentNode.id;
      });
      localStorage.removeItem('todos');

      _storage.storage.pushDataByKey('todos', filteredData);

      localStorage.setItem('todos', JSON.stringify(filteredData));

      _this.toggleModalOff(confirmModal);

      _this.render();
    });
    confirnModalNo.addEventListener('click', function () {
      _this.toggleModalOff(confirmModal);
    });
  } else {
    var filteredData = data.filter(function (elem) {
      return elem.stage != btn.parentNode.parentNode.id;
    });
    localStorage.removeItem('todos');

    _storage.storage.pushDataByKey('todos', filteredData);

    localStorage.setItem('todos', JSON.stringify(filteredData));
  }
}), _appController);
exports.appController = appController;
},{"./storage.js":"scripts/storage.js","./card.js":"scripts/card.js","./cardController.js":"scripts/cardController.js","./serviceApi.js":"scripts/serviceApi.js"}],"scripts/index.js":[function(require,module,exports) {
"use strict";

var _storage = require("./storage.js");

var _appController = require("./appController.js");

var _cardController = require("./cardController.js");

// Кнопки окна создания
var modal = document.querySelector("#wrap-card-modal");
var fieldTitle = document.getElementById("card-modal__input-title");
var fieldText = document.getElementById("card-modal__textarea-desc");
var saveCardButton = document.getElementById("create-btn");
var cancelBtn = document.getElementById("cancel-btn");
var closeModal = document.getElementById("close-modal");
var openModalCreateCard = document.getElementById("create-card"); // Кнопки окна предупреждения in progress length === 6

var warningModal = document.querySelector("#wrap-warning-modal");
var closeWarningModal = document.getElementById("warning-cancel-btn");
var authorsList = document.querySelector("#card-avatar");
var stages = document.querySelector(".stages-columns");

var app = function app() {
  _appController.appController.render();

  _appController.appController.initUserList();

  _cardController.cardController.updateEventListeners(); //   Окно добавления карточки


  openModalCreateCard.addEventListener("click", function () {
    _appController.appController.toggleModal(modal);
  });
  cancelBtn.addEventListener("click", function () {
    _appController.appController.toggleModal(modal);
  });
  closeModal.addEventListener("click", function () {
    _appController.appController.toggleModal(modal);
  });
  saveCardButton.addEventListener("click", function () {
    var cardValidation = document.forms["card-form"]["card-modal__input-title"].value;

    if (cardValidation == "") {
      fieldTitle.setCustomValidity("Please enter your ToDo title");
      return false;
    }

    var card = _appController.appController.buildCard(fieldTitle.value, fieldText.value, authorsList.value);

    _storage.storage.pushDataByKey("todos", card);

    _appController.appController.toggleModal(modal);

    _appController.appController.render();

    _cardController.cardController.updateEventListeners();
  }); // Окно предупреждения in progress length === 6

  closeWarningModal.addEventListener("click", function () {
    _appController.appController.toggleModal(warningModal);
  }); // Клики по кнопкам карточки

  stages.onclick = function (event) {
    var btn = event.target.closest("button");

    if (btn) {
      if (!btn) return;

      switch (btn.id) {
        case "card-btn-transfer-list":
          if (!btn.id) return;
          var targetPath = btn.parentNode.parentNode.id;

          _cardController.cardController.transferCard(btn, targetPath);

          _appController.appController.render();

          setTimeout(function () {
            _cardController.cardController.updateEventListeners();
          }, 400);
          break;

        case "close-card-btn-delete":
          if (!btn.id) return;
          targetPath = btn.parentNode.parentNode.id;

          _cardController.cardController.removeCard(targetPath);

          _appController.appController.render();

          setTimeout(function () {
            _cardController.cardController.updateEventListeners();
          }, 400);
          break;

        case "delete-all-btn":
          if (!btn.id) return;

          _appController.appController.deleteAllCards(btn);

          _appController.appController.render();

          setTimeout(function () {
            _cardController.cardController.updateEventListeners();
          }, 400);
          break;
      }
    } else {
      var card = event.target.closest(".card");
      if (!card) return;

      _cardController.cardController.buildOpenCard(card);

      var openCard = document.querySelector('.open-card');

      if (openCard !== null) {
        openCard.onclick = function (event) {
          var btn = event.target.closest("button");
          if (!btn) return;
          var openCardWindow = document.getElementById('wrap-open-card');
          var targetPath = btn.parentNode.parentNode.id;

          switch (btn.id) {
            case "open-card__readiness":
              if (!btn.id) return;

              _appController.appController.toggleModal(openCardWindow);

              setTimeout(function () {
                openCard.parentNode.removeChild(openCard);
              }, 400);

              _cardController.cardController.transferCard(btn, targetPath);

              _appController.appController.render();

              setTimeout(function () {
                _cardController.cardController.updateEventListeners();
              }, 400);
              break;

            case "open-card__delete":
              if (!btn.id) return;

              _cardController.cardController.removeCard(targetPath);

              setTimeout(function () {
                openCard.parentNode.removeChild(openCard);
              }, 400);

              _appController.appController.toggleModal(openCardWindow);

              setTimeout(function () {
                _appController.appController.render();
              }, 300);
              setTimeout(function () {
                _cardController.cardController.updateEventListeners();
              }, 400);
              break;

            case "open-card__change":
              if (!btn.id) return;

              _cardController.cardController.changeTitle();

              break;

            case "open-card-save-change":
              if (!btn.id) return;

              _cardController.cardController.saveNewTitle();

              _appController.appController.render();

              setTimeout(function () {
                _cardController.cardController.updateEventListeners();
              }, 400);
              break;
          }
        };
      }
    }
  }, _appController.appController.render();

  _cardController.cardController.updateEventListeners();
};

app();
},{"./storage.js":"scripts/storage.js","./appController.js":"scripts/appController.js","./cardController.js":"scripts/cardController.js"}],"../node_modules/parcel-bundler/src/builtins/hmr-runtime.js":[function(require,module,exports) {
var global = arguments[3];
var OVERLAY_ID = '__parcel__error__overlay__';
var OldModule = module.bundle.Module;

function Module(moduleName) {
  OldModule.call(this, moduleName);
  this.hot = {
    data: module.bundle.hotData,
    _acceptCallbacks: [],
    _disposeCallbacks: [],
    accept: function (fn) {
      this._acceptCallbacks.push(fn || function () {});
    },
    dispose: function (fn) {
      this._disposeCallbacks.push(fn);
    }
  };
  module.bundle.hotData = null;
}

module.bundle.Module = Module;
var checkedAssets, assetsToAccept;
var parent = module.bundle.parent;

if ((!parent || !parent.isParcelRequire) && typeof WebSocket !== 'undefined') {
  var hostname = "" || location.hostname;
  var protocol = location.protocol === 'https:' ? 'wss' : 'ws';
  var ws = new WebSocket(protocol + '://' + hostname + ':' + "62894" + '/');

  ws.onmessage = function (event) {
    checkedAssets = {};
    assetsToAccept = [];
    var data = JSON.parse(event.data);

    if (data.type === 'update') {
      var handled = false;
      data.assets.forEach(function (asset) {
        if (!asset.isNew) {
          var didAccept = hmrAcceptCheck(global.parcelRequire, asset.id);

          if (didAccept) {
            handled = true;
          }
        }
      }); // Enable HMR for CSS by default.

      handled = handled || data.assets.every(function (asset) {
        return asset.type === 'css' && asset.generated.js;
      });

      if (handled) {
        console.clear();
        data.assets.forEach(function (asset) {
          hmrApply(global.parcelRequire, asset);
        });
        assetsToAccept.forEach(function (v) {
          hmrAcceptRun(v[0], v[1]);
        });
      } else if (location.reload) {
        // `location` global exists in a web worker context but lacks `.reload()` function.
        location.reload();
      }
    }

    if (data.type === 'reload') {
      ws.close();

      ws.onclose = function () {
        location.reload();
      };
    }

    if (data.type === 'error-resolved') {
      console.log('[parcel] ✨ Error resolved');
      removeErrorOverlay();
    }

    if (data.type === 'error') {
      console.error('[parcel] 🚨  ' + data.error.message + '\n' + data.error.stack);
      removeErrorOverlay();
      var overlay = createErrorOverlay(data);
      document.body.appendChild(overlay);
    }
  };
}

function removeErrorOverlay() {
  var overlay = document.getElementById(OVERLAY_ID);

  if (overlay) {
    overlay.remove();
  }
}

function createErrorOverlay(data) {
  var overlay = document.createElement('div');
  overlay.id = OVERLAY_ID; // html encode message and stack trace

  var message = document.createElement('div');
  var stackTrace = document.createElement('pre');
  message.innerText = data.error.message;
  stackTrace.innerText = data.error.stack;
  overlay.innerHTML = '<div style="background: black; font-size: 16px; color: white; position: fixed; height: 100%; width: 100%; top: 0px; left: 0px; padding: 30px; opacity: 0.85; font-family: Menlo, Consolas, monospace; z-index: 9999;">' + '<span style="background: red; padding: 2px 4px; border-radius: 2px;">ERROR</span>' + '<span style="top: 2px; margin-left: 5px; position: relative;">🚨</span>' + '<div style="font-size: 18px; font-weight: bold; margin-top: 20px;">' + message.innerHTML + '</div>' + '<pre>' + stackTrace.innerHTML + '</pre>' + '</div>';
  return overlay;
}

function getParents(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return [];
  }

  var parents = [];
  var k, d, dep;

  for (k in modules) {
    for (d in modules[k][1]) {
      dep = modules[k][1][d];

      if (dep === id || Array.isArray(dep) && dep[dep.length - 1] === id) {
        parents.push(k);
      }
    }
  }

  if (bundle.parent) {
    parents = parents.concat(getParents(bundle.parent, id));
  }

  return parents;
}

function hmrApply(bundle, asset) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (modules[asset.id] || !bundle.parent) {
    var fn = new Function('require', 'module', 'exports', asset.generated.js);
    asset.isNew = !modules[asset.id];
    modules[asset.id] = [fn, asset.deps];
  } else if (bundle.parent) {
    hmrApply(bundle.parent, asset);
  }
}

function hmrAcceptCheck(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (!modules[id] && bundle.parent) {
    return hmrAcceptCheck(bundle.parent, id);
  }

  if (checkedAssets[id]) {
    return;
  }

  checkedAssets[id] = true;
  var cached = bundle.cache[id];
  assetsToAccept.push([bundle, id]);

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    return true;
  }

  return getParents(global.parcelRequire, id).some(function (id) {
    return hmrAcceptCheck(global.parcelRequire, id);
  });
}

function hmrAcceptRun(bundle, id) {
  var cached = bundle.cache[id];
  bundle.hotData = {};

  if (cached) {
    cached.hot.data = bundle.hotData;
  }

  if (cached && cached.hot && cached.hot._disposeCallbacks.length) {
    cached.hot._disposeCallbacks.forEach(function (cb) {
      cb(bundle.hotData);
    });
  }

  delete bundle.cache[id];
  bundle(id);
  cached = bundle.cache[id];

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    cached.hot._acceptCallbacks.forEach(function (cb) {
      cb();
    });

    return true;
  }
}
},{}]},{},["../node_modules/parcel-bundler/src/builtins/hmr-runtime.js","scripts/index.js"], null)
//# sourceMappingURL=/scripts.bcf3243b.js.map