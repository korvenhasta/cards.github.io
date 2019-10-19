/* Класс для обновления данных в профиле */ 
class Profile {
    constructor(container) {
        this.userNameElement = container.querySelector('.user-info__name');
        this.userJobTitleElement = container.querySelector('.user-info__job');
        this.userAvatarElement = container.querySelector('.user-info__photo');
        this.userID = '';
    }

    /* Метод. Обновим данные профиля на сервере */
    update(changedName, changedAbout) {
        let profile = this;
        api.editUserInfo(
            obj => profile.refresh(obj), 
            () => {
                popUp.renderLoadingProfile(false);
                document.forms.new.reset();
                popUp.close();
            }, 
            changedName, 
            changedAbout
        );
    }

    /* Метод. Обновим аватар на сервере */
    updateAvatar(changedAvatar) {
        let profile = this;
        api.updateAvatar(
            obj => profile.refresh(obj), 
            () => {
                popUp.renderLoadingProfile(false);
                document.forms.new.reset();
                popUp.close();
            },
            changedAvatar
        );
    }

    /* Метод. Получим данные с сервера о профиле */
    updateFromServer() {
        let profile = this;
        api.getUserInfo(obj => profile.refresh(obj));
    }

    /* Метод. Посетим новые значения на страницу с использованием деструктуризации */
    refresh({name, about, avatar, _id}) {
        this.userNameElement.textContent = name;
        this.userJobTitleElement.textContent = about;
        this.userAvatarElement.style.backgroundImage = `url(${avatar})`;
        this.userID = _id;
    }

    /* Геттер. Вернем имя из элемента*/
    get name() {
        return this.userNameElement.textContent;
    }

    /* Геттер. Вернем информацию о себе из элемента*/
    get about() {
        return this.userJobTitleElement.textContent;
    }

    /* Геттер. Вернем аватар из элемента*/
    get avatar() {
        return this.userAvatarElement.style.backgroundImage.slice(5, length - 2);
    } 
}

export default Profile;