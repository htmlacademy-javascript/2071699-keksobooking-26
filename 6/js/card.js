import {createAdverts,OFFER_TYPE_VALUE} from './data.js';

//добавляем сгенерированные данные в map__canvas
const sectionMap = document.querySelector('.map');
const mapCanvasElement = sectionMap.querySelector('.map__canvas');
//определяем шаблон для отображения данных
const cardTemplate = document.querySelector('#card').content.querySelector('.popup');

//генерируем данные
const similarAdvert = createAdverts();
const similarListFragment = document.createDocumentFragment();

//для примера берем первое объявление
const similarAdvert1=[similarAdvert[0]];
//перебираем все свойства
similarAdvert1.forEach(({offer,author}) => {
  const advertElement = cardTemplate.cloneNode(true);
  advertElement.querySelector('.popup__title').textContent = offer.title;
  advertElement.querySelector('.popup__text--address').textContent = offer.address;

  //если цена не задана, то текст = '' (в дальнейшем скроем)
  advertElement.querySelector('.popup__text--price').textContent = offer.price==='' ? '':`${offer.price} ₽/ночь`;

  //В type  выводим значение по ключу из OFFER_TYPE_VALUE (в файле data.js)
  advertElement.querySelector('.popup__type').textContent = OFFER_TYPE_VALUE[offer.type];

  //если кол-во комнат ИЛИ гостей не задано, то текст = '' (в дальнейшем скроем)
  advertElement.querySelector('.popup__text--capacity').textContent =
  offer.rooms==='' || offer.guests==='' ? '' :  `${offer.rooms} комнаты для ${offer.guests}  гостей`;

  //если дата заезда ИЛИ выезда не задано, то текст = '' (в дальнейшем скроем)
  advertElement.querySelector('.popup__text--time').textContent =
  offer.checkin==='' || offer.checkout==='' ? '' : `Заезд после ${offer.checkin}, выезд до ${offer.checkout}`;

  advertElement.querySelector('.popup__features').textContent =offer.features.join(', ');
  advertElement.querySelector('.popup__description').textContent = offer.description;


  //т.к. кол-во фоторгафий жилья заранее не известно, то добавляем цикл для клонирования <img>
  const advertImg = advertElement.querySelector('.popup__photos');
  const advertElementImg = advertImg.querySelector('.popup__photo');
  //  клонируем <img>
  for (let i=0;i<offer.photos.length;i++) {
    const advertImgClone=advertElementImg.cloneNode();
    advertImgClone.src = offer.photos[i];
    advertImg.appendChild(advertImgClone);
  }
  //пустой <img> из шаблона скроем
  advertElementImg.classList.add('hidden');


  advertElement.querySelector('.popup__avatar').src =author.avatar;

  //Обрабатываем ситуацию, когда данных для заполнения не хватает.
  //Например, отсутствует описание. В этом случае соответствующий блок в карточке скрывается.
  //Формируем массив элементов внутри advertElement и перебираем их
  //Если фото жилья нет, то клоны выше не создадуться и соответсвенной фоторгафий не будет, поэтому эту ситуацию здесь обрабатывать уже не нужно
  const itemsAdvert=advertElement.children;
  for (let i = 0; i < itemsAdvert.length; i++) {
    //Если у элемента не указан ни текст ни изображение. то такой элемент скрываем
    if (itemsAdvert[i].textContent ==='' && itemsAdvert[i].getAttribute('src')==='') {itemsAdvert[i].classList.add('hidden');}
  }

  similarListFragment.appendChild(advertElement);

});

mapCanvasElement.appendChild(similarListFragment);


