const config = {
  popupForm: '.popup__form',
  popupInput: '.popup__input',
  popupSubmit: '.popup__submit',
  popupInputError: '.popup__input_type_error',
  popupInputErrorActive: 'popup__input-error_active',
};

enableValidation(config);

const popupEditProfile = document.querySelector('.popup_type_edit-profile');
const popupAddPlace = document.querySelector('.popup_type_add-place');
const imagePopupElement = document.querySelector('.popup_type_image-overlay');

const popupInputsAddPlace = popupAddPlace.querySelectorAll('.popup__input');
const popupSubmitAddPlace = popupAddPlace.querySelector('.popup__submit');

const profileEditButton = document.querySelector('.profile__edit-button');
const addPlaceButton = document.querySelector('.profile__add-button');

const popupCloseButtons = document.querySelectorAll('.popup__close');
const popupSubmit = document.querySelector('.popup__submit');
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
  placeLink.value = "";
  toggleButtonState(popupSubmitAddPlace, Array.from(popupInputsAddPlace));
  closePopup(popupAddPlace);
}

function handleCloseViaEscape(evt) {
  if (evt.key === 'Escape') {
    closePopup(document.querySelector('.popup_is-opened'));
  }
}

function openPopup(popupElement) {
  popupElement.classList.add('popup_is-opened');
  document.addEventListener('keydown', handleCloseViaEscape);
}
function closePopup(popupElement) {
  popupElement.classList.remove('popup_is-opened');
  document.removeEventListener('keydown', handleCloseViaEscape);
}

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

popupCloseButtons.forEach(item => {
  const popup = item.closest('.popup');
  item.addEventListener('click', function () {
    closePopup(popup);
  })
});

const popupList = document.querySelectorAll('.popup');
popupList.forEach((popup) => {
  popup.addEventListener('click', (event) => {
    if (event.target === popup) {
      closePopup(popup);
    };
  });
});

popupEditProfile.addEventListener('submit', handleProfileSubmit);
popupAddPlace.addEventListener('submit', handleNewCardSubmit);