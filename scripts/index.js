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
	let nameInput = formElement.querySelector('.popup__name');
	let jobInput = formElement.querySelector('.popup__description');
  let nameValue = nameInput.value;
  let jobValue = jobInput.value;
  let profileName = document.querySelector('.profile__name');
  let profileOcupation = document.querySelector('.profile__description');
  let savePopup = document.querySelector('.popup__submit');
  profileName.textContent = nameValue;
  profileOcupation.textContent = jobValue;
  savePopup.addEventListener('click', togglePopup);
}

formElement.addEventListener('submit', formSubmitHandler);
