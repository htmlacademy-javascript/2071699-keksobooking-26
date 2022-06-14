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


const featuresArr=['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
const photosArr=['https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/duonguyen-8LrGtIxxa4w.jpg',
  'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/brandon-hoogenboom-SNxQGWxZQi0.jpg',
  'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/claire-rendall-b6kAwr1i0Iw.jpg'];
const typeArr=['palace', 'flat', 'house', 'bungalow','hotel'];
const checkinArr=['12:00', '13:00','14:00'];
const checkoutArr=['12:00', '13:00','14:00'];

//Возвращает массив строк - массив случайной длины из значений (значения передаются в массиве - параметр checkArr)
const arrayStr= (checkArr) => {
  const minVal = getRandomIntInclusive(0, Math.ceil(checkArr.length / 2));
  const maxVal = getRandomIntInclusive(minVal + 1, checkArr.length);

  return   Array.from(new Set(checkArr.slice(minVal,maxVal)));
};

//функция, которая возвращает 1 экземпляр объекта, в дальнейшем будет "размножаться" в массиве
const  getObjData = (a)=> (

  {
    offer:{
      title: 'Информация об объявлении',
      address: '',//Object.keys(this.location).join(', '), //ПЕРЕОПРЕДЕЛЯЕМ после генерации (ВОПРОС: есть ли вариант заполнять сразу?)
      price: getRandomIntInclusive(1000,10000), //диапазон задан самостоятельно
      type: getRandomArrayElement(typeArr),
      rooms:getRandomIntInclusive(1,5), //диапазон задан самостоятельно
      guests:getRandomIntInclusive(1,10), //диапазон задан самостоятельно
      checkin:getRandomArrayElement(checkinArr),
      checkout: getRandomArrayElement(checkoutArr),
      features: `${arrayStr(featuresArr)}`,//должен быть массив случайной длины из значений НЕ ПОЛУЧАЕТСЯ вернуть массив, только строка
      description:'Помещение отличное',
      photos: `${arrayStr(photosArr)}`//должен быть массив случайной длины из значений НЕ ПОЛУЧАЕТСЯ вернуть массив, только строка
    },
    author:{avatar: `img/avatars/user${a<10 ?`0${a}`:a}.png`}, //значение a будет задаваться при генерации

    location: {
      lat:getRandomInclusive(35.65000 , 35.70000,5),
      lng:getRandomInclusive(139.70000, 139.80000,5)
    }
  });

//генерируем массив. getObjData передаем индекс+1 для определения avatar
const author = Array.from({length: 2}, (v,i)=>getObjData(i+1));

//переопределяем значение address, оно должно быть равно данным из объекта location
for (let i=0; i<author.length;i++) {
  author[i].offer.address = Object.values(author[i].location).join(', ');
}// eslint-disable-next-line no-console
console.log(author);


