const hideInputError = (formElement, inputElement) => {
  const { popupInputError, popupInputErrorActive } = config;
  const errorElement = formElement.querySelector(`#${inputElement.id}-error`);
  inputElement.classList.remove(popupInputError);
  errorElement.classList.remove(popupInputErrorActive);
  errorElement.textContent = '';
}

const showInputError = (formElement, inputElement) => {
  const { popupInputError, popupInputErrorActive } = config;
  const errorElement = formElement.querySelector(`#${inputElement.id}-error`);
  inputElement.classList.add(popupInputError);
  errorElement.classList.add(popupInputErrorActive);
  errorElement.textContent = inputElement.validationMessage;
}

const checkInputValidity = (formElement, inputElement, config) => {
  if (inputElement.validity.valid) {
    hideInputError(formElement, inputElement, config);
  } else {
    showInputError(formElement, inputElement, config);
  }
}

const hasInvalidInput = (inputList) => {
  return inputList.some(inputElement => !inputElement.validity.valid)
}

const toggleButtonState = (buttonElement, inputList) => {
  if (hasInvalidInput(inputList)) {
    buttonElement.disabled = true;
  } else {
    buttonElement.disabled = false;
  }
}

const setIventListener = (formElement, config) => {
  const { popupInput, popupSubmit, ...restConfig} = config;
  formElement.addEventListener('submit', (evt) => {
    evt.preventDefault();
  });
  const inputList = Array.from(formElement.querySelectorAll(popupInput));

  const buttonElement = formElement.querySelector(popupSubmit);

  inputList.forEach((inputElement) => {
    inputElement.addEventListener('input', () => {
      checkInputValidity(formElement, inputElement, restConfig);
      toggleButtonState(buttonElement, inputList);
    })
  })
  toggleButtonState(buttonElement, inputList);
}

const enableValidation = (config) => {
  const { popupForm, ...restConfig } = config;
  const formList = Array.from(document.querySelectorAll(popupForm));
  formList.forEach(formElement => {
    setIventListener(formElement, restConfig);
  })
}

const updateInputValue = (inputElement, value) => {
  inputElement.value = value;
  inputElement.dispatchEvent(new Event('input'));
};