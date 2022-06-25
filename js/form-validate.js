import {formElement} from './form-status.js';

const pristine = new Pristine(formElement,{
  classTo: 'ad-form__element',
  errorTextParent: 'ad-form__element',
  errorTextTag: 'span'
}, false);

//для Количество комнат и количество мест отдельная проверка
const roomFieldElement = formElement.querySelector('[name="rooms"]');
const capacityFieldElement = formElement.querySelector('[name="capacity"]');
//при выборе количества комнат вводятся ограничения на допустимые варианты выбора количества гостей
const ROOM_OPTION = {
  '1 комната': ['для 1 гостя'],
  '2 комнаты': ['для 2 гостей', 'для 1 гостя'],
  '3 комнаты': ['для 3 гостей', 'для 2 гостей', 'для 1 гостя'],
  '100 комнат': ['не для гостей']
};
//функция, которая проверяет, что кол-во гостей, соответсвует заданному количеству комнат
const  validateRoom = () => ROOM_OPTION[roomFieldElement.value].includes(capacityFieldElement.value);
//функция, которая генерирует текст ошибки
const getroomOptionErrorMessage = () => `Если выбрано ${roomFieldElement.value}, то в поле "Количество мест" можно указать: ${ROOM_OPTION[roomFieldElement.value].join(' или ')}`;
//вызываем addValidator на одном списке, т.к. проверка происходит после нажатия кнопки, то достаточно одной проверки
pristine.addValidator(roomFieldElement, validateRoom,getroomOptionErrorMessage) ;

formElement.addEventListener('submit', (evt) => {
  evt.preventDefault();
  pristine.validate();
});

