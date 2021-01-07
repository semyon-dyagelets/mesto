import { Popup } from './Popup.js';
export default class PopupWithImage extends Popup {
    constructor(popupSelector) {
        super(popupSelector);
    }

    open(link, name) {
        this._popupSelector.querySelector('.popup__caption-image').src = link;
        this._popupSelector.querySelector('.popup__caption-image-title').textContent = name;
        super.open();
    }

    close() {
        super.close();
    }

    setEventListeners() {
        super.setEventListeners();
    }
}