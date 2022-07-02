import { formElement } from './form-status.js';
import { OFFER_TYPE_VALUE, ROOM_OPTION, OFFER_TYPE_OPTION } from './data.js';

const pristine = new Pristine(
  formElement,
  {
    classTo: 'ad-form__element',
    errorTextParent: 'ad-form__element',
    errorTextTag: 'div'
  }, false);

//для Количество комнат и количество мест отдельная проверка
const roomFieldElement = formElement.querySelector('[name="rooms"]');
const capacityFieldElement = formElement.querySelector('[name="capacity"]');
//для Типа жилья и цены отдельная проверка
const offerTypeElement = formElement.querySelector('[name="type"]');
const priceElement = formElement.querySelector('[name="price"]');
//для времени заезда и выезда отдельная проверка
const timeinElement = formElement.querySelector('[name="timein"]');
const timeoutElement = formElement.querySelector('[name="timeout"]');


//функция, которая проверяет, что кол-во гостей, соответсвует заданному количеству комнат
const validateRoom = () => ROOM_OPTION[roomFieldElement[roomFieldElement.selectedIndex].text].includes(capacityFieldElement[capacityFieldElement.selectedIndex].text);
//функция, которая генерирует текст ошибки
const getroomOptionErrorMessage = () =>
  `Если выбрано ${roomFieldElement[roomFieldElement.selectedIndex].text}, то в поле "Количество мест" можно указать: ${ROOM_OPTION[roomFieldElement[roomFieldElement.selectedIndex].text].join(' или ')}`;
//переопределяем значение поля Цена за ночь. в зависимости от выбранного значения в поле Тип жилья
offerTypeElement.addEventListener('change', (evt) => {
  evt.preventDefault();
  priceElement.value = OFFER_TYPE_OPTION[offerTypeElement.value];
  priceElement.placeholder = OFFER_TYPE_OPTION[offerTypeElement.value];
  priceElement.min = OFFER_TYPE_OPTION[offerTypeElement.value];
});

//переопределяем время выезда в зависимости от выбранного значения в поле время заезда и наоборот
timeinElement.addEventListener('change', (evt) => {
  evt.preventDefault();
  timeoutElement.value = timeinElement.value;
});
timeoutElement.addEventListener('change', (evt) => {
  evt.preventDefault();
  timeinElement.value = timeoutElement.value;
});

const validatePrice = () => priceElement.value >= OFFER_TYPE_OPTION[offerTypeElement.value];
const getpriceOptionErrorMessage = () =>
  `Минимальное значение для типа жилья "${OFFER_TYPE_VALUE[offerTypeElement.value]}" — ${OFFER_TYPE_OPTION[offerTypeElement.value]}`;

pristine.addValidator(roomFieldElement, validateRoom, getroomOptionErrorMessage);
pristine.addValidator(offerTypeElement, validatePrice, getpriceOptionErrorMessage);


formElement.addEventListener('submit', (evt) => {
  evt.preventDefault();
  pristine.validate();
});
