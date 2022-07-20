import { formElement } from './form-status.js';
import { offerValue, createErrMessage, createSuccessMessage } from './card.js';
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
const offerOption = {
  flat: 1000,
  bungalow: 0,
  house: 5000,
  palace: 10000,
  hotel: 3000,
};

const roomFieldElement = formElement.querySelector('[name="rooms"]');
const capacityFieldElement = formElement.querySelector('[name="capacity"]');

const offerElement = formElement.querySelector('[name="type"]');
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

const onSyncValidPriceOfferType = () => pristine.validate([priceElement, offerElement]);

const onChangePropertyPriceElement = () => {
  priceElement.placeholder = offerOption[offerElement.value];
  priceElement.min = offerOption[offerElement.value];
  onSyncValidPriceOfferType();
};

const onChangePriceBySlider = () => {
  priceElement.value = sliderPriceElement.noUiSlider.get();
  onSyncValidPriceOfferType();
};

offerElement.addEventListener('change', onChangePropertyPriceElement);
priceElement.addEventListener('change', onSyncValidPriceOfferType);
sliderPriceElement.noUiSlider.on('update', onChangePriceBySlider);

const onSyncTimeOutIn = () => (timeoutElement.value = timeinElement.value);
const onSyncTimeInOut = () => (timeinElement.value = timeoutElement.value);
timeinElement.addEventListener('change', onSyncTimeOutIn);
timeoutElement.addEventListener('change', onSyncTimeInOut);

const validatePrice = () => priceElement.value >= offerOption[offerElement.value];

const validatePriceFill = () => priceElement.value;

const getPriceOptionErrorMessage = () =>
  priceElement.value
    ? `Для типа "${offerValue[offerElement.value]}" цена выше  ${offerOption[offerElement.value]}`
    : 'Заполните поле Цена за ночь, руб.';

const onSyncValidCapacityRoom = () => pristine.validate([capacityFieldElement, roomFieldElement]);
capacityFieldElement.addEventListener('change', onSyncValidCapacityRoom);
roomFieldElement.addEventListener('change', onSyncValidCapacityRoom);

pristine.addValidator(roomFieldElement, validateRoom, getRoomOptionErrorMessage);
pristine.addValidator(capacityFieldElement, validateRoom, getRoomOptionErrorMessage);

pristine.addValidator(priceElement, validatePrice, getPriceOptionErrorMessage);
pristine.addValidator(offerElement, validatePriceFill, getPriceOptionErrorMessage);

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
