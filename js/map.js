import { createCustomPopup } from './card.js';
import {
  setFormActive,
  formElement,
  CLASS_NAME_DISABLED_FORM,
  fieldsetElement,
  mapFormElement,
  CLASS_NAME_DISABLED_MAP,
  mapFiltersElement,
} from './form-status.js';
import {
  typeFilterElement,
  priceFilterElement,
  roomsFilterElement,
  guestsFilterElement,
  featuresCheckboxes,
  featuresFilterArrays,
  getAdvertFilter,
} from './map-filters.js';
import { debounce } from './util.js';
import { state } from './data.js';

const ADVERTS_COUNT = 10;
const RERENDER_DELAY = 500;
const MAP_ZOOM = 12;
const locationTokyo = {
  lat: 35.6895,
  lng: 139.692,
};
const addressElement = document.querySelector('[name="address"]');

const setAddressDefault = () =>
  (addressElement.value = `${locationTokyo.lat}, ${locationTokyo.lng}`);

const map = L.map('map-canvas')
  .on('load', () => {
    //переход страницы в активное состояние после инициализации карты и установка адреса по умолчанию
    setFormActive(formElement, CLASS_NAME_DISABLED_FORM, fieldsetElement);
    setFormActive(mapFormElement, CLASS_NAME_DISABLED_MAP, mapFiltersElement);
    setAddressDefault();
  })
  .setView(locationTokyo, MAP_ZOOM);

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  attribution:
    '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
}).addTo(map);

const mainPinIcon = L.icon({
  iconUrl: './img/main-pin.svg',
  iconSize: [52, 52],
  iconAnchor: [26, 52],
});

const mainPinMarker = L.marker(locationTokyo, {
  draggable: true,
  icon: mainPinIcon,
});

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

const markerGroup = L.layerGroup().addTo(map);

const createMarker = () => {
  const filterAdverts = [];
  for (const advert of state.adverts) {
    if (filterAdverts.length >= ADVERTS_COUNT) {
      break;
    }

    if (getAdvertFilter(advert)) {
      filterAdverts.push(advert);
    }
  }

  filterAdverts.forEach(({ location, offer, author }) => {
    const marker = L.marker(
      {
        lat: location.lat,
        lng: location.lng,
      },
      {
        icon: customPinIcon,
      },
    );
    marker.addTo(markerGroup).bindPopup(createCustomPopup({ offer, author }));
  });
};

const createMarkerWithDebounce = debounce(() => createMarker(state.adverts), RERENDER_DELAY);

const updateMapMarker = () => {
  markerGroup.clearLayers();
  createMarkerWithDebounce();
};

//сброс карты
const updateMap = () => {
  mainPinMarker.setLatLng(locationTokyo);
  map.setView(locationTokyo, MAP_ZOOM);
  updateMapMarker();
};

typeFilterElement.addEventListener('change', updateMapMarker);
priceFilterElement.addEventListener('change', updateMapMarker);
roomsFilterElement.addEventListener('change', updateMapMarker);
guestsFilterElement.addEventListener('change', updateMapMarker);
featuresCheckboxes.forEach((item) =>
  item.addEventListener('change', () => {
    if (item.checked) {
      featuresFilterArrays.push(item.value);
    } else {
      featuresFilterArrays.splice(featuresFilterArrays.indexOf(item.value, 0), 1);
    }
    updateMapMarker();
  }),
);

const restMarkers = () => {
  setAddressDefault();
  updateMap();
};

export { createMarker, restMarkers };
