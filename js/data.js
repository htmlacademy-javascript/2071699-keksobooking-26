import {getRandomIntInclusive,
  getRandomInclusive,
  getRandomArrayElement,
  getRendomLengthArray} from './util.js';


const FEATURES_ARRAY=['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
const PHOTOS_ARRAY=['https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/duonguyen-8LrGtIxxa4w.jpg',
  'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/brandon-hoogenboom-SNxQGWxZQi0.jpg',
  'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/claire-rendall-b6kAwr1i0Iw.jpg'];
const TYPES_ARRAY=['palace', 'flat', 'house', 'bungalow','hotel'];
const CHECKIN_ARRAY=['12:00', '13:00','14:00'];
const CHECKOUT_ARRAY=['12:00', '13:00','14:00'];


//функция, которая возвращает один объект для описания объявления (advertisement)
const  getObjForAdvert = (a)=> {
  const  location= {
    lat:getRandomInclusive(35.65000 , 35.70000,5),
    lng:getRandomInclusive(139.70000, 139.80000,5)
  };
  return {
    offer:{
      title: 'Информация об объявлении',
      address: `${location.lat}, ${location.lng}`,
      price: getRandomIntInclusive(1000,10000), //диапазон задан самостоятельно
      type: getRandomArrayElement(TYPES_ARRAY),
      rooms:getRandomIntInclusive(1,5), //диапазон задан самостоятельно
      guests:getRandomIntInclusive(1,10), //диапазон задан самостоятельно
      checkin:getRandomArrayElement(CHECKIN_ARRAY),
      checkout: getRandomArrayElement(CHECKOUT_ARRAY),
      features: getRendomLengthArray(FEATURES_ARRAY),
      description:'Помещение отличное',
      photos: getRendomLengthArray(PHOTOS_ARRAY)
    },
    author:{avatar: `img/avatars/user${a<10 ?`0${a}`:a}.png`}, //значение a будет задаваться при генерации
    location
  };};

const  ADVERTS_COUNT=10;
//генерируем массив. getObjForGenerationArr передаем индекс+1 для определения avatar
const createAdverts = () => Array.from({length: ADVERTS_COUNT}, (v,i)=>getObjForAdvert(i+1));

export{createAdverts};
