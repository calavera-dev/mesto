let popup = document.querySelector('.popup');
let popupOpenButton = document.querySelector('.profile__edit-button');
let popupCloseButton = document.querySelector('.popup__close');
let formElement = document.querySelector('.popup__container');
let nameInput = formElement.querySelector('.popup__input_user_name');
let jobInput = formElement.querySelector('.popup__input_user_occupation');
let profileName = document.querySelector('.profile__name');
let profileOcupation = document.querySelector('.profile__description');

const placeGrid = document.querySelector('.places');
const placeTemplate = document.querySelector('#place-template').content;

const initialCards = [
  {
    name: 'Архыз',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
  },
  {
    name: 'Челябинская область',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
  },
  {
    name: 'Иваново',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
  },
  {
    name: 'Камчатка',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
  },
  {
    name: 'Холмогорский район',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
  },
  {
    name: 'Байкал',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
  }
];

initialCards.forEach(function(currentCard) {
  const placesItem = placeTemplate.querySelector('.places__item').cloneNode(true);
  placesItem.querySelector('.places__image').src = currentCard.link;
  placesItem.querySelector('.places__title').textContent = currentCard.name;
  placeGrid.append(placesItem);
});

function openPopup() {
  popup.classList.add('popup_is-opened');
  nameInput.value = profileName.textContent;
  jobInput.value = profileOcupation.textContent;
}

function closePopup() {
  popup.classList.remove('popup_is-opened');
}
function formSubmitHandler(evt) {
  evt.preventDefault();
  profileName.textContent = nameInput.value;
  profileOcupation.textContent = jobInput.value;
  closePopup();
}

popupOpenButton.addEventListener('click', openPopup);
popupCloseButton.addEventListener('click', closePopup);
formElement.addEventListener('submit', formSubmitHandler);