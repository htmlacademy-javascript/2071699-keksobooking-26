
const OFFER_TYPE_VALUE = {
  flat: 'Квартира',
  bungalow: 'Бунгало',
  house: 'Дом',
  palace: 'Дворец',
  hotel: 'Отель',
};

const createCustomPopup = ({ offer, author }) => {

  const cardTemplateElement = document.querySelector('#card').content.querySelector('.popup');
  const advertElement = cardTemplateElement.cloneNode(true);
  advertElement.querySelector('.popup__title').textContent = offer.title;
  advertElement.querySelector('.popup__text--address').textContent = offer.address;

  //если цена не задана, то текст = '' (в дальнейшем скроем)
  advertElement.querySelector('.popup__text--price').textContent = offer.price ? `${offer.price} ₽/ночь` : '';

  //В type  выводим значение по ключу из OFFER_TYPE_VALUE (в файле data.js)
  advertElement.querySelector('.popup__type').textContent = OFFER_TYPE_VALUE[offer.type];

  //если задано кол-во комнат И гостей, то выводим строку иначе пусто (в дальнейшем скроем)
  advertElement.querySelector('.popup__text--capacity').textContent =
    offer.rooms && offer.guests ? `${offer.rooms} комнаты для ${offer.guests}  гостей` : '';

  //если заданы дата заезда И выезда, то выводим строку иначе пусто (в дальнейшем скроем)
  advertElement.querySelector('.popup__text--time').textContent =
    offer.checkin && offer.checkout ? `Заезд после ${offer.checkin}, выезд до ${offer.checkout}` : '';

  advertElement.querySelector('.popup__features').textContent = offer.features.join(', ');
  advertElement.querySelector('.popup__description').textContent = offer.description;


  //т.к. кол-во фоторгафий жилья заранее не известно, то добавляем цикл для клонирования <img>
  const advertContainerImgElement = advertElement.querySelector('.popup__photos');
  const advertImgElement = advertContainerImgElement.querySelector('.popup__photo');
  //  клонируем <img>
  offer.photos.forEach((el) => {
    const advertImgCloneElement = advertImgElement.cloneNode();
    advertImgCloneElement.src = el;
    advertContainerImgElement.appendChild(advertImgCloneElement);
  });
  //пустой <img> из шаблона скроем
  advertImgElement.classList.add('hidden');


  advertElement.querySelector('.popup__avatar').src = author.avatar;

  //Обрабатываем ситуацию, когда данных для заполнения не хватает.
  //Например, отсутствует описание. В этом случае соответствующий блок в карточке скрывается.
  //Формируем массив элементов внутри advertElement и перебираем их
  //Если фото жилья нет, то клоны выше не создадуться и соответсвенной фоторгафий не будет, поэтому эту ситуацию здесь обрабатывать уже не нужно
  const itemsAdvert = advertElement.children;
  for (let i = 0; i < itemsAdvert.length; i++) {
    //Если у элемента не указан ни текст ни изображение. то такой элемент скрываем
    if (itemsAdvert[i].textContent === '' && itemsAdvert[i].getAttribute('src') === '') { itemsAdvert[i].classList.add('hidden'); }
  }
  return advertElement;
};

export { OFFER_TYPE_VALUE, createCustomPopup };
