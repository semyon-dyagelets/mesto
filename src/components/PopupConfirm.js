import { Popup } from './Popup.js';

export default class PopupConfirm extends Popup {
    constructor(popup) {
        super(popup);
        this._form = this._popup.querySelector('.popup__container');
    }

    setEventListeners() {
        super.setEventListeners();
        this._form.addEventListener('submit', (evt) => {
            evt.preventDefault();
            this._handleSubmitCallback();
            this.close();
        });
    }

    setSubmitAction(submitAction) {
        this._handleSubmitCallback = submitAction;
    }
}
