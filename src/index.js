import galleryItems from './app.js';

// create refs for easier handling:
const refs = {
  gallery: document.querySelector('.js-gallery'),
  modalImg: document.querySelector('.lightbox__image'),
  modalOpen: document.querySelector('.js-lightbox'),
  modalCloseBtn: document.querySelector('[data-action="close-lightbox"]'),
  backdrop: document.querySelector('.lightbox__overlay'),
};
let currentImgIndex;

// parsing markup from array into HTML gallery items:

const galleryItem = galleryItems.map((element, index) => {
  return `<li class="gallery__item">
  <a class="gallery_link" href="${element.original}" >
  <img class="gallery__image" src="${element.preview}" alt="${element.description}" data-source="${element.original}" data-index="${index}">
  </a>
  </li>`;
});
refs.gallery.insertAdjacentHTML('beforeend', galleryItem.join(''));

// ============ MODAL WINDOW PARAMS ================

refs.gallery.addEventListener('click', (event) => {
  event.preventDefault();
  const target = event.target;

  if (target.nodeName !== 'IMG') {
    return target;
  }

  onOpenModal(target);
});

refs.gallery.addEventListener('click', onOpenModal);
refs.modalCloseBtn.addEventListener('click', onCloseModal);
refs.backdrop.addEventListener('click', onBackdropClick);

// opening modal function
function onOpenModal(target) {
  window.addEventListener('keydown', onEscKeyPress);
  window.addEventListener('keydown', onImageChange);
  refs.modalOpen.classList.add('is-open');

  galleryItems.forEach(({ preview, original, description }) => {
    if (target.src === preview) {
      refs.modalImg.src = `${original}`;
      refs.modalImg.alt = `${description}`;
      currentImgIndex = target.getAttribute('data-index');
    }
  });
}

// closing modal function
function onCloseModal() {
  window.removeEventListener('keydown', onEscKeyPress);
  window.removeEventListener('keydown', onImageChange);
  refs.modalOpen.classList.remove('is-open');

  refs.modalImg.src = '';
  refs.modalImg.alt = '';
  refs.modalImg.dataset.index = '';
}

// closing modal on Esc press
function onEscKeyPress(event) {
  const ESC_KEY_CODE = 'Escape';
  const isEscKey = event.code === ESC_KEY_CODE;

  if (isEscKey) {
    onCloseModal();
  }
}

// closing modal on backdrop click
function onBackdropClick(event) {
  if (event.currentTarget === event.target) {
    onCloseModal();
  }
}

// changing images on right\left arrow buttons press:
function onImageChange(event) {
  const right = 'ArrowRight';
  const left = 'ArrowLeft';

  switch (event.code) {
    case left:
      currentImgIndex -= 1;
      break;
    case right:
      currentImgIndex += 1;
      break;
  }

  if (currentImgIndex > galleryItems.length - 1) {
    currentImgIndex = 0;
  }

  if (currentImgIndex < 0) {
    currentImgIndex = galleryItems.length - 1;
  }

  refs.modalImg.src = galleryItems[currentImgIndex].original;
}
