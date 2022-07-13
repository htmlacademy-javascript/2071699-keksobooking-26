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

// Функция взята из интернета и доработана
// Источник - https://www.freecodecamp.org/news/javascript-debounce-example
function debounce(callback, timeoutDelay = 500) {
  // Используем замыкания, чтобы id таймаута у нас навсегда приклеился
  // к возвращаемой функции с setTimeout, тогда мы его сможем перезаписывать
  let timeoutId;

  return (...rest) => {
    // Перед каждым новым вызовом удаляем предыдущий таймаут,
    // чтобы они не накапливались
    clearTimeout(timeoutId);

    // Затем устанавливаем новый таймаут с вызовом колбэка на ту же задержку
    timeoutId = setTimeout(() => callback.apply(this, rest), timeoutDelay);

    // Таким образом цикл «поставить таймаут - удалить таймаут» будет выполняться,
    // пока действие совершается чаще, чем переданная задержка timeoutDelay
  };
}
// Функция взята из интернета и доработана
// Источник - https://github.com/you-dont-need/You-Dont-Need-Lodash-Underscore#_throttle

export {
  getRandomIntInclusive,
  getRandomInclusive,
  getRandomArrayElement,
  getRendomLengthArray,
  showErrorLoadData,
  debounce,
};
