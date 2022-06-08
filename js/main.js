const minValue = 0.1;
const maxValue = 5.25;
const powValue = 3;

function getRandomIntInclusive (min, max) {
// Результат: целое число из диапазона "min...max"
  // источник MDN Web Docs
  if (max<= min || min< 0) {
    return 0; //ф-я возвращает 0
  }
  min = Math.ceil(min);
  max = Math.floor(max);
  // console.log(max - min + 1);
  return  Math.floor(Math.random() * (max - min + 1)) + min; //Максимум и минимум включаются
}

getRandomIntInclusive(minValue,maxValue);


function getRandomInclusive (min, max, powNum) {// Результат: число с плавающей точкой из
  // диапазона "min...max" с указанным "количеством знаков после запятой"
  if (max<= min || min< 0) {
    return 0; //ф-я возвращает 0
  }

  //Максимум и минимум включаются
  const randomRez = Math.random() * (max - min ) + min;
  //Используем Math.pow для определения кол-ва знаков после запятой
  return Math.round(randomRez* Math.pow(10, powNum)) / Math.pow(10, powNum);

}

getRandomInclusive(minValue,maxValue,powValue);
