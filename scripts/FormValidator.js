export class FormValidator {
    constructor (config, form) {
        this._config = config;
        this._form = form;
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
    const inputList = form.querySelectorAll(this._config.inputSelector);
    const submitButton = form.querySelector(this._config.submitButtonSelector);
    this._setButtonState(submitButton, inputList);
    inputList.forEach((input) => {
        input.addEventListener('input', () => {
            this._checkInputValidity(form, input);
            this._setButtonState(submitButton, form.checkValidity());
        });
    });
}

enableValidation() {
    this._form.addEventListener('submit', (event) => {
        event.preventDefault();
    });
    this._setEventListeners(this._form);
    const submitButton = this._form.querySelector(this._config.submitButtonSelector);
    this._setButtonState(submitButton, this._form.checkValidity());
    };

resetValidation() {
    const submitButton = this._form.querySelector(this._config.submitButtonSelector);
    const inputList = this._form.querySelectorAll(this._config.inputSelector);
    inputList.forEach((input) => {
        this._hideInputError(this._form, input);
    });
    this._setButtonState(submitButton, false);
};
}