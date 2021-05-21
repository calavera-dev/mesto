const config = {
  popupForm: '.popup__form',
  popupInput: '.popup__input',
  popupSubmit: '.popup__submit',
  popupInputError: '.popup__input_type_error',
  popupInputErrorActive: 'popup__input-error_active',
};

enableValidation(config);

const popups = document.querySelectorAll('.popup');

const popupEditProfile = document.querySelector('.popup_type_edit-profile');
const popupAddPlace = document.querySelector('.popup_type_add-place');
const imagePopupElement = document.querySelector('.popup_type_image-overlay');

const profileEditButton = document.querySelector('.profile__edit-button');
const addPlaceButton = document.querySelector('.profile__add-button');

const popupCloseButtons = document.querySelectorAll('.popup__close');

const nameInput = popupEditProfile.querySelector('.popup__input_user_name');
const jobInput = popupEditProfile.querySelector('.popup__input_user_occupation');

const placeName = popupAddPlace.querySelector('.popup__input_place_name');
const placeLink = popupAddPlace.querySelector('.popup__input_place_link');

const popupImage = document.querySelector('.popup__image');
const popupCaption = document.querySelector('.popup__caption');

const profileName = document.querySelector('.profile__name');
const profileOcupation = document.querySelector('.profile__description');

const placeGrid = document.querySelector('.places');
const placeTemplate = document.querySelector('#place-template');

function createPlace(currentCard) {
  const placesItem = placeTemplate.content.querySelector('.places__item').cloneNode(true);
  const placeImage = placesItem.querySelector('.places__image');
  const placeTitle = placesItem.querySelector('.places__title');
  const placeDelete = placesItem.querySelector('.places__trash-icon');
  const placeLikeButton = placesItem.querySelector('.places__like-icon');

  placeImage.addEventListener('click', function () {
    popupImage.src = currentCard.link;
    popupImage.alt = currentCard.name;
    popupCaption.textContent = currentCard.name;
    openPopup(imagePopupElement);
  });

  placeImage.src = currentCard.link;
  placeTitle.textContent = currentCard.name;
  placeImage.alt = currentCard.name;

  placeLikeButton.addEventListener('click', function () {
    placeLikeButton.classList.toggle('places__like-icon_like_active');
  })
  placeDelete.addEventListener('click', function (e) {
    e.target.closest('.places__item').remove();
  })
  return placesItem;
}

initialCards.forEach(function (currentCard) {
  const newPlace = createPlace(currentCard);
  placeGrid.append(newPlace);
});

function handleProfileSubmit(evt) {
  evt.preventDefault();
  profileName.textContent = nameInput.value;
  profileOcupation.textContent = jobInput.value;
  closePopup(popupEditProfile);
}

function handleNewCardSubmit(evt) {
  evt.preventDefault();
  placeGrid.prepend(createPlace({
    name: placeName.value,
    link: placeLink.value
  }));
  placeName.value = "";
  placeName.dispatchEvent(new Event('input'));
  placeLink.value = "";
  placeLink.dispatchEvent(new Event('input'));
  closePopup(popupAddPlace);
}

function openPopup(popupElement) {
  popupElement.classList.add('popup_is-opened');
}
function closePopup(popupElement) {
  popupElement.classList.remove('popup_is-opened');
}

popups.forEach((popup) => {
  popup.addEventListener('click', (evt) => {
    if (evt.target.classList.contains('popup_is-opened')) {
      closePopup(popup);
    }
    if (evt.target.classList.contains('popup__close')) {
      closePopup(popup);
    }
  });
})

popupEditProfile.addEventListener('mousedown', function (event) {
  if (event.target === event.currentTarget) {
    closePopup(popupEditProfile);
  }
})

profileEditButton.addEventListener('click', function () {
  nameInput.value = profileName.textContent;
  jobInput.value = profileOcupation.textContent;
  openPopup(popupEditProfile);
});

addPlaceButton.addEventListener('click', function () {
  openPopup(popupAddPlace);
});

popupEditProfile.addEventListener('submit', handleProfileSubmit);
popupAddPlace.addEventListener('submit', handleNewCardSubmit);