export default class FormValidator {
    constructor (config, form) {
        this._config = config;
        this._form = form;
        this._submitButton = this._form.querySelector(this._config.submitButtonSelector);
        this._inputList = this._form.querySelectorAll(this._config.inputSelector);
    }

_showInputError (form, input) {
    const inputError = form.querySelector(`#${input.id}-error`);
    inputError.textContent = input.validationMessage;
    input.classList.add(this._config.inputErrorClass);
}

_hideInputError (form, input) {
    const inputError = form.querySelector(`#${input.id}-error`);
    inputError.textContent = '';
    input.classList.remove(this._config.inputErrorClass);
}

_checkInputValidity (form, input) {
    if (!input.validity.valid) {
        this._showInputError(form, input);
    } else {
        this._hideInputError(form, input);
    }
}

_setButtonState (button, isActive) {
    if (isActive) {
        button.classList.remove(this._config.inactiveButtonClass);
        button.disabled = false;
    } else {
        button.classList.add(this._config.inactiveButtonClass);
        button.disabled = true;
    }
}

_setEventListeners(form) {
    this._setButtonState(this._submitButton, this._inputList);
    this._inputList.forEach((input) => {
        input.addEventListener('input', () => {
            this._checkInputValidity(form, input);
            this._setButtonState(this._submitButton, form.checkValidity());
        });
    });
}

enableValidation() {
    this._form.addEventListener('submit', (event) => {
        event.preventDefault();
    });
    this._setEventListeners(this._form);
    this._setButtonState(this._submitButton, this._form.checkValidity());
    };

resetValidation() {
    this._inputList.forEach((input) => {
        this._hideInputError(this._form, input);
    });
    this._setButtonState(this._submitButton, false);
};
}