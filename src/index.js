import galleryItems from './app.js';

// create refs for easier handling:
const refs = {
  gallery: document.querySelector('.js-gallery'),
  modalImg: document.querySelector('.lightbox__image'),
  modalOpen: document.querySelector('.js-lightbox'),
  modalCloseBtn: document.querySelector('[data-action="close-lightbox"]'),
  backdrop: document.querySelector('.lightbox__overlay'),
};

// create a function to handle object parsing from array into HTML gallery items:
const galleryRef = document.querySelector('.js-gallery');

const createGalleryItems = ({ preview, original, description }) => {
  const galleryItem = document.createElement('li');
  galleryItem.classList.add('gallery__item');

  const galleryItemLink = document.createElement('a');
  galleryItemLink.classList.add('gallery__link');
  galleryItemLink.href = `${original}`;

  const galleryItemImage = document.createElement('img');
  galleryItemImage.classList.add('gallery__image');
  galleryItemImage.src = `${preview}`;
  galleryItemImage.dataset.source = `${original}`;
  galleryItemImage.alt = `${description}`;

  galleryItemLink.appendChild(galleryItemImage);
  galleryItem.appendChild(galleryItemLink);

  return galleryItem;
};

const galleryEl = galleryItems.map(createGalleryItems);
galleryRef.append(...galleryEl);

// ============ MODAL WINDOW PARAMS ================

refs.gallery.addEventListener('click', (event) => {
  event.preventDefault();
  const target = event.target;

  if (event.target.nodeName !== 'IMG') {
    return target;
  }

  onOpenModal(target);
});

refs.gallery.addEventListener('click', onOpenModal);
refs.modalCloseBtn.addEventListener('click', onCloseModal);
refs.backdrop.addEventListener('click', onBackdropClick);

function onOpenModal(target) {
  window.addEventListener('keydown', onEscKeyPress);
  refs.modalOpen.classList.add('is-open');

  galleryItems.forEach(({ preview, original, description }) => {
    if (target.src === preview) {
      refs.modalImg.src = `${original}`;
      refs.modalImg.alt = `${description}`;
    }
  });
}

function onCloseModal() {
  window.removeEventListener('keydown', onEscKeyPress);
  refs.modalOpen.classList.remove('is-open');

  refs.modalImage.src = '';
  refs.modalImage.alt = '';
}

function onEscKeyPress(event) {
  const ESC_KEY_CODE = 'Escape';
  const isEscKey = event.code === ESC_KEY_CODE;

  if (isEscKey) {
    onCloseModal();
  }
}

function onBackdropClick(event) {
  if (event.currentTarget === event.target) {
    onCloseModal();
  }
}
