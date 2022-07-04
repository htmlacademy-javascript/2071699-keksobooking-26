import { formElement } from './form-status.js';
import { OFFER_TYPE_VALUE } from './card.js';
const pristine = new Pristine(
  formElement,
  {
    classTo: 'ad-form__element',
    errorTextParent: 'ad-form__element',
    errorTextTag: 'div'
  });

//для Количество комнат и количество мест отдельная проверка
const roomFieldElement = formElement.querySelector('[name="rooms"]');
const capacityFieldElement = formElement.querySelector('[name="capacity"]');
//для Типа жилья и цены отдельная проверка
const offerTypeElement = formElement.querySelector('[name="type"]');
const priceElement = formElement.querySelector('[name="price"]');
const sliderPriceElement = document.querySelector('.ad-form__slider');
//для времени заезда и выезда отдельная проверка
const timeinElement = formElement.querySelector('[name="timein"]');
const timeoutElement = formElement.querySelector('[name="timeout"]');


//при выборе количества комнат вводятся ограничения на допустимые варианты выбора количества гостей
const ROOM_OPTION = {
  '1 комната': ['для 1 гостя'],
  '2 комнаты': ['для 2 гостей', 'для 1 гостя'],
  '3 комнаты': ['для 3 гостей', 'для 2 гостей', 'для 1 гостя'],
  '100 комнат': ['не для гостей']
};
const OFFER_TYPE_OPTION = {
  flat: 1000,
  bungalow: 0,
  house: 5000,
  palace: 10000,
  hotel: 3000
};
noUiSlider.create(sliderPriceElement, {
  range: {
    min: 0,
    max: 100000,
  },
  start: 5000,
  step: 1,
  connect: 'lower',
});

//функция, которая проверяет, что кол-во гостей, соответсвует заданному количеству комнат
const validateRoom = () => ROOM_OPTION[roomFieldElement[roomFieldElement.selectedIndex].text].includes(capacityFieldElement[capacityFieldElement.selectedIndex].text);
//функция, которая генерирует текст ошибки
const getroomOptionErrorMessage = () =>
  `Если выбрано ${roomFieldElement[roomFieldElement.selectedIndex].text}, то в поле "Количество мест" можно указать: ${ROOM_OPTION[roomFieldElement[roomFieldElement.selectedIndex].text].join(' или ')}`;
//переопределяем значение поля Цена за ночь. в зависимости от выбранного значения в поле Тип жилья
offerTypeElement.addEventListener('change', () => {
  priceElement.placeholder = OFFER_TYPE_OPTION[offerTypeElement.value];
  priceElement.min = OFFER_TYPE_OPTION[offerTypeElement.value];

  pristine.validate([priceElement, offerTypeElement]);
}
);

priceElement.addEventListener('change', () => {
  pristine.validate([priceElement, offerTypeElement]);
});

sliderPriceElement.noUiSlider.on('update', () => {
  priceElement.value = sliderPriceElement.noUiSlider.get();
  pristine.validate([priceElement, offerTypeElement]);
});


//переопределяем время выезда в зависимости от выбранного значения в поле время заезда и наоборот
timeinElement.addEventListener('change', () => {
  timeoutElement.value = timeinElement.value;
});
timeoutElement.addEventListener('change', () => {
  timeinElement.value = timeoutElement.value;
});
//проверка, что цена не ниже допустимой
const validatePrice = () => priceElement.value >= OFFER_TYPE_OPTION[offerTypeElement.value];
//проверка, что поле с ценой заполнено
const validateIsNullPrice = () => priceElement.value;
//Сообщение об ошибке выводится в зависимости от значения в поле цена (пустое или не пустое)
const getpriceOptionErrorMessage = () => priceElement.value ?
  `Минимальное значение для типа жилья "${OFFER_TYPE_VALUE[offerTypeElement.value]}" — ${OFFER_TYPE_OPTION[offerTypeElement.value]}`
  : 'Заполните поле Цена за ночь, руб.';


capacityFieldElement.addEventListener('change', () => {
  pristine.validate([capacityFieldElement, roomFieldElement]);
});

roomFieldElement.addEventListener('change', () => {
  pristine.validate([capacityFieldElement, roomFieldElement]);
});


pristine.addValidator(roomFieldElement, validateRoom, getroomOptionErrorMessage);
pristine.addValidator(capacityFieldElement, validateRoom, getroomOptionErrorMessage);

pristine.addValidator(priceElement, validatePrice, getpriceOptionErrorMessage);
pristine.addValidator(offerTypeElement, validateIsNullPrice, getpriceOptionErrorMessage);


formElement.addEventListener('submit', (evt) => {
  evt.preventDefault();
  pristine.validate();
});

