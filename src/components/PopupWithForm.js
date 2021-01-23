import { Popup } from './Popup.js';

export default class PopupWithForm extends Popup {
    constructor({ popup, handleFormSubmit }) {
        super(popup);
        this._handleFormSubmit = handleFormSubmit;
        this._form = this._popup.querySelector('.popup__container');
        this._inputList = this._form.querySelectorAll('.popup__input');
        this._buttonSave = this._form.querySelector('.popup__button-save');
    }

    close() {
        super.close();
        this._form.reset();
    }

    setEventListeners() {
        super.setEventListeners();
        this._form.addEventListener('submit', (evt) => {
            evt.preventDefault();
            this._handleFormSubmit(this._getInputValues());
            this.close();
        });
    }

    _getInputValues() {
        this._formValues = {};
        this._inputList.forEach((input) => {
            this._formValues[input.name] = input.value;
        });
        return this._formValues;
    }

    renderLoading(isLoading) {
        if (isLoading) {
            this._buttonSave.textContent = "Сохранение";
        } else {
            this._buttonSave.textContent = "Сохранить";
        }
    }

}