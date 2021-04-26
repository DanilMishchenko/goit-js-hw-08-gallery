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
refs.modalCloseBtn.addEventListener('click', isCloseModalImage);
refs.modalOverlay.addEventListener('click', isCloseModalImage)

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
    const isImageEl = !e.target.classList.contains('gallery__image');
    if (isImageEl) {
        return;
    };
    refs.lightbox.classList.add('is-open');
    const lightboxImageDataAttribute = e.target.getAttribute('data-source');
    const lightboxImageAlt = e.target.getAttribute('alt');
    refs.modalImg.setAttribute('src', lightboxImageDataAttribute);
    refs.modalImg.setAttribute('alt', lightboxImageAlt);
};

function isCloseModalImage() {
    refs.lightbox.classList.remove('is-open');
    refs.modalImg.setAttribute('src', '');
    refs.modalImg.setAttribute('alt', '');
}
