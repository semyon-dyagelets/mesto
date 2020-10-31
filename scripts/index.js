const popup = document.querySelector('.popup');
const editButton = document.querySelector('.profile__edit-button');
let closeButton = popup.querySelector('.popup__button-close');
let profileName = document.querySelector('.profile__name');
let profileProfession = document.querySelector('.profile__profession');
let formElement = popup.querySelector('.popup__container');
let nameInput = popup.querySelector('.popup__edit_name');
let jobInput = popup.querySelector('.popup__edit_description');

function showPopup() {
    popup.classList.add('popup_opened');
}

function closePopup() {
    popup.classList.remove('popup_opened');
}

function formSubmitHandler (evt) {
    evt.preventDefault();
    profileName.textContent = nameInput.value;
    profileProfession.textContent = jobInput.value;
    closePopup();
}

editButton.addEventListener ('click', showPopup);
closeButton.addEventListener ('click', closePopup);
formElement.addEventListener('submit', formSubmitHandler);