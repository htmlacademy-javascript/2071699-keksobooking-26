import { createMarker } from './map.js';
import { setUserFormSubmit } from './form-validate.js';
import { setAdverts } from './data.js';
import { getData } from './fetch-data.js';
import { showErrorLoadData } from './util.js';
import {
  setFormDisabled,
  mapFormElement,
  CLASS_NAME_DISABLED_MAP,
  mapFiltersElement,
} from './form-status.js';

const onSuccessLoadData = (adverts) => {
  setAdverts(adverts);
  createMarker();
};
const onErrorLoadData = () => {
  showErrorLoadData('При загрузке данных с сервера произошла ошибка!');
  setFormDisabled(mapFormElement, CLASS_NAME_DISABLED_MAP, mapFiltersElement);
};

getData(onSuccessLoadData, onErrorLoadData);

setUserFormSubmit();
