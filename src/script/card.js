/* Класс для карточки */
export class Card {
    constructor(name, image, likes, cardID, ownerID) {
        let card = this;
        this.cardID = cardID;
        this.ownerID = ownerID;
        this.deleted = new CustomEvent('cardDeleted', { bubbles: true, detail: card }); // Создаем кастомный ивент и передаем в нем ссылку на себя
        let element = this.createElement(name, image, this.ownerID != userProfile.userID);
        this.cardElement = element.cardContainer;
        this.likeButton = element.likeButton;
        this.likeParagraph = element.likeParagraph;
        this.likes = likes; // вызываем сеттер
        this.cardElement.addEventListener('click', target => card.cardClickHandler(target)); // Теперь this это ссылка на объект карточка, а не кнопка на карточке
        this.imagePopUpContainer = document.querySelector('.image-popup');
    }

    /* Метод. Обрабатываем только те клики, которые относятся непосредственно к самой карточке */
    cardClickHandler(event) {
        if (event.target.classList.contains('place-card__like-icon')) {
            this.like();
        }
        else if (event.target.classList.contains('place-card__image')) {
            this.showPicture(event);
        }
        else if (event.target.classList.contains('place-card__delete-icon')) {
            if (window.confirm('Вы действительно хотите удалить эту карточку?')) {
                this.cardElement.dispatchEvent(this.deleted); // слева от dispatchEvent ссылка на элемент, на котором срабатывает событие, а в скобках объект-событие
            }
        }
    }

    /* Сеттер. Меняем класс в зависимости от того, есть лайк овнера в массиве или нет*/
    set likes(likesArr) {
        this.cardLikes = likesArr;
        this.likeParagraph.textContent = this.cardLikes.length; // length нужен потому что от сервера приходит массив лайков
        if(this.cardLikes.some(res => res._id === userProfile.userID)) {
            this.likeButton.classList.add('place-card__like-icon_liked');
        }
        else {
            this.likeButton.classList.remove('place-card__like-icon_liked');
        }
    }

    /* Геттер. Возвращаем массив лайков на экземпляре класса */
    get likes() {
        return this.cardLikes;
    }

    /* Метод. Добавляем или удаляем лайк на сервере */
    like() {
        let card = this;
        if(this.likes.some(res => res._id === userProfile.userID)) {
            api.deleteLike(res => card.likes = res.likes, this.cardID);
        }
        else {
            api.likeOnCard(res => card.likes = res.likes, this.cardID);
        }
    }

    /* Метод. Покажем изображение в поп-апе */
    showPicture(event) {
        const imagePopUpPlaceCard = document.querySelector('.image-popup__place-card');
        const currentImageCard = event.target.style.backgroundImage;
        imagePopUpPlaceCard.src = currentImageCard.slice(5, length - 2);
        this.imagePopUpContainer.classList.add('image-popup_is-opened');
    }

    /* Метод. Создаем DOM-элемент карточки */
    createElement(cardName, cardImage, isMine) {

        function createElement(elType, classes) {
            const elContainer = document.createElement(elType);
            elContainer.classList.add(classes);
        
            return elContainer;
        }

        const cardContainer = createElement('div', 'place-card');

        const imageContainer = createElement('div', 'place-card__image');
        imageContainer.setAttribute('style', `background-image: url(${cardImage})`);
    
        const deleteButton = createElement('button', 'place-card__delete-icon');
        if(isMine) {
            deleteButton.setAttribute('style', 'display: none');
        }
        else {
            deleteButton.removeAttribute('style', 'display: none');
        }

        const descriptionContainer = createElement('div', 'place-card__description');
    
        const placeNameElement = createElement('h3', 'place-card__name');
        placeNameElement.textContent = cardName;

        const likeContainer = createElement('div', 'place-card__like-container');
    
        const likeButton = createElement('button', 'place-card__like-icon');
        const likeParagraph = createElement('p', 'place-card__like-counter');
    
        cardContainer.appendChild(imageContainer);
        cardContainer.appendChild(descriptionContainer);
    
        imageContainer.appendChild(deleteButton);

        descriptionContainer.appendChild(placeNameElement);
        descriptionContainer.appendChild(likeContainer);

        likeContainer.appendChild(likeButton);
        likeContainer.appendChild(likeParagraph);

        return {cardContainer, likeButton, likeParagraph};
    }
}