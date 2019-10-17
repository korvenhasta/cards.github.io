/* Класс для получения данных из сервера */ 
class Api {
    constructor(url, cohort, headers) {
        // тело конструктора
        this.url = url;
        this.cohort = cohort;
        this.headers = headers;
    }

    /* Метод. Вернем json объект или ошибку */
    parseResult(res) {
        if (res.ok) {
            return res.json();
          }
          return Promise.reject(`Ошибка: ${res.status}`);
    }

    /* Метод. Выведем ошибку в консоль */
    handleError(err) {
        console.log(err);
    }

    /* Метод. Получим профиль пользователя с сервера */
    getUserInfo(callback) {
        fetch(
            `${this.url}/${this.cohort}/users/me`, 
            { headers: this.headers }
        )
        .then(this.parseResult)
        .then(callback)
        .catch(this.handleError);
    }
    
    /* Метод. Получим массив карточек с сервера */
    getInitialCards(callback) {
        fetch(
            `${this.url}/${this.cohort}/cards`,
            { headers: this.headers }
        )
        .then(this.parseResult)
        .then(callback)
        .catch(this.handleError);
    }

    /* Метод. Отправим на сервер измененные данные пользователя */
    editUserInfo(callback, onComplete, userName, userAbout) {
        popUp.renderLoadingProfile(true);
        fetch(
            `${this.url}/${this.cohort}/users/me`, 
            {
                method: 'PATCH',
                headers: this.headers,
                body: JSON.stringify({
                    name: userName,
                    about: userAbout
                })
            }
        )
        .then(this.parseResult)
        .then(callback)
        .catch(this.handleError)
        .finally(onComplete);
    }

    /* Метод. Отправим на сервер добавление карточки */
    addCard(callback, onComplete, cardName, cardLink) {
        popUp.renderLoadingCard(true);
        fetch(
            `${this.url}/${this.cohort}/cards`, 
            {
                method: 'POST',
                headers: this.headers,
                body: JSON.stringify({
                    name: cardName,
                    link: cardLink
                })
            }
        )
        .then(this.parseResult)
        .then(callback)
        .catch(this.handleError)
        .finally(onComplete);
    }

    /* Метод. Отправим на сервер информацию об удалении карточки */
    deleteCard(cardID) {
        fetch(
            `${this.url}/${this.cohort}/cards/${cardID}`, 
            {
                method: 'DELETE',
                headers: this.headers
            }
        )
        .catch(this.handleError)
    }

    /* Метод. Отправим на сервер лайкнутую карточку */
    likeOnCard(callback, cardID) {
        fetch(
            `${this.url}/${this.cohort}/cards/like/${cardID}`, 
            {
                method: 'PUT',
                headers: this.headers
            }
        )
        .then(this.parseResult)
        .then(callback)
        .catch(this.handleError)
    }

    /* Метод. Отправим на сервер удаление лайка с карточки */
    deleteLike(callback, cardID) {
        fetch(
            `${this.url}/${this.cohort}/cards/like/${cardID}`, 
            {
                method: 'DELETE',
                headers: this.headers
            }
        )
        .then(this.parseResult)
        .then(callback)
        .catch(this.handleError)
    }

    /* Метод. Отправим новый аватар на сервер */
    updateAvatar(callback, onComplete, userAvatar) {
        popUp.renderLoadingProfile(true);
        fetch(
            `${this.url}/${this.cohort}/users/me/avatar`, 
            {
                method: 'PATCH',
                headers: this.headers,
                body: JSON.stringify({
                    avatar: userAvatar
                })
            }
        )
        .then(this.parseResult)
        .then(callback)
        .catch(this.handleError)
        .finally(onComplete);
    }
} 