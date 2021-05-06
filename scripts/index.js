let popup = document.querySelector('.popup_type_edit-profile');
let editPopup = document.querySelector('.popup_type_add-place');
let imagePopupElement = document.querySelector('.popup_type_image-overlay');

let popupOpenButton = document.querySelector('.profile__edit-button');
let placeAddButton = document.querySelector('.profile__add-button');

let popupCloseButton = document.querySelectorAll('.popup__close');

let nameInput = popup.querySelector('.popup__input_user_name');
let jobInput = popup.querySelector('.popup__input_user_occupation');

let placeName = editPopup.querySelector('.popup__input_place_name');
let placeLink = editPopup.querySelector('.popup__input_place_link');

let popupImage = document.querySelector('.popup__image');
let popupCaption = document.querySelector('.popup__caption');

let profileName = document.querySelector('.profile__name');
let profileOcupation = document.querySelector('.profile__description');


const placeGrid = document.querySelector('.places');
const placeTemplate = document.querySelector('#place-template');

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

function createPlace(currentCard) {
  const placesItem = placeTemplate.content.querySelector('.places__item').cloneNode(true);
  const placeImage = placesItem.querySelector('.places__image');
  const placeTitle = placesItem.querySelector('.places__title');
  const placeDelete = placesItem.querySelector('.places__trash-icon');
  const placeLikeButton = placesItem.querySelector('.places__like-icon');

  placeImage.addEventListener('click', function() {
    popupImage.src = currentCard.link;
    popupCaption.textContent = currentCard.name;
    openPopup(imagePopupElement);
  });
  
  placeImage.src = currentCard.link;
  placeTitle.textContent = currentCard.name;
  placeImage.alt = currentCard.name;

  placeLikeButton.addEventListener('click', function(){
    placeLikeButton.classList.toggle('places__like-icon_like_active');
  })
  placeDelete.addEventListener('click', function(e){
    e.target.closest('.places__item').remove();
  })

  return placesItem;
}
initialCards.forEach(function(currentCard) {
  const newPlace = createPlace(currentCard);
  placeGrid.append(newPlace);
});

function formSubmitHandler(evt) {
  evt.preventDefault();
  profileName.textContent = nameInput.value;
  profileOcupation.textContent = jobInput.value;
  closePopup(popup);
}
function editFormSubmitHandler(evt) {
  evt.preventDefault();
  const newCard = {}
  newCard.name = placeName.value;
  newCard.link = placeLink.value;
  placeGrid.prepend(createPlace(newCard));
  closePopup(editPopup);
}
function openPopup(popupElement) {
  popupElement.classList.add('popup_is-opened');
}
function closePopup(popupElement) {
  popupElement.classList.remove('popup_is-opened');
}

popupOpenButton.addEventListener('click', function() {
  nameInput.value = profileName.textContent;
  jobInput.value = profileOcupation.textContent;
  openPopup(popup);
});
placeAddButton.addEventListener('click', function() {
  placeName.value = "";
  placeLink.value = "";
  openPopup(editPopup);
});
popupCloseButton[0].addEventListener('click', function() {
  closePopup(popup);
});
popupCloseButton[1].addEventListener('click', function() {
  closePopup(editPopup);
});
popupCloseButton[2].addEventListener('click', function() {
  closePopup(imagePopupElement);
});
popup.addEventListener('submit', formSubmitHandler);
editPopup.addEventListener('submit', editFormSubmitHandler);
