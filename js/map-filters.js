const priceOption = {
  middle: 0,
  low: 10000,
  high: 50000,
};
const mapFiltersElement = document.querySelector('.map__filters');
const typeFilterElement = mapFiltersElement.querySelector('[name="housing-type"]');
const priceFilterElement = mapFiltersElement.querySelector('[name="housing-price"]');
const roomsFilterElement = mapFiltersElement.querySelector('[name="housing-rooms"]');
const guestsFilterElement = mapFiltersElement.querySelector('[name="housing-guests"]');
const featuresFilterArrays = [];
const featuresCheckboxes = mapFiltersElement.querySelectorAll('input[type=checkbox]');

const checkTypeFilter = (offer) =>
  offer.type === typeFilterElement.value || typeFilterElement.value === 'any';

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

const checkRoomsFilter = (offer) =>
  offer.rooms === Number(roomsFilterElement.value) || roomsFilterElement.value === 'any';

const checkGuestsFilter = (offer) =>
  offer.guests === Number(guestsFilterElement.value) || guestsFilterElement.value === 'any';

const checkFeaturesFilter = (offer) => {
  //Если есть выбранные checkbox, то проверяем, что в обявлениях есть такие же
  if (featuresFilterArrays.length > 0 && offer.features) {
    let featuresCount = 0;
    featuresFilterArrays.forEach((el) => {
      if (offer.features.includes(el)) {
        featuresCount += 1; //если элемент в массиве есть, то увеличиваем счетчик featuresCount
      }
    });
    /*увеличиваем счетчик sameAdvert в том случае если колв-во совпадений (счетчик featuresCount)
    такое же как и кол-во выбранных удобств*/
    return featuresCount === featuresFilterArrays.length;
  }
  //если удобства не выбраны, то ничего не проверяем, считаем, что все объявления удовлетворяют данному условию
  if (featuresFilterArrays.length === 0) {
    return true;
  }
};

//объявление должно удовлетворять всем фильтрам
const getAdvertFilter = (advert) =>
  checkTypeFilter(advert.offer) &&
  checkPriceFilter(advert.offer) &&
  checkRoomsFilter(advert.offer) &&
  checkGuestsFilter(advert.offer) &&
  checkFeaturesFilter(advert.offer);

export {
  mapFiltersElement,
  typeFilterElement,
  priceFilterElement,
  roomsFilterElement,
  guestsFilterElement,
  featuresCheckboxes,
  featuresFilterArrays,
  getAdvertFilter,
};
