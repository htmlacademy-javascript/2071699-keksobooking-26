const offerTypeValue = {
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
  advertElement.querySelector('.popup__text--price').textContent = offer.price
    ? `${offer.price} ₽/ночь`
    : '';

  //В type  выводим значение по ключу из offerTypeValue (в файле data.js)
  advertElement.querySelector('.popup__type').textContent = offerTypeValue[offer.type];

  //если задано кол-во комнат И гостей, то выводим строку иначе пусто (в дальнейшем скроем)
  advertElement.querySelector('.popup__text--capacity').textContent =
    offer.rooms && offer.guests ? `${offer.rooms} комнаты для ${offer.guests}  гостей` : '';

  //если заданы дата заезда И выезда, то выводим строку иначе пусто (в дальнейшем скроем)
  advertElement.querySelector('.popup__text--time').textContent =
    offer.checkin && offer.checkout
      ? `Заезд после ${offer.checkin}, выезд до ${offer.checkout}`
      : '';

  advertElement.querySelector('.popup__features').textContent = offer.features
    ? offer.features.join(', ')
    : '';
  advertElement.querySelector('.popup__description').textContent = offer.description
    ? offer.description
    : '';

  //т.к. кол-во фоторгафий жилья заранее не известно, то добавляем цикл для клонирования <img>
  const advertContainerImgElement = advertElement.querySelector('.popup__photos');
  const advertImgElement = advertContainerImgElement.querySelector('.popup__photo');
  //  клонируем <img> (если фотографии переданы)
  if (offer.photos) {
    offer.photos.forEach((el) => {
      const advertImgCloneElement = advertImgElement.cloneNode();
      advertImgCloneElement.src = el;
      advertContainerImgElement.appendChild(advertImgCloneElement);
    });
  }
  //пустой <img> из шаблона скроем
  advertImgElement.classList.add('hidden');

  advertElement.querySelector('.popup__avatar').src = author.avatar;

  //Обрабатываем ситуацию, когда данных для заполнения не хватает.
  //Например, отсутствует описание. В этом случае соответствующий блок в карточке скрывается.
  //Формируем массив элементов внутри advertElement и перебираем их
  //Если фото жилья нет, то клоны выше не создадуться и соответсвенной фоторгафий не будет, поэтому эту ситуацию здесь обрабатывать уже не нужно
  const itemsAdvert = advertElement.children;
  for (let i = 0; i < itemsAdvert.length; i++) {
    const hasItemsText = itemsAdvert[i].textContent === '';
    const hasItemsImg = itemsAdvert[i].getAttribute('src') === '';
    //Если у элемента не указан ни текст ни изображение. то такой элемент скрываем
    if (hasItemsText && hasItemsImg) {
      itemsAdvert[i].classList.add('hidden');
    }
  }
  return advertElement;
};
//закрытие окна по нажатию на кнопку
const closeButtonElement = (formContainer) => {
  const buttonError = formContainer.querySelector('.error__button');
  buttonError.addEventListener('click', () => {
    formContainer.remove();
  });
};
//закрытие окна по нажатию на Esc
const onPopupEscKeydown = (formContainer) => {
  document.addEventListener('keydown', function (evt) {
    const key = evt.key;
    if (key === 'Escape') {
      formContainer.remove();
    }
  });
};
//закрытие окна по клику мыши
const onPopupMouseClick = (formContainer) => {
  document.addEventListener('click', function () {
    formContainer.remove();
  });
};

//функция для создания сообщения об ошиибке при отправке данных
const createErrMessage = () => {
  const errorTemplateElement = document.querySelector('#error').content.querySelector('.error');
  const errorElement = errorTemplateElement.cloneNode(true);
  document.body.append(errorElement);
  //функции для закрытия окна
  closeButtonElement(errorElement);
  onPopupEscKeydown(errorElement);
  onPopupMouseClick(errorElement);
};

//функция для создания сообщения об успешной отправке данных
const createSuccessMessage = () => {
  const successTemplateElement = document
    .querySelector('#success')
    .content.querySelector('.success');
  const successElement = successTemplateElement.cloneNode(true);
  document.body.append(successElement);
  //функции для закрытия окна
  onPopupEscKeydown(successElement);
  onPopupMouseClick(successElement);
};

export { offerTypeValue, createCustomPopup, createErrMessage, createSuccessMessage };
