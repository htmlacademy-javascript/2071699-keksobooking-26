const CLASS_NAME_DISABLED_MAP = 'map__filters--disabled';
const CLASS_NAME_DISABLED_FORM = 'ad-form--disabled';

const formElement = document.querySelector('.ad-form');
const fieldsetElement = formElement.querySelectorAll('input, select, div.ad-form__slider');

const mapFormElement = document.querySelector('.map__filters');
const mapFiltersElement = mapFormElement.querySelectorAll('input, select');

const setFormDisabled = (containerElement, classNameDisabled, itemsContainer) => {
  containerElement.classList.add(classNameDisabled);
  itemsContainer.forEach((el) => {
    el.setAttribute('disabled', '');
  });
};

const setFormActive = (containerElement, classNameDisabled, itemsContainer) => {
  containerElement.classList.remove(classNameDisabled);

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
