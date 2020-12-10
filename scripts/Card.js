export class Card {
    constructor (data, cardSelector, showImageCaptionPopup) {
        this._name = data.name;
        this._link = data.link;
        this._cardSelector = cardSelector;
        this._showImageCaptionPopup = showImageCaptionPopup;
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
        this._element.querySelector('.element__photo').src = this._link;
        this._element.querySelector('.element__place-name').textContent = this._name;
        return this._element;
    }

    _setEventListeners() {
        this._element.querySelector('.element__like').addEventListener('click', event => {
            event.target.classList.toggle('element__like_active');
        });

        this._element.querySelector('.element__delete').addEventListener('click', event => {
            const card = event.target.closest('.element');
            card.remove();
        });
        this._element.querySelector('.element__photo').addEventListener('click', () => this._showImageCaptionPopup(this._name, this._link));
    }
}