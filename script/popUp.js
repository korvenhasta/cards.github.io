/* Класс для всплывающего окна */ 
class Popup {
    constructor(container, addCardButton, editProfileButton, userPhoto) {
        this.container = container;
        this.submitButton = document.querySelector('.popup__button');

        addCardButton.addEventListener('click', () => this.openAsAddCard(container)); // в this будет объект поп-ап
        editProfileButton.addEventListener('click', () => this.openAsEditProfile(container));
        userPhoto.addEventListener('click', () => this.openAsEditAvatar(container));

        this.container
            .querySelector('.popup__close')
            .addEventListener('click', () => popUp.close());

        document.forms.new.addEventListener('submit', target => this.submitButtonHandler(target));
        document.forms.new.addEventListener('input', target => this.formValidationHandler(target));
    }
    
    /* Метод. Показать поп-ап*/
    open() {
        this.container.classList.add('popup_is-opened');
    }

    /* Метод. Закрыть поп-ап*/
    close() {
        this.container.classList.remove('popup_is-opened');
        document.forms.new.reset();
    }

    /* Метод. Установим значения полей для поп-апа */
    update(properties) {
        const popUpTitle = this.container.querySelector('.popup__title');
        const popUpName = this.container.querySelector('.popup__input_type_name');
        const popUpInputValue = this.container.querySelector('.popup__input_type_link-url');

        /* Функция. Берем name и value из массива объектов, который будет передан в параметрах функции и сетим/удаляем атрибуты*/
        function setArrayParams(domElement, attributesArr) {
            for (let i=0; i < attributesArr.length; i++) {
                if (attributesArr[i].value === '') {
                    domElement.removeAttribute(attributesArr[i].name);
                } 
                else {
                    domElement.setAttribute(attributesArr[i].name, attributesArr[i].value);
                }
            }
        }

        popUpTitle.textContent = properties.title;
        popUpName.placeholder = properties.inputName;
        popUpInputValue.placeholder = properties.inputValue;
        this.submitButton.textContent = properties.buttonTextContent;

        popUpName.value = properties.userName;
        popUpInputValue.value = properties.userJobTitle;

        setArrayParams(popUpInputValue, properties.inputValueAttributes);
        setArrayParams(this.submitButton, properties.buttonAttributes);
        setArrayParams(document.forms.new, properties.formAttributes);
    }

    /* Метод. Сгенерируем поп-ап для добавления нового места*/
    openAsAddCard() {
        const inputContainer = this.container.querySelector('.popup__container');
        inputContainer.setAttribute('style', 'display: block');

        let attributesAddCard = [
            { name: 'type', value: 'url' },
            { name: 'pattern', value: 'https?://.+' },
            { name: 'minlength', value: '' },
            { name: 'maxlength', value: '' }
        ];

        let attributesPopUpButton = [ { name: 'style', value: 'font-size: 36px' } ];

        let attributesForm = [ { name: 'data-submitButton', value: 'submitCardButton' } ];

        let popUpParameters = {
            title: 'Новое место',
            inputName: 'Название',
            inputValue: 'Ссылка на картинку',
            inputValueAttributes: attributesAddCard,
            buttonTextContent: '+',
            buttonAttributes: attributesPopUpButton,
            formAttributes: attributesForm,
            userName: '',
            userJobTitle: ''
        };

        this.update(popUpParameters);
        this.formValidationHandler();
        this.open();
    }

    /* Метод. Сгенерируем поп-ап для редактирования профиля*/
    openAsEditProfile() {
        const inputContainer = this.container.querySelector('.popup__container');
        inputContainer.setAttribute('style', 'display: block');

        let attributesAddCard = [
            { name: 'type', value: 'text' },
            { name: 'pattern', value: '' },
            { name: 'minlength', value: '2' },
            { name: 'maxlength', value: '30' }
        ];

        let attributesPopUpButton = [ { name: 'style', value: 'font-size: 18px' } ];

        let attributesForm = [ {name: 'data-submitButton', value: 'submitProfileButton'} ];

        let popUpParameters = {
            title: 'Редактировать профиль',
            inputName: 'Имя',
            inputValue: 'О себе',
            inputValueAttributes: attributesAddCard,
            buttonTextContent: 'Сохранить',
            buttonAttributes: attributesPopUpButton,
            formAttributes: attributesForm,
            userName: userProfile.name,
            userJobTitle: userProfile.about
        };

        this.update(popUpParameters);
        this.formValidationHandler();
        this.open();
    }

    /* Метод. Сгенерируем поп-ап для изменения аватара*/
    openAsEditAvatar() {
        const inputContainer = this.container.querySelector('.popup__container');
        inputContainer.setAttribute('style', 'display: none');

        let attributesAddCard = [
            { name: 'type', value: 'url' },
            { name: 'pattern', value: 'https?://.+' },
            { name: 'minlength', value: '' },
            { name: 'maxlength', value: '' }
        ];

        let attributesPopUpButton = [ { name: 'style', value: 'font-size: 18px' } ];

        let attributesForm = [ { name: 'data-submitButton', value: 'submitAvatarButton' } ];

        let popUpParameters = {
            title: 'Обновить аватар',
            inputName: 'Аватар',
            inputValue: 'Ссылка на аватар',
            inputValueAttributes: attributesAddCard,
            buttonTextContent: 'Сохранить',
            buttonAttributes: attributesPopUpButton,
            formAttributes: attributesForm,
            userName: 'Аватар',
            userJobTitle: ''
        };

        this.update(popUpParameters);
        this.formValidationHandler();
        this.open();
    }

    /* Метод. Добавляем карточку с формы */
    onAddCard() {
        const name = document.forms.new.elements.name;
        const link = document.forms.new.elements.link;
        cardList.createCard(name.value, link.value);
    }

    /* Метод. Редактируем профиль с формы при нажатии на кнопку Сохранить */
    onEditProfile() {
        const name = document.forms.new.elements.name;
        const job = document.forms.new.elements.link;

        userProfile.update(name.value, job.value);
    }

    /* Метод. Изменим аватар с формы при нажатии на кнопку Сохранить */
    onEditAvatar() {
        const link = document.forms.new.elements.link;
        userProfile.updateAvatar(link.value);
    }

    /* Метод. Выбираем, какая кнопка будет на submit - создание нового места, редактирование профиля или смена аватара*/
    submitButtonHandler(event) {
        event.preventDefault();
        let dataSubmitButton = event.target.getAttribute('data-submitButton');
        if (dataSubmitButton === 'submitCardButton') {
            this.onAddCard();
        }
        else if (dataSubmitButton === 'submitProfileButton') {
            this.onEditProfile();
        }
        else if (dataSubmitButton === 'submitAvatarButton') {
            this.onEditAvatar();
        }
    }

    /* Метод. Делаем сообщение об ошибке видимым для валидации */
    activateElementError(element) {
        element.classList.add('popup__container_invalid');
    }

    /* Метод. Обнуляем ошибки для валидации */
    resetElementError(element) {
        element.classList.remove('popup__container_invalid');
        element.textContent = '';
    }

    /* Метод. Валидируем инпуты */
    validateElement(element) {
        const errorElement = element.nextSibling.nextSibling;

        if (element.validity.valueMissing) {
            errorElement.textContent = errorMessageSet.validationRequired;
            this.activateElementError(errorElement);
            return false;
        }

        if (element.validity.patternMismatch) {
            errorElement.textContent = errorMessageSet.validationLink;
            this.activateElementError(errorElement);
            return false;
        }

        if (element.validity.tooShort) {
            errorElement.textContent = errorMessageSet.validationLength;
            this.activateElementError(errorElement);
            return false;
        }

        this.resetElementError(errorElement);
        return true;
    }

    /* Метод. Делегирование для валидации формы редактирования профиля, добавления места и смены аватара*/
    formValidationHandler(event) {
        const inputs = Array.from(document.forms.new.elements);
    
        let isValidForm = true;
    
        inputs.forEach((elem) => {
            if (elem !== this.submitButton) {
                if (!elem.checkValidity()) isValidForm = false;
            }
        });

        if (isValidForm) {
            this.submitButton.removeAttribute('disabled');
        }
        else {
            this.submitButton.setAttribute('disabled', true);
        }

        if(event !== undefined) {
            this.validateElement(event.target);
        }
    }

    /* Метод. Изменим текст на картинке, пока идет загрузка информации с сайта */
    renderLoadingCard(isLoading) {
        if (isLoading) {
            this.submitButton.setAttribute('style', 'font-size: 18px');
            this.submitButton.textContent = 'Загрузка...';
        }
        else {
            this.submitButton.textContent = '+';
        }
    }

    /* Метод. Изменим текст на картинке, пока идет загрузка информации с сайта */
    renderLoadingProfile(isLoading) {
        if (isLoading) {
            this.submitButton.setAttribute('style', 'font-size: 18px');
            this.submitButton.textContent = 'Загрузка...';
        }
        else {
            this.submitButton.textContent = 'Сохранить';
        }
    }
}