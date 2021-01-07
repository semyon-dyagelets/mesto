export class Popup {
    constructor(popupSelector) {
        this._popupSelector = document.querySelector(popupSelector);
    }

    open() {
        this._popupSelector.classList.add('popup_opened');
        document.addEventListener('keydown', this._handleEscClose.bind(this));
        document.addEventListener('mousedown', this._handleOverlayClick.bind(this));
    }

    close() {
        this._popupSelector.classList.remove('popup_opened');
        document.removeEventListener('keydown', this._handleEscClose.bind(this));
        document.removeEventListener('mousedown', this._handleOverlayClick.bind(this));
    }

    setEventListeners() {
        this._popupSelector.querySelector('.popup__button-close').addEventListener('click', () => {
            this.close();
        });
    }

    _handleEscClose(evt) {
        if (evt.key === 'Escape') {
            this.close();
        }
    }

    _handleOverlayClick(evt) {
        if (evt.target.classList.contains('popup')) {
            this.close();
        }
    }
}