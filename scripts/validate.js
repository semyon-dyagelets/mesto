function showInputError (form, input, config) {
    const inputError = form.querySelector(`#${input.id}-error`);
    inputError.textContent = input.validationMessage;
    input.classList.add(config.inputErrorClass);
}

function hideInputError (form, input, config) {
    const inputError = form.querySelector(`#${input.id}-error`);
    inputError.textContent = '';
    input.classList.remove(config.inputErrorClass);
}

function checkInputValidity (form, input, config) {
    if (!input.validity.valid) {
        showInputError(form, input, config);
    } else {
        hideInputError(form, input, config);
    }
}

function setButtonState (button, isActive, config) {
    if (isActive) {
        button.classList.remove(config.inactiveButtonClass);
        button.disabled = false;
    } else {
        button.classList.add(config.inactiveButtonClass);
        button.disabled = true;
    }
}

function setEventListeners(form, config) {
    const inputList = form.querySelectorAll(config.inputSelector);
    const submitButton = form.querySelector(config.submitButtonSelector);
    setButtonState(submitButton, inputList, config);
    inputList.forEach((input) => {
        input.addEventListener('input', () => {
            checkInputValidity(form, input, config);
            setButtonState(submitButton, form.checkValidity(), config);
        });
    });
}

function enableValidation(config) {
    const formList = document.querySelectorAll(config.formSelector);
    formList.forEach((form) => {
        setEventListeners(form, config);
        form.addEventListener('submit', (event) => {
            event.preventDefault();
        });
        const submitButton = form.querySelector(config.submitButtonSelector);
        setButtonState(submitButton, form.checkValidity(), config);
    });
}

function resetValidation(form, config) {
    const inputList = form.querySelectorAll(config.inputSelector);
    const submitButton = form.querySelector(config.submitButtonSelector);
    inputList.forEach((input) => {
        hideInputError(form, input, config);
    });
    setButtonState(submitButton, false, config);
}

const validationConfig = {
    formSelector: '.popup__container',
    inputSelector: '.popup__input',
    submitButtonSelector: '.popup__button-save',
    inactiveButtonClass: 'popup__button-save_inactive',
    inputErrorClass: 'popup__input_type_error',
  };

enableValidation(validationConfig);