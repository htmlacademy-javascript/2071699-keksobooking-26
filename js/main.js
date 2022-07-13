import { createMarker, setMarkerFilter } from './map.js';
import { setUserFormSubmit } from './form-validate.js';
import { createAdverts } from './data.js';
import { getData } from './fetch-data.js';
import { showErrorLoadData, debounce } from './util.js';

// eslint-disable-next-line no-console
console.log(createAdverts());
const ADVERTS_COUNT = 10;
const RERENDER_DELAY = 500;

const onSuccessLoadData = (adverts) => {
  createMarker(adverts.slice(0, ADVERTS_COUNT));
  setMarkerFilter(debounce(() => createMarker(adverts), RERENDER_DELAY));
};
const onErrorLoadData = () => showErrorLoadData('При загрузке данных с сервера произошла ошибка!');

getData(onSuccessLoadData, onErrorLoadData);

setUserFormSubmit();
