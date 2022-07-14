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
/*
  Замечания по ТЗ.
  1. На время выполнения запроса к серверу кнопка «Опубликовать» блокируется.
     сейчас написано "данные отправляются", но дизейбла нет, лучше добавить еще стиль дизейбл
  2. все заполненные поля возвращаются в изначальное состояние
     слайдер не сбрасывается
  3. Общая рекоммендация, удалить все комменты, особенно "функция делает ..."
  4. Общая рекомендация, старайся колбэки в обработчиках событий выносить в отдельные функции,
     для лучшей читаемости, потому что когда выносишь в отдельную функцию, ты ее как-то именуешь
     и при чтении кода уже сразу видно, что произойдет по этом обработчику
*/
