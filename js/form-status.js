const CLASS_NAME_DISABLED_MAP = 'map__filters--disabled';
const CLASS_NAME_DISABLED_FORM = 'ad-form--disabled';

//Определяем элемент формы ad-form и все интерактивные элементы формы
const formElement = document.querySelector('.ad-form');
const fieldsetElement = formElement.querySelectorAll('input, select, div.ad-form__slider');
//Определяем элемент формы map__filters и все интерактивные элементы формы
const mapFormElement = document.querySelector('.map__filters');
const mapFiltersElement = mapFormElement.querySelectorAll('input, select');

const setFormDisabled = (containerElement, classNameDisabled, itemsContainer) => {
  containerElement.classList.add(classNameDisabled);
  itemsContainer.forEach((el) => {
    el.setAttribute('disabled', '');
  });
};

//Функция, которая переводит форму и все интерактивные эелементы в активное состояние
const setFormActive = (containerElement, classNameDisabled, itemsContainer) => {
  containerElement.classList.remove(classNameDisabled);
  //у всех интерактивных элементов удаляем атрибут disabled
  itemsContainer.forEach((item) => {
    item.removeAttribute('disabled');
  });
};

setFormDisabled(formElement, CLASS_NAME_DISABLED_FORM, fieldsetElement);
setFormDisabled(mapFormElement, CLASS_NAME_DISABLED_MAP, mapFiltersElement);

export {
  setFormActive,
  formElement,
  CLASS_NAME_DISABLED_FORM,
  fieldsetElement,
  setFormDisabled,
  mapFormElement,
  CLASS_NAME_DISABLED_MAP,
  mapFiltersElement,
};
