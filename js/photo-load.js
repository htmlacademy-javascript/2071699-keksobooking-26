const FILE_TYPES = ['gif', 'jpg', 'jpeg', 'png'];
const DEFAULT_AVATAR = 'img/muffin-grey.svg';

const avatarChooser = document.querySelector('.ad-form__field input[type=file]');
const avatarPreview = document.querySelector('.ad-form-header__preview img');
const houseChooser = document.querySelector('.ad-form__upload input[type=file]');
const housePreview = document.querySelector('.ad-form__photo');

const houseImg = document.createElement('img', { alt: 'Фотография жилья' });
housePreview.appendChild(houseImg);

avatarChooser.addEventListener('change', () => {
  const avatarFile = avatarChooser.files[0];
  const avatarFileName = avatarFile.name.toLowerCase();

  const matches = FILE_TYPES.some((it) => avatarFileName.endsWith(it));
  if (matches) {
    avatarPreview.src = URL.createObjectURL(avatarFile);
  }
});

houseChooser.addEventListener('change', () => {
  const houseFile = houseChooser.files[0];
  const houseFileName = houseFile.name.toLowerCase();

  const matches = FILE_TYPES.some((it) => houseFileName.endsWith(it));
  if (matches) {
    houseImg.src = URL.createObjectURL(houseFile);
  }
});

const restFormImg = () => {
  avatarPreview.src = DEFAULT_AVATAR;
  houseImg.src = '';
};

export { restFormImg };
