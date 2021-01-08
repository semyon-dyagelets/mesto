import { Popup } from './Popup.js';
export default class PopupWithImage extends Popup {
    constructor(popup) {
        super(popup);
        this._popupCaptionImage = this._popup.querySelector('.popup__caption-image');
        this._popupCaptionImageTitle = this._popup.querySelector('.popup__caption-image-title');
    }

    open(link, name) {
        this._popupCaptionImage.src = link;
        this._popupCaptionImageTitle.textContent = name;
        super.open();
    }
}