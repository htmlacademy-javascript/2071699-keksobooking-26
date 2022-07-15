const showErrorLoadData = (message) => {
  const alertContainer = document.createElement('div');
  const divContainer = document.querySelector('.promo');

  alertContainer.textContent = message;
  alertContainer.classList.add('alert-container');
  divContainer.after(alertContainer);
};

// Источник - https://www.freecodecamp.org/news/javascript-debounce-example
function debounce(callback, timeoutDelay = 500) {
  let timeoutId;
  return (...rest) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => callback.apply(this, rest), timeoutDelay);
  };
}

export { showErrorLoadData, debounce };
