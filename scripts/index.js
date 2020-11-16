const editButton = document.querySelector('.profile__edit-button');
const addButton = document.querySelector('.profile__add-button');
const deleteButton = document.querySelector('.element__delete');
const profileName = document.querySelector('.profile__name');
const profileProfession = document.querySelector('.profile__profession');
const popupTypeEdit = document.querySelector('.popup_type-edit');
const closeButton = popupTypeEdit.querySelector('.popup__button-close');
const formElement = popupTypeEdit.querySelector('.popup__container_edit-form');
const nameInput = popupTypeEdit.querySelector('.popup__input_edit_name');
const jobInput = popupTypeEdit.querySelector('.popup__input_edit_description');
const popupTypeAddCard = document.querySelector('.popup_type-add-card');
const closePopupCardButton = popupTypeAddCard.querySelector('.popup__button-close');
const formAddCardElement = popupTypeAddCard.querySelector('.popup__container_add-card-form');
const cardNameInput = popupTypeAddCard.querySelector('.popup__input_edit_name');
const cardImageInput = popupTypeAddCard.querySelector('.popup__input_edit_description');
const popupTypeImageCaption = document.querySelector('.popup_type-image-caption');
const popupImageCaption = popupTypeImageCaption.querySelector('.popup__caption-image');
const popupImageTitle = popupTypeImageCaption.querySelector('.popup__caption-image-title');
const closePopupImageCaptionButton = popupTypeImageCaption.querySelector('.popup__button-close');
const initialCards = [
    {
        name: 'Архыз',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
    },
    {
        name: 'Челябинская область',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
    },
    {
        name: 'Иваново',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
    },
    {
        name: 'Камчатка',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
    },
    {
        name: 'Холмогорский район',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
    },
    {
        name: 'Байкал',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
    }
];

function createCard(data) {
    const cardElement = document.querySelector('#template-element').content.cloneNode(true);
    cardElement.querySelector('.element__place-name').textContent = data.name;
    const imageElement = cardElement.querySelector('.element__photo');
    imageElement.alt = data.name;
    imageElement.src = data.link;
    cardElement.querySelector('.element__like').addEventListener('click', event => {
        event.target.classList.toggle('element__like_active');
    });
    cardElement.querySelector('.element__delete').addEventListener('click', event => {
        const card = event.target.closest('.element');
        card.remove();
    });
    imageElement.addEventListener('click', () => showImageCaptionPopup(data.name, data.link));
    return cardElement;
}

function addCardToContainer(data) {
    const elements = document.querySelector('.elements');
    const element = createCard(data);
    elements.prepend(element);
}

initialCards.forEach(addCardToContainer);

function showPopup(popup) {
    popup.classList.add('popup_opened');
}

function closePopup(popup) {
    popup.classList.remove('popup_opened');
}

function showImageCaptionPopup (name, link) {
    popupImageTitle.textContent = name;
    popupImageCaption.src = link;
    popupImageCaption.alt = popupImageTitle.textContent;
    showPopup(popupTypeImageCaption);
}

editButton.addEventListener ('click', () => {
    showPopup(popupTypeEdit);
    nameInput.value = profileName.textContent;
    jobInput.value = profileProfession.textContent;
});
closeButton.addEventListener ('click', () => closePopup(popupTypeEdit));
addButton.addEventListener('click', () => showPopup(popupTypeAddCard));
closePopupCardButton.addEventListener('click', () => closePopup(popupTypeAddCard));
formElement.addEventListener('submit', event => {
    event.preventDefault();
    profileName.textContent = nameInput.value;
    profileProfession.textContent = jobInput.value;
    closePopup(popupTypeEdit);
});
formAddCardElement.addEventListener('submit', event => {
    event.preventDefault();
    const cardData = {
        name: cardNameInput.value,
        link: cardImageInput.value,
    }
    addCardToContainer(cardData);
    closePopup(popupTypeAddCard);
    formAddCardElement.reset();
});
closePopupImageCaptionButton.addEventListener('click', () => closePopup(popupTypeImageCaption));