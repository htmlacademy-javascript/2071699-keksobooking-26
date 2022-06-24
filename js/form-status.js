//Определяем элемент формы ad-form и все интерактивные элементы формы
const formElement = document.querySelector('.ad-form');
const fieldsetElement = formElement.querySelectorAll('input, select, div.ad-form__slider');
//Определяем элемент формы map__filters и все интерактивные элементы формы
const mapFormElement = document.querySelector('.map__filters');
const mapFiltersElement = mapFormElement.querySelectorAll('input, select');

//Форма заполнения информации об объявлении .ad-form содержит класс ad-form--disabled;
formElement.classList.add('ad-form--disabled');
//Все интерактивные элементы формы .ad-form блокируем с помощью атрибута disabled
fieldsetElement.forEach((el) => {
  el.setAttribute('disabled', '');
});

//Форма с фильтрами .map__filters содержит класс map__filters--disabled (аналогично ad-form)
mapFormElement.classList.add('map__filters--disabled');
//Все интерактивные элементы формы .map__filters блокируем с помощью атрибута disabled
mapFiltersElement.forEach((el) => {
  el.setAttribute('disabled', '');
});

//Функция, которая переводит форму и все интерактивные эелементы в активное состояние
const doFormActive = (containerElement, itemsContainer) => {
  //получаем список классов формы
  const itemsClassList = containerElement.classList;
  itemsClassList.forEach((itemClass) => {
    //если класс содержит '--disabled', то удаляем его
    if (itemClass.indexOf('--disabled') > -1) { containerElement.classList.remove(itemClass); }
    //у всех интерактивных элементов удаляем атрибут disabled
    itemsContainer.forEach((item) => {
      item.removeAttribute('disabled');
    });
  }
  );
};

doFormActive(formElement, fieldsetElement);
doFormActive(mapFormElement, mapFiltersElement);
