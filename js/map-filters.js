const mapFiltersContainer = document.querySelector('.map__filters-container');
const typeFilterElement = mapFiltersContainer.querySelector('[name="housing-type"]');
const priceFilterElement = mapFiltersContainer.querySelector('[name="housing-price"]');
const priceOption = {
  middle: 0,
  low: 10000,
  high: 50000,
};
const roomsFilterElement = mapFiltersContainer.querySelector('[name="housing-rooms"]');
const guestsFilterElement = mapFiltersContainer.querySelector('[name="housing-guests"]');
const featuresFilterArrays = [];
const featuresCheckboxes = mapFiltersContainer.querySelectorAll('input[type=checkbox]');

//1 проверка Тип жилья
const checkTypeFilter = (offer) => {
  return offer.type === typeFilterElement.value || typeFilterElement.value === 'any';
};
//2 проверка Цена
const checkPriceFilter = (offer) => {
  const priceAdvert = offer.price;
  const priceLow = priceOption['low'];
  const priceHight = priceOption['high'];
  switch (priceFilterElement.value) {
    case 'low':
      return priceAdvert < priceLow;
    case 'high':
      return priceAdvert > priceHight;
    case 'middle':
      //проверяем, что цена между значениями low и high
      return priceAdvert <= priceHight && priceAdvert >= priceLow;
    case 'any':
      return true;
  }
};
//3 проверка кол-во комнат
const checkPRoomsFilter = (offer) => {
  return offer.rooms === Number(roomsFilterElement.value) || roomsFilterElement.value === 'any';
};
//4 проверка Кол-во гостей
const checkGuestsFilter = (offer) => {
  return offer.guests === Number(guestsFilterElement.value) || guestsFilterElement.value === 'any';
};
//5 проверка Удобства
const checkFeaturesFilter = (offer) => {
  //Если есть выбранные checkbox, то проверяем, что в обявленияхесть такие же
  if (featuresFilterArrays.length > 0 && offer.features) {
    let i = 0;
    featuresFilterArrays.forEach((el) => {
      if (offer.features.includes(el)) {
        i += 1; //если элемент в массиве есть, то увеличиваем счетчик i
      }
    });
    /*увеличиваем счетчик sameAdvert в том случае если колв-во совпадений (счетчик i)
    такое же как и кол-во выбранных удобств*/
    return i === featuresFilterArrays.length;
  }
  //если удобства не выбраны, то ничего не проверяем, считаем, что все объявления удовлетворяют данному условию
  if (featuresFilterArrays.length === 0) {
    return true;
  }
};

//функция для отбора объявлений, удовлетворяющих условиям фильтра
const getAdvertFilter = (advert) => {
  return (
    checkTypeFilter(advert.offer) &&
    checkPriceFilter(advert.offer) &&
    checkPRoomsFilter(advert.offer) &&
    checkGuestsFilter(advert.offer) &&
    checkFeaturesFilter(advert.offer)
  );
};

export {
  typeFilterElement,
  priceFilterElement,
  roomsFilterElement,
  guestsFilterElement,
  featuresCheckboxes,
  featuresFilterArrays,
  getAdvertFilter,
};
