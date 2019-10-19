import '../pages/main.css';
import {Api} from './api.js';
import {Card} from './card.js';
import {CardList} from './cardList.js';
import {Popup} from './popUp.js';
import {Profile} from './profile.js';

/* Функция. Избавимся от глобальных переменных */
function starter() {
    /* Переменные. Объявим переменные и создадим экземпляры классов */
    const serverUrl = NODE_ENV === 'development' ? 'http://praktikum.tk/cohort3' : 'https://praktikum.tk/cohort3'

    const placesContainer = document.querySelector('.places-list');

    const profileContainer = document.querySelector('.profile');

    const addCardButton = document.querySelector('.user-info__button');
    const editProfileButton = document.querySelector('.user-info__edit-button');
    const userPhoto = document.querySelector('.user-info__photo');

    const imagePopUpContainer = document.querySelector('.image-popup');

    const popUpContainer = document.querySelector('.popup');

    return {
        popUp: new Popup(popUpContainer, addCardButton, editProfileButton, userPhoto),
        cardList: new CardList(placesContainer, imagePopUpContainer),
        api: new Api(
            serverUrl,
            'cohort3',
            {
                authorization: '68830182-4ec3-4d6b-ac07-216b5e39765e',
                'Content-Type': 'application/json'
            }
        ),
        userProfile: new Profile(profileContainer)
    }
}

/* Функция. Получим профиль от API */
function getProfileFromServer() {
    userProfile.updateFromServer();
}

/* Функция. Получим массив объектов от API */
function getInitialCardsFromServer() {
    api.getInitialCards(cards => cards
        .map(card => new Card(card.name, card.link, card.likes, card._id, card.owner._id))
        .forEach(card => cardList.addCard(card))
    );
}

let {popUp, cardList, api, userProfile} = starter(); // воспользуемся деструктуризацией для инициализации

/* Вызовем функции */
getProfileFromServer();
getInitialCardsFromServer();