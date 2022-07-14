const FILE_TYPES = ['gif', 'jpg', 'jpeg', 'png'];
const DEFAULT_AVATAR = 'img/muffin-grey.svg';

const avatarChooser = document.querySelector('.ad-form__field input[type=file]');
const avatarPreview = document.querySelector('.ad-form-header__preview img');

avatarChooser.addEventListener('change', () => {
  const avatarFile = avatarChooser.files[0];
  const avatarFileName = avatarFile.name.toLowerCase();

  const matches = FILE_TYPES.some((it) => {
    return avatarFileName.endsWith(it);
  });
  if (matches) {
    avatarPreview.src = URL.createObjectURL(avatarFile);
  }
});

const houseChooser = document.querySelector('.ad-form__upload input[type=file]');
const housePreview = document.querySelector('.ad-form__photo');

houseChooser.addEventListener('change', () => {
  const houseFile = houseChooser.files[0];
  const houseFileName = houseFile.name.toLowerCase();

  const matches = FILE_TYPES.some((it) => {
    return houseFileName.endsWith(it);
  });
  if (matches) {
    housePreview.innerHTML = `<img src="${URL.createObjectURL(
      houseFile,
    )}" alt="Фотография жилья" />`;
  }
});

const restFormImg = () => {
  avatarPreview.src = DEFAULT_AVATAR;
  if (housePreview.querySelector('img')) {
    housePreview.querySelector('img').remove();
  }
};

export { restFormImg };
