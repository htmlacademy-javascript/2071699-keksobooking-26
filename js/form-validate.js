import { formElement } from './form-status.js';
import { offerTypeValue, createErrMessage, createSuccessMessage } from './card.js';
import { sendData } from './fetch-data.js';
import { restMarkers } from './map.js';
import { restFormImg } from './photo-load.js';
import { mapFiltersElement } from './map-filters.js';

const ROOM_OPTION = {
  '1 комната': ['для 1 гостя'],
  '2 комнаты': ['для 2 гостей', 'для 1 гостя'],
  '3 комнаты': ['для 3 гостей', 'для 2 гостей', 'для 1 гостя'],
  '100 комнат': ['не для гостей'],
};
const offerTypeOption = {
  flat: 1000,
  bungalow: 0,
  house: 5000,
  palace: 10000,
  hotel: 3000,
};

const roomFieldElement = formElement.querySelector('[name="rooms"]');
const capacityFieldElement = formElement.querySelector('[name="capacity"]');

const offerTypeElement = formElement.querySelector('[name="type"]');
const priceElement = formElement.querySelector('[name="price"]');
const sliderPriceElement = document.querySelector('.ad-form__slider');

const timeinElement = formElement.querySelector('[name="timein"]');
const timeoutElement = formElement.querySelector('[name="timeout"]');

const restButtonElement = formElement.querySelector('.ad-form__reset');
const submitButtonElement = document.querySelector('.ad-form__submit');

const pristine = new Pristine(formElement, {
  classTo: 'ad-form__element',
  errorTextParent: 'ad-form__element',
  errorTextTag: 'div',
});

noUiSlider.create(sliderPriceElement, {
  range: {
    min: 0,
    max: 100000,
  },
  start: 5000,
  step: 1,
  connect: 'lower',
});

const validateRoom = () =>
  ROOM_OPTION[roomFieldElement[roomFieldElement.selectedIndex].text].includes(
    capacityFieldElement[capacityFieldElement.selectedIndex].text,
  );

const getRoomOptionErrorMessage = () =>
  `Если выбрано ${
    roomFieldElement[roomFieldElement.selectedIndex].text
  }, то в поле "Количество мест" можно указать: ${ROOM_OPTION[
    roomFieldElement[roomFieldElement.selectedIndex].text
  ].join(' или ')}`;

const syncValidPriceOfferType = () => pristine.validate([priceElement, offerTypeElement]);

const changePropertyPriceElement = () => {
  priceElement.placeholder = offerTypeOption[offerTypeElement.value];
  priceElement.min = offerTypeOption[offerTypeElement.value];
  syncValidPriceOfferType();
};

const changePriceBySlider = () => {
  priceElement.value = sliderPriceElement.noUiSlider.get();
  syncValidPriceOfferType();
};

offerTypeElement.addEventListener('change', changePropertyPriceElement);
priceElement.addEventListener('change', syncValidPriceOfferType);
sliderPriceElement.noUiSlider.on('update', changePriceBySlider);

const syncTimeOutIn = () => (timeoutElement.value = timeinElement.value);
const syncTimeInOut = () => (timeinElement.value = timeoutElement.value);
timeinElement.addEventListener('change', syncTimeOutIn);
timeoutElement.addEventListener('change', syncTimeInOut);

const validatePrice = () => priceElement.value >= offerTypeOption[offerTypeElement.value];

const validatePriceFill = () => priceElement.value;

const getPriceOptionErrorMessage = () =>
  priceElement.value
    ? `Минимальное значение для типа жилья "${offerTypeValue[offerTypeElement.value]}" — ${
      offerTypeOption[offerTypeElement.value]
    }`
    : 'Заполните поле Цена за ночь, руб.';

const syncValidCapacityRoom = () => pristine.validate([capacityFieldElement, roomFieldElement]);
capacityFieldElement.addEventListener('change', syncValidCapacityRoom);
roomFieldElement.addEventListener('change', syncValidCapacityRoom);

pristine.addValidator(roomFieldElement, validateRoom, getRoomOptionErrorMessage);
pristine.addValidator(capacityFieldElement, validateRoom, getRoomOptionErrorMessage);

pristine.addValidator(priceElement, validatePrice, getPriceOptionErrorMessage);
pristine.addValidator(offerTypeElement, validatePriceFill, getPriceOptionErrorMessage);

const setBlockSubmitButton = () => {
  submitButtonElement.disabled = true;
  submitButtonElement.classList.add('ad-form__submit--disabled');
  submitButtonElement.textContent = 'Данные отправляются...';
};

const setUnblockSubmitButton = () => {
  submitButtonElement.disabled = false;
  submitButtonElement.classList.remove('ad-form__submit--disabled');
  submitButtonElement.textContent = 'Опубликовать';
};

const setResetElements = () => {
  formElement.reset();
  restFormImg();
  restMarkers();
  mapFiltersElement.reset();
  pristine.reset();
  sliderPriceElement.noUiSlider.reset();
};

const onSuccessSendData = () => {
  createSuccessMessage();
  setUnblockSubmitButton();
  setResetElements();
};
const onErrorSendData = () => {
  createErrMessage();
  setUnblockSubmitButton();
};

const setUserFormSubmit = () => {
  formElement.addEventListener('submit', (evt) => {
    evt.preventDefault();
    const isValid = pristine.validate();
    if (isValid) {
      setBlockSubmitButton();
      sendData(onSuccessSendData, onErrorSendData, new FormData(evt.target));
    }
  });
};

restButtonElement.addEventListener('click', (evt) => {
  evt.preventDefault();
  setResetElements();
});

export { setUserFormSubmit };
