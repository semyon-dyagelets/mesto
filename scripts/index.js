const editButton = document.querySelector('.profile__edit-button');
const addButton = document.querySelector('.profile__add-button');
const profileName = document.querySelector('.profile__name');
const profileProfession = document.querySelector('.profile__profession');
const popupTypeEdit = document.querySelector('.popup_type-edit');
const closeButton = popupTypeEdit.querySelector('.popup__button-close');
const formEdit = popupTypeEdit.querySelector('.popup__container_edit-form');
const nameInput = formEdit.querySelector('.popup__input_edit_name');
const jobInput = formEdit.querySelector('.popup__input_edit_description');
const popupTypeAddCard = document.querySelector('.popup_type-add-card');
const closePopupCardButton = popupTypeAddCard.querySelector('.popup__button-close');
const formAddCardElement = popupTypeAddCard.querySelector('.popup__container_add-card-form');
const cardNameInput = formAddCardElement.querySelector('.popup__input_edit_name');
const cardImageInput = formAddCardElement.querySelector('.popup__input_edit_description');
const popupTypeImageCaption = document.querySelector('.popup_type-image-caption');
const popupImageCaption = popupTypeImageCaption.querySelector('.popup__caption-image');
const popupImageTitle = popupTypeImageCaption.querySelector('.popup__caption-image-title');
const closePopupImageCaptionButton = popupTypeImageCaption.querySelector('.popup__button-close');
const cardTemplate = document.querySelector('#template-element').content;
const cardsContainer = document.querySelector('.elements');
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
    const cardElement = cardTemplate.cloneNode(true);
    cardElement.querySelector('.element__place-name').textContent = data.name;
    const imageElement = cardElement.querySelector('.element__photo');
    const deleteButton = cardElement.querySelector('.element__delete');
    imageElement.alt = data.name;
    imageElement.src = data.link;
    cardElement.querySelector('.element__like').addEventListener('click', event => {
        event.target.classList.toggle('element__like_active');
    });
    deleteButton.addEventListener('click', event => {
        const card = event.target.closest('.element');
        card.remove();
    });
    imageElement.addEventListener('click', () => showImageCaptionPopup(data.name, data.link));
    return cardElement;
}

function addCardToContainer(data) {
    const element = createCard(data);
    cardsContainer.prepend(element);
}

initialCards.forEach(addCardToContainer);

function showPopup(popup) {
    popup.classList.add('popup_opened');
    document.addEventListener('keydown', closePopupByEscape);
    document.addEventListener('mousedown', closePopupClickingOutside);
}

function closePopup(popup) {
    popup.classList.remove('popup_opened');
    document.removeEventListener('keydown', closePopupByEscape);
    document.removeEventListener('mousedown', closePopupClickingOutside);
}

function showImageCaptionPopup (name, link) {
    popupImageTitle.textContent = name;
    popupImageCaption.src = link;
    popupImageCaption.alt = popupImageTitle.textContent;
    showPopup(popupTypeImageCaption);
}

function closePopupByEscape(event) {
    if (event.key === 'Escape') {
        const popupOpened = document.querySelector('.popup_opened');
        closePopup(popupOpened);
    }
}

function closePopupClickingOutside (event) {
    if (event.target.classList.contains('popup')) {
        const popupOpened = document.querySelector('.popup_opened');
        closePopup(popupOpened);
    }
}

editButton.addEventListener ('click', () => {
    showPopup(popupTypeEdit);
    nameInput.value = profileName.textContent;
    jobInput.value = profileProfession.textContent;
    resetValidation(popupTypeEdit, validationConfig);
});

closeButton.addEventListener ('click', () => closePopup(popupTypeEdit));

addButton.addEventListener('click', () => {
    showPopup(popupTypeAddCard);
    cardNameInput.value = '';
    cardImageInput.value = '';
    resetValidation(popupTypeAddCard, validationConfig);
});

closePopupCardButton.addEventListener('click', () => closePopup(popupTypeAddCard));

formEdit.addEventListener('submit', event => {
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