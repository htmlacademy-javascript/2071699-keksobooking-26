const getRandomIntInclusive =  (a, b) => {
// Результат: целое число из диапазона "min...max"
  // источник MDN Web Docs

  const min = Math.ceil(Math.min(Math.abs(a), Math.abs(b)));
  const max = Math.floor(Math.max(Math.abs(a), Math.abs(b)));
  return  Math.floor(Math.random() * (max - min + 1)) + min; //Максимум и минимум включаются
};

function getRandomInclusive (a, b, digits = 1) {// Результат: число с плавающей точкой из
  // диапазона "min...max" с указанным "количеством знаков после запятой"

  const min = Math.min(Math.abs(a), Math.abs(b));
  const max = Math.max(Math.abs(a), Math.abs(b));

  //Максимум и минимум включаются
  const result = Math.random() * (max - min ) + min;
  //Используем Math.pow для определения кол-ва знаков после запятой
  return +result.toFixed(digits);
}

//Вовзращает строку - одно из N фиксированных значений, где N- длинна заданного массива
const getRandomArrayElement = (elements) => elements[getRandomIntInclusive(0, elements.length - 1)];

//массив строк для поля features из объекта offer
const featuresArr=['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
//массив строк для поля photos из объекта offer
const photosArr=['https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/duonguyen-8LrGtIxxa4w.jpg',
  'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/brandon-hoogenboom-SNxQGWxZQi0.jpg',
  'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/claire-rendall-b6kAwr1i0Iw.jpg'];

  //Возвращает массив строк - массив случайной длины из значений (значения передаются в массиве - параметр checkArr)
const arrayStr= (checkArr) => {
  const minVal = getRandomIntInclusive(0,checkArr.length-1); //Минимальное значение - случайное число из диапазона от 0 до длинна массива -1
  const maxVal = getRandomIntInclusive(1,checkArr.length); //Максимальное значение - случайное число из диапазона от 1 до длинна массива

  //переопределяем максимум и минимум, в случае если max<min
  let min = Math.min(minVal, maxVal);
  let max = Math.max(minVal, maxVal);

  //следующая проверка под вопросом, возможно и не нужна??
  //если вдруг оба значения диапазона оказались равны, то миним значение определяем как 0
  if (minVal === maxVal) {min= 0;} else
  if (maxVal===0) {min= 0; max=1;} //если максимальное значение равно 0 ,то берем первый элемент

  //возвращаем массив
  return   checkArr.slice(min,max);

};

//функция, которая возвращает 1 экземпляр объекта, в дальнейшем будет "размножаться" в массиве
const  getObjData = (a)=> (

  {
    offer:{
      title: 'Информация об объявлении',
      address: '',//Object.keys(this.location).join(', '), //ПЕРЕОПРЕДЕЛЯЕМ после генерации (ВОПРОС: есть ли вариант заполнять сразу?)
      price: getRandomIntInclusive(1000,10000), //диапазон задан самостоятельно
      type: getRandomArrayElement(['palace', 'flat', 'house', 'bungalow','hotel']),
      rooms:getRandomIntInclusive(1,5), //диапазон задан самостоятельно
      guests:getRandomIntInclusive(1,10), //диапазон задан самостоятельно
      checkin:getRandomArrayElement(['12:00', '13:00','14:00']),
      checkout: getRandomArrayElement(['12:00', '13:00','14:00']),
      features: `${arrayStr(featuresArr)}`,//должен быть массив случайной длины из значений НЕ ПОЛУЧАЕТСЯ вернуть массив, только строка
      description:'Помещение отличное',
      photos: `${arrayStr(photosArr)}`//должен быть массив случайной длины из значений НЕ ПОЛУЧАЕТСЯ вернуть массив, только строка
    },
    author:{avatar: `img/avatars/user${a<9?`0${a}`:a}.png`}, //значение a будет задаваться при генерации

    location: {
      lat:getRandomInclusive(35.65000 , 35.70000,5),
      lng:getRandomInclusive(139.70000, 139.80000,5)
    }
  });

//генерируем массив. getObjData передаем индекс+1 для определения avatar
const author = Array.from({length: 2}, (v,i)=>getObjData(i+1));

//переопределяем значение address, оно должно быть равно данным из объекта location
for (var i=0; i<author.length;i++) {
  author[i].offer.address = Object.values(author[i].location).join(', ');
}

console.log(author);



