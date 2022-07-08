import { createCustomPopup } from './card.js';
import {
  setFormActive, formElement,
  CLASS_NAME_DISABLED_FORM, fieldsetElement,
  mapFormElement, CLASS_NAME_DISABLED_MAP,
  mapFiltersElement
} from './form-status.js';

const addressElement = document.querySelector('[name="address"]');
const LocationTokyo = {
  lat: 35.6895,
  lng: 139.692
};
addressElement.value = `${LocationTokyo.lat}, ${LocationTokyo.lng}`;

const map = L.map('map-canvas').on('load', () => {
  //переход страницы в активное состояние после инициализации карты
  setFormActive(formElement, CLASS_NAME_DISABLED_FORM, fieldsetElement);
  setFormActive(mapFormElement, CLASS_NAME_DISABLED_MAP, mapFiltersElement);
})
  .setView(LocationTokyo, 12);

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
  LocationTokyo,
  {
    draggable: true,
    icon: mainPinIcon
  },

);

mainPinMarker.addTo(map);


mainPinMarker.on('moveend', (evt) => {
  const mainMarkerLat = evt.target.getLatLng().lat.toFixed(5);
  const mainMarkerLng = evt.target.getLatLng().lng.toFixed(5);
  addressElement.value = `${mainMarkerLat},${mainMarkerLng}`;

});

const customPinIcon = L.icon({
  iconUrl: './img/pin.svg',
  iconSize: [40, 40],
  iconAnchor: [20, 40],
});


const createMarker = (similarAdverts) => {
  similarAdverts.forEach(({ location, offer, author }) => {
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

  })
};

//функция для сброса данных меток на карте
const restMarkers = () => {
  mainPinMarker.setLatLng(
    LocationTokyo
  );
  map.closePopup();
  addressElement.value = `${LocationTokyo.lat}, ${LocationTokyo.lng}`;
}


export { createMarker, restMarkers }
