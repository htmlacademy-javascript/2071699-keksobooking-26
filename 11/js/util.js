function getRandomIntInclusive(min, max) {
  // Результат: целое число из диапазона "min...max"
  // источник MDN Web Docs
  if (max <= min || min < 0) {
    return;
  }
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min; //Максимум и минимум включаются
}

function getRandomInclusive(min, max, powNum) {
  // Результат: число с плавающей точкой из
  // диапазона "min...max" с указанным "количеством знаков после запятой"
  if (max <= min || min < 0) {
    return;
  }
  //Максимум и минимум включаются
  const randomRez = Math.random() * (max - min) + min;
  //Используем Math.pow для определения кол-ва знаков после запятой
  return Math.round(randomRez * Math.pow(10, powNum)) / Math.pow(10, powNum);
}

//Вовзращает строку - одно из N фиксированных значений, где N- длинна заданного массива
const getRandomArrayElement = (elements) => elements[getRandomIntInclusive(0, elements.length - 1)];

//Возвращает массив строк - массив случайной длины из значений (значения передаются в массиве - параметр checkArr)
const getRendomLengthArray = (checkArr) => {
  const minVal = getRandomIntInclusive(0, Math.ceil(checkArr.length / 2));
  const maxVal = getRandomIntInclusive(minVal + 1, checkArr.length);

  return Array.from(new Set(checkArr.slice(minVal, maxVal))); //новый массив без повторов
};

const showErrorLoadData = (message) => {
  const alertContainer = document.createElement('div');
  const divContainer = document.querySelector('.promo');

  alertContainer.textContent = message;
  alertContainer.classList.add('alert-container');
  divContainer.after(alertContainer);
};

export {
  getRandomIntInclusive,
  getRandomInclusive,
  getRandomArrayElement,
  getRendomLengthArray,
  showErrorLoadData,
};
