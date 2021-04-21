const popupOpenButton = document.querySelector('.profile__edit-button');
const popupOpen = document.querySelector('.popup');
const popupCloseButton = document.querySelector('.popup__close');

function togglePopup () {
  popupOpen.classList.toggle('popup_is-opened');
}

popupOpenButton.addEventListener('click', togglePopup);

popupCloseButton.addEventListener('click', togglePopup);


let formElement = document.querySelector('.popup__container');

function formSubmitHandler (evt) {
	evt.preventDefault();

// Находим поля формы в DOM
	let nameInput = formElement.querySelector('.popup__name');
	let jobInput = formElement.querySelector('.popup__description');

// Получите значение полей из свойства value
  let nameValue = nameInput.getAttribute('value');
  let jobValue = jobInput.getAttribute('value');

	// Выберите элементы, куда должны быть вставлены значения полей
  let profileName = document.querySelector('.profile__name');
  let profileOcupation = document.querySelector('.profile__description');

	// Вставьте новые значения с помощью textContent
  profileName.textContent = nameValue;
  profileOcupation.textContent = jobValue;
}

// Прикрепляем обработчик к форме:
// он будет следить за событием “submit” - «отправка»
formElement.addEventListener('submit', formSubmitHandler);
