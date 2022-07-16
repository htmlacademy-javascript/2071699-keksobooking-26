const offerValue = {
  flat: 'Квартира',
  bungalow: 'Бунгало',
  house: 'Дом',
  palace: 'Дворец',
  hotel: 'Отель',
};

const createCustomPopup = ({ offer, author }) => {
  const cardTemplateElement = document.querySelector('#card').content.querySelector('.popup');
  const advertElement = cardTemplateElement.cloneNode(true);
  const advertContainerImgElement = advertElement.querySelector('.popup__photos');
  const advertImgElement = advertContainerImgElement.querySelector('.popup__photo');

  advertElement.querySelector('.popup__title').textContent = offer.title;
  advertElement.querySelector('.popup__text--address').textContent = offer.address;

  advertElement.querySelector('.popup__text--price').textContent = offer.price
    ? `${offer.price} ₽/ночь`
    : '';

  advertElement.querySelector('.popup__type').textContent = offerValue[offer.type];

  advertElement.querySelector('.popup__text--capacity').textContent =
    offer.rooms && offer.guests ? `${offer.rooms} комнаты для ${offer.guests}  гостей` : '';

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
  if (offer.photos) {
    offer.photos.forEach((el) => {
      const advertImgCloneElement = advertImgElement.cloneNode();
      advertImgCloneElement.src = el;
      advertContainerImgElement.appendChild(advertImgCloneElement);
    });
  }

  advertImgElement.classList.add('hidden');

  advertElement.querySelector('.popup__avatar').src = author.avatar;

  const itemsAdvert = Array.from(advertElement.children);

  itemsAdvert.forEach((el) => {
    const hasItemsText = el.textContent === '';
    const hasItemsImg = el.getAttribute('src') === '';
    //Если у элемента не указан ни текст ни изображение. то такой элемент скрываем
    if (hasItemsText && hasItemsImg) {
      el.classList.add('hidden');
    }
  });
  return advertElement;
};

const onErrorButtonClick = (formContainer) => {
  const errorButton = formContainer.querySelector('.error__button');
  errorButton.addEventListener(
    'click',
    () => {
      formContainer.remove();
    },
    { once: true },
  );
};

const onPopupEscKeydown = (formContainer) => {
  window.addEventListener(
    'keydown',
    (evt) => {
      const key = evt.key;
      if (key === 'Escape') {
        formContainer.remove();
      }
    },
    { once: true },
  );
};

const onPopupMouseClick = (formContainer) => {
  document.addEventListener(
    'click',
    () => {
      formContainer.remove();
    },
    { once: true },
  );
};

const createErrMessage = () => {
  const errorTemplateElement = document.querySelector('#error').content.querySelector('.error');
  const errorElement = errorTemplateElement.cloneNode(true);
  document.body.append(errorElement);

  onErrorButtonClick(errorElement);
  onPopupEscKeydown(errorElement);
  onPopupMouseClick(errorElement);
};

const createSuccessMessage = () => {
  const successTemplateElement = document
    .querySelector('#success')
    .content.querySelector('.success');

  const successElement = successTemplateElement.cloneNode(true);
  document.body.append(successElement);

  onPopupEscKeydown(successElement);
  onPopupMouseClick(successElement);
};

export { offerValue, createCustomPopup, createErrMessage, createSuccessMessage };
