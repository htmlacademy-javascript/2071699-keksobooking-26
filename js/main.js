function getRandomIntInclusive (min, max) {
  // Результат: целое число из диапазона "min...max"
  // источник MDN Web Docs
  if (max<= min || min< 0) {
    return;
  }
  min = Math.ceil(min);
  max = Math.floor(max);
  return  Math.floor(Math.random() * (max - min + 1)) + min; //Максимум и минимум включаются
}


function getRandomInclusive (min, max, powNum) {// Результат: число с плавающей точкой из
  // диапазона "min...max" с указанным "количеством знаков после запятой"
  if (max<= min || min< 0) {
    return;
  }
  //Максимум и минимум включаются
  const randomRez = Math.random() * (max - min ) + min;
  //Используем Math.pow для определения кол-ва знаков после запятой
  return Math.round(randomRez* Math.pow(10, powNum)) / Math.pow(10, powNum);

}

//Вовзращает строку - одно из N фиксированных значений, где N- длинна заданного массива
const getRandomArrayElement = (elements) => elements[getRandomIntInclusive(0, elements.length - 1)];


const FEATURES_ARRAY=['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
const PHOTOS_ARRAY=['https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/duonguyen-8LrGtIxxa4w.jpg',
  'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/brandon-hoogenboom-SNxQGWxZQi0.jpg',
  'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/claire-rendall-b6kAwr1i0Iw.jpg'];
const TYPES_ARRAY=['palace', 'flat', 'house', 'bungalow','hotel'];
const CHECKIN_ARRAY=['12:00', '13:00','14:00'];
const CHECKOUT_ARRAY=['12:00', '13:00','14:00'];

//Возвращает массив строк - массив случайной длины из значений (значения передаются в массиве - параметр checkArr)
const getRendomLengthArray= (checkArr) => {
  const minVal = getRandomIntInclusive(0, Math.ceil(checkArr.length / 2));
  const maxVal = getRandomIntInclusive(minVal + 1, checkArr.length);

  return   Array.from(new Set(checkArr.slice(minVal,maxVal))); //новый массив без повторов
};

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
const ADVERTS_ARRAY = Array.from({length: ADVERTS_COUNT}, (v,i)=>getObjForAdvert(i+1));

// eslint-disable-next-line no-console
console.log(ADVERTS_ARRAY);
