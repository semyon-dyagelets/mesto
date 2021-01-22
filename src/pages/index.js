import './index.css';
import Card from '../components/Card.js';
import FormValidator from '../components/FormValidator.js';
import Section from '../components/Section.js';
import {
    cardListSelector,
    addButton,
    editProfileButton,
    editAvatarButton,
    profileAvatar,
    profileName,
    profileProfession,
    formEdit,
    formAddCardElement,
    formEditAvatar
} from '../components/constants.js';
import PopupWithImage from '../components/PopupWithImage.js';
import PopupWithForm from '../components/PopupWithForm.js';
import PopupConfirm from '../components/PopupConfirm.js';
import UserInfo from '../components/UserInfo.js';
import API from '../components/API.js';

const validationConfig = {
    formSelector: '.popup__container',
    inputSelector: '.popup__input',
    submitButtonSelector: '.popup__button-save',
    inactiveButtonClass: 'popup__button-save_inactive',
    inputErrorClass: 'popup__input_type_error',
};

const cardsList = new Section({
    renderer: (item) => {
        cardsList.addItem(createCard(item));
    }
},
    cardListSelector);

const userProfile = new UserInfo(profileName, profileProfession, profileAvatar);

const popupEditProfile = new PopupWithForm({
    popup: '.popup_type-edit',
    handleFormSubmit: (formData) => {
        popupEditProfile.renderLoading(true);
        api.editProfile(formData)
            .then((formData) => {
                userProfile.setUserInfo(formData.name, formData.about);
                console.log(formData);
            })
            .catch((err) => { console.log(err) })
            .finally(() => {
                popupEditProfile.renderLoading(false);
            })
    }
});
popupEditProfile.setEventListeners();

const profileEditFormValidator = new FormValidator(validationConfig, formEdit);
profileEditFormValidator.enableValidation();
profileEditFormValidator.resetValidation();

const popupEditAvatar = new PopupWithForm({
    popup: '.popup_type-edit-avatar',
    handleFormSubmit: (profileAvatar) => {
        popupEditAvatar.renderLoading(true);
        api.editAvatar(profileAvatar)
            .then((res) => {
                userProfile.setUserAvatar(res.avatar);
            })
            .catch((err) => { console.log(err) })
            .finally(() => {
                popupEditAvatar.renderLoading(false);
            })
    }
})
popupEditAvatar.setEventListeners();

editProfileButton.addEventListener('click', () => {
    popupEditProfile.open();
    profileEditFormValidator.resetValidation();
});

editAvatarButton.addEventListener('click', () => {
    popupEditAvatar.open();
})

const popupAddCard = new PopupWithForm({
    popup: '.popup_type-add-card',
    handleFormSubmit: (item) => {
        popupAddCard.renderLoading(true);
        api.addCard(item)
            .then(res => {
                cardsList.addItem(createCard(res));
            })
            .catch((err) => {
                console.log(err)
            })
            .finally(() => {
                popupAddCard.renderLoading(false);
            })
    }
});
popupAddCard.setEventListeners();

const addCardFormValidator = new FormValidator(validationConfig, formAddCardElement);
addCardFormValidator.enableValidation();
addCardFormValidator.resetValidation();

const popupConfirm = new PopupConfirm('.popup_type-confirm');
popupConfirm.setEventListeners();

const profileEditAvatarValidator = new FormValidator(validationConfig, formEditAvatar);
profileEditAvatarValidator.enableValidation();
profileEditAvatarValidator.resetValidation();

addButton.addEventListener('click', () => {
    popupAddCard.open();
    addCardFormValidator.resetValidation();
});

const popupWithImage = new PopupWithImage('.popup_type-image-caption');
popupWithImage.setEventListeners();

const api = new API({
    baseURL: 'https://mesto.nomoreparties.co/v1/cohort-19',
    token: '368fbfa6-0e9c-41c7-bd15-303b5b8d6ef8',
});

let userID = " ";

Promise.all([
    api.getUserInfo(),
    api.getInitialCards()
])
    .then((res) => {
        const userName = res[0].name;
        const userAbout = res[0].about;
        const userAvatar = res[0].avatar;
        const cardsData = res[1];
        userID = res[0]._id;
        console.log(res);
        userProfile.setUserInfo(userName, userAbout);
        userProfile.setUserAvatar(userAvatar);
        cardsList.renderItems(cardsData);
    })
    .catch((err) => {
        console.log(err)
    });

function createCard(item) {
    const card = new Card({
        data: item,
        userID,
        handleCardClick: () => { popupWithImage.open(item.link, item.name) },
        handleLikeClick: (id, isLiked) => {
            if (isLiked) {
                api.deleteLike(id)
                    .then((res) => { card.setLikes(res.likes); })
                    .catch((err) => { console.log(err) })
            } else {
                api.putLike(id)
                    .then((res) => { card.setLikes(res.likes); })
                    .catch((err) => { console.log(err) })
            }
        },
        handleDeleteClick: (id) => {
            popupConfirm.setSubmitAction(() => {
                api.deleteCard(id)
                    .then((res) => {
                        card.removeCard(res);
                        popupConfirm.close();
                    })
                    .catch((err) => { console.log(err) });
            })
            popupConfirm.open();
        },
    },
        '.card-template_type_default');
    return card.generateCard();
}