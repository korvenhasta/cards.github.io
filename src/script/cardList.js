import Card from './card.js';
import {popUp, api} from "./script.js";

/* Класс для хранения и отрисовки карточек */ 
class CardList {
    constructor(container, imagePopUpContainer) {
        this.container = container;
        this.cardsArray = [];
        this.container
            .addEventListener('cardDeleted', event => this.remove(event.detail)); // Подписались на кастомный ивент. Через замыкание получаем возможность вызвать remove на cardList
        this.imagePopUpContainer = imagePopUpContainer
            .querySelector('.image-popup__close')
            .addEventListener('click', event => this.closeImagePopUp(event));
        this.render();
    }

    /* Метод. Добавляем карточку в список */
    addCard(card) {
        if (card instanceof Card === false) {
            throw "Ожидается элемент типа карточка"
        }
        this.cardsArray.push(card);
        this.container.appendChild(card.cardElement);
    }

    /* Метод. Удаляем карточку */
    remove(card) {
        const indexOfCard = this.cardsArray.indexOf(card);
        if (indexOfCard === -1) {
            throw "Такого элемента нет в массиве"
        }
        this.container.removeChild(card.cardElement);
        this.cardsArray.splice(indexOfCard, 1);
        api.deleteCard(card.cardID);
    }

    /* Метод. Отрисуем карточки на сайте */
    render() {
        // Почистим контейнер с карточками
        let rangeCards = document.createRange();
        rangeCards.selectNodeContents(this.container);
        rangeCards.deleteContents();

        // Добавим карточки
        this.cardsArray.forEach(card => this.addCard(card));
    }

    /* Метод. Закрываем карточку в попапе*/
    closeImagePopUp(event) {
        event.target.parentNode.parentNode.classList.remove('image-popup_is-opened');
    }

    /* Метод. Отправим новую карточку на сервер */
    createCard(cardName, cardLink) {
        let cardList = this;
        api.addCard(
            obj => {
                const card = new Card(obj.name, obj.link, obj.likes, obj._id, obj.owner._id);
                cardList.addCard(card);
            }, 
            () => {
                popUp.renderLoadingCard(false);
                document.forms.new.reset();
                popUp.close();
            },
            cardName, 
            cardLink
        );
    }
}

export default CardList;