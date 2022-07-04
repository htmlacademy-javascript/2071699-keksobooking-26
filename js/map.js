import { createAdverts } from './data.js';
import { createCustomPopup } from './card.js';
import {
  setFormActive, formElement,
  CLASS_NAME_DISABLED_FORM, fieldsetElement,
  mapFormElement, CLASS_NAME_DISABLED_MAP,
  mapFiltersElement
} from './form-status.js';

const addressElement = document.querySelector('[name="address"]');
const LOCATION_TOKYO = {
  lat: 35.6895,
  lng: 139.692
};
addressElement.value = Object.values(LOCATION_TOKYO).join(', ');

//const arrr = https://26.javascript.pages.academy/keksobooking/data

const map = L.map('map-canvas').on('load', () => {
  //переход страницы в активное состояние после инициализации карты
  setFormActive(formElement, CLASS_NAME_DISABLED_FORM, fieldsetElement);
  setFormActive(mapFormElement, CLASS_NAME_DISABLED_MAP, mapFiltersElement);
})
  .setView(LOCATION_TOKYO, 12);

L.tileLayer(
  'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
  {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
  },
).addTo(map);

const mainPinIcon = L.icon({
  iconUrl: './img/main-pin.svg',
  iconSize: [52, 52],
  iconAnchor: [26, 52],
});

const mainPinMarker = L.marker(
  LOCATION_TOKYO,
  {
    draggable: true,
    icon: mainPinIcon
  },

);

mainPinMarker.addTo(map);


mainPinMarker.on('moveend', (evt) => {
  addressElement.value = Object.entries(evt.target.getLatLng())
    .map((objItem) => objItem[1].toFixed(5))
    .join(', ');

});

const customPinIcon = L.icon({
  iconUrl: './img/pin.svg',
  iconSize: [40, 40],
  iconAnchor: [20, 40],
});


const createMarker = ({ location, offer, author }) => {
  const marker = L.marker({
    lat: location.lat,
    lng: location.lng
  },
  {
    icon: customPinIcon
  }
  );
  marker.addTo(map)
    .bindPopup(createCustomPopup({ offer, author }));
};

const points = createAdverts();
points.forEach(({ location, offer, author }) => {
  createMarker({ location, offer, author });
});
