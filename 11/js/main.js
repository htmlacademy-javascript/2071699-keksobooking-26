import { createMarker } from './map.js';
import { setUserFormSubmit } from './form-validate.js';
import { createAdverts } from './data.js';
import { getData } from './fetch-data.js';
import { showErrorLoadData } from './util.js';

// eslint-disable-next-line no-console
console.log(createAdverts());
const ADVERTS_COUNT = 10;

const onSuccessLoadData = (adverts) => createMarker(adverts.slice(0, ADVERTS_COUNT));
const onErrorLoadData = () => showErrorLoadData('При загрузке данных с сервера произошла ошибка!');

getData(onSuccessLoadData, onErrorLoadData);

setUserFormSubmit();
