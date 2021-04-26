import galleryImages from './gallery-items.js';

const refs = {
    galleryList: document.querySelector('.js-gallery'),
    lightbox: document.querySelector('.js-lightbox'),
    modalOverlay: document.querySelector('.lightbox__overlay'),
    modalImg: document.querySelector('.lightbox__image'),
    modalCloseBtn: document.querySelector('.lightbox__button'),
}
const imagesCards = createImageCards(galleryImages);

refs.galleryList.insertAdjacentHTML('beforeend', imagesCards);
refs.galleryList.addEventListener('click', onGalleryContainerClick);
refs.modalCloseBtn.addEventListener('click', isCloseModalImageClick);
refs.modalOverlay.addEventListener('click', onOverlayClick)

function createImageCards(galleryImages) {
    return galleryImages
        .map(({ preview, original, description }) => {
            return `
        <li class="gallery__item">
            <a
                class="gallery__link"
                href="${original}"
            >
                <img
                    class="gallery__image"
                    src="${preview}"
                    data-source="${original}"
                    alt="${description}"
                />
            </a>
        </li>
        `;
        }).join('');
}

function onGalleryContainerClick(e) {
    e.preventDefault();
    window.addEventListener('keydown', onCloseKeyPress)
    const isImageEl = !e.target.classList.contains('gallery__image');
    if (isImageEl) {
        return;
    };
    refs.lightbox.classList.add('is-open');
    setAttributeImage(e.target.getAttribute('data-source'), e.target.getAttribute('alt'))
};

function setAttributeImage(src, alt) {
    refs.modalImg.src = src;
    refs.modalImg.alt = alt;
}

function isCloseModalImageClick() {
    refs.lightbox.classList.remove('is-open');
    setAttributeImage('','')
}

function onOverlayClick(e) {
    if (e.currentTarget === e.target) {
        isCloseModalImageClick();
    }
};

function onCloseKeyPress(e) {
    if (e.code === 'Escape') {
        isCloseModalImageClick();
    }
};