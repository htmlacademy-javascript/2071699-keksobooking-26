import {
  getRandomIntInclusive,
  getRandomInclusive,
  getRandomArrayElement,
  getRendomLengthArray,
} from './util.js';

const FEATURES_ARRAY = [
  'wifi',
  'dishwasher',
  'parking',
  'washer',
  'elevator',
  'conditioner',
];
const PHOTOS_ARRAY = [
  'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/duonguyen-8LrGtIxxa4w.jpg',
  'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/brandon-hoogenboom-SNxQGWxZQi0.jpg',
  'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/claire-rendall-b6kAwr1i0Iw.jpg',
];
const TYPES_ARRAY = ['palace', 'flat', 'house', 'bungalow', 'hotel'];
const CHECKIN_ARRAY = ['12:00', '13:00', '14:00'];
const CHECKOUT_ARRAY = ['12:00', '13:00', '14:00'];

const OFFER_TYPE_VALUE = {
  flat: 'Квартира',
  bungalow: 'Бунгало',
  house: 'Дом',
  palace: 'Дворец',
  hotel: 'Отель',
};
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
//функция, которая возвращает один объект для описания объявления (advertisement)
const getObjForAdvert = (a) => {
  const location = {
    lat: getRandomInclusive(35.65, 35.7, 5),
    lng: getRandomInclusive(139.7, 139.8, 5),
  };
  return {
    offer: {
      title: 'Информация об объявлении',
      address: `${location.lat}, ${location.lng}`,
      price: getRandomIntInclusive(1000, 10000), //диапазон задан самостоятельно
      type: getRandomArrayElement(TYPES_ARRAY),
      rooms: getRandomIntInclusive(1, 5), //диапазон задан самостоятельно
      guests: getRandomIntInclusive(1, 10), //диапазон задан самостоятельно
      checkin: getRandomArrayElement(CHECKIN_ARRAY),
      checkout: getRandomArrayElement(CHECKOUT_ARRAY),
      features: getRendomLengthArray(FEATURES_ARRAY),
      description: 'Помещение отличное',
      photos: getRendomLengthArray(PHOTOS_ARRAY),
    },
    author: { avatar: `img/avatars/user${a < 10 ? `0${a}` : a}.png` }, //значение a будет задаваться при генерации
    location,
  };
};

const ADVERTS_COUNT = 10;
//генерируем массив. getObjForGenerationArr передаем индекс+1 для определения avatar
const createAdverts = () =>
  Array.from({ length: ADVERTS_COUNT }, (v, i) => getObjForAdvert(i + 1));

export { createAdverts, OFFER_TYPE_VALUE,ROOM_OPTION,OFFER_TYPE_OPTION };
