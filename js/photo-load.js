const FILE_TYPES = ['gif', 'jpg', 'jpeg', 'png'];
const DEFAULT_AVATAR = 'img/muffin-grey.svg';

const avatarChooser = document.querySelector('.ad-form__field input[type=file]');
const avatarPreview = document.querySelector('.ad-form-header__preview img');
const houseChooser = document.querySelector('.ad-form__upload input[type=file]');
const housePreview = document.querySelector('.ad-form__photo');

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
  if (!matches) {
    return;
  }
  const houseImgElement = housePreview.querySelector('img');
  if (houseImgElement) {
    houseImgElement.src = URL.createObjectURL(houseFile);
  } else {
    const houseImg = document.createElement('img');
    houseImg.src = URL.createObjectURL(houseFile);
    houseImg.alt = 'Фотография жилья';
    houseImg.classList.add('ad-form__photo');
    housePreview.appendChild(houseImg);
  }
});

const restFormImg = () => {
  avatarPreview.src = DEFAULT_AVATAR;

  const houseImgElement = housePreview.querySelector('img');
  if (houseImgElement) {
    houseImgElement.remove();
  }
};

export { restFormImg };
