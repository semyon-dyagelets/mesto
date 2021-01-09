import PopupWithImage from "./PopupWithImage.js";

export default class Card {
    constructor(data, handleCardClick, cardSelector) {
        this._name = data.name;
        this._link = data.link;
        this._cardSelector = cardSelector;
        this._handleCardClick = handleCardClick;
    }

    _getTemplate() {
        const cardElement = document
        .querySelector(this._cardSelector)
        .content
        .querySelector('.element')
        .cloneNode(true);

        return cardElement;
    }

    generateCard() {
        this._element = this._getTemplate();
        this._setEventListeners();
        this._cardImage = this._element.querySelector('.element__photo');
        this._cardName = this._element.querySelector('.element__place-name');
        this._cardName.textContent = this._name;
        this._cardImage.src = this._link;
        this._cardImage.alt = this._name;
        
        return this._element;
    }

    _setEventListeners() {
        this._element.querySelector('.element__like').addEventListener('click', () => this._handleCardLike());
        this._element.querySelector('.element__delete').addEventListener('click', () => this._removeCard());
        this._element.querySelector('.element__photo').addEventListener('click', () => this._handleCardClick(this._link, this._name));
    }

    _handleCardLike() {
        this._element.querySelector('.element__like').classList.toggle('element__like_active'); 
    }

    _removeCard() {
        this._element.remove();
    }
}