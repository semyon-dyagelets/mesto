import './index.css';
import Card from '../components/Card.js';
import FormValidator from '../components/FormValidator.js';
import Section from '../components/Section.js';
import { cardListSelector, 
    addButton,
    editButton,
    elements,
    initialCards,
    profileName,
    profileProfession,
    formEdit,
    formAddCardElement } from '../components/constants.js';
import PopupWithImage from '../components/PopupWithImage.js';
import PopupWithForm from '../components/PopupWithForm.js';
import UserInfo from '../components/UserInfo.js';

const validationConfig = {
    formSelector: '.popup__container',
    inputSelector: '.popup__input',
    submitButtonSelector: '.popup__button-save',
    inactiveButtonClass: 'popup__button-save_inactive',
    inputErrorClass: 'popup__input_type_error',
};

const cardsList = new Section({
    items: initialCards,
    renderer: (item) => {
        const card = new Card(item, () => popupWithImage.open(item.link, item.name), '.card-template_type_default');
        const cardElement = card.generateCard();
        cardsList.addItem(cardElement);
    }
}, cardListSelector);
cardsList.renderItems();

const profileEditFormValidator = new FormValidator (validationConfig, formEdit);
profileEditFormValidator.enableValidation();
profileEditFormValidator.resetValidation();

const addCardFormValidator = new FormValidator (validationConfig, formAddCardElement);
addCardFormValidator.enableValidation();
addCardFormValidator.resetValidation();

const userProfile = new UserInfo(profileName, profileProfession);

const popupEditProfile = new PopupWithForm({
    popupSelector: '.popup_type-edit',
    handleFormSubmit: (formData) => {
        userProfile.setUserInfo(formData.name, formData.profession);
   } 
});
popupEditProfile.setEventListeners();

editButton.addEventListener ('click', () => {
    popupEditProfile.open()
});

const popupAddCard = new PopupWithForm({
    popupSelector: '.popup_type-add-card',
    handleFormSubmit: (item) => {
        const card = new Card(item, () => popupWithImage.open(item.link, item.name),'.card-template_type_default');
        const cardElement = card.generateCard();
        elements.prepend(cardElement);
    }
});
popupAddCard.setEventListeners();

addButton.addEventListener('click', () => {
    popupAddCard.open();
});

const popupWithImage = new PopupWithImage('.popup_type-image-caption');
popupWithImage.setEventListeners();