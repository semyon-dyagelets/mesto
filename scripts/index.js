const popup = document.querySelector('.popup');
const editButton = document.querySelector('.profile__edit-button');
let closeButton = popup.querySelector('.popup__button-close');
let profileName = document.querySelector('.profile__name');
let profileProfession = document.querySelector('.profile__profession');
let formElement = popup.querySelector('.popup__container');
function formSubmitHandler (evt) {
    evt.preventDefault();
    let nameInput = popup.querySelector('.popup__edit-name');
    let jobInput = popup.querySelector('.popup__edit-description');
    profileName.textContent = nameInput.value;
    profileProfession.textContent = jobInput.value;
    popup.classList.toggle('popup_opened');
}

formElement.addEventListener('submit', formSubmitHandler);

function showPopup() {
    popup.classList.toggle('popup_opened');
}

editButton.addEventListener ('click', showPopup);
closeButton.addEventListener ('click', showPopup);