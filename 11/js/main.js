import { createMarker } from './map.js';
import { setUserFormSubmit } from './form-validate.js';
import { createAdverts } from './data.js';
import { getData } from './fetch-data.js'
import { getErrorLoadData } from './util.js';

// eslint-disable-next-line no-console
console.log(
  createAdverts()
);
const ADVERTS_COUNT = 10;

getData(
  (adverts) => createMarker(adverts.slice(0, ADVERTS_COUNT)),
  () => getErrorLoadData('При загрузке данных с сервера произошла ошибка!')
);

setUserFormSubmit();

