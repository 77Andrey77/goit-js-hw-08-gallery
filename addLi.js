import galleryItems from './gallery-items.js';

const galleryEl = document.querySelector('.js-gallery');

const modalEl = document.querySelector('.js-lightbox'); //модалка

const modalImageEl = document.querySelector('.lightbox__image'); //картинка в модалке

const closeButtonEl = document.querySelector('.lightbox__button'); //конпка закрытия

//создаю одну карту
const makeImageCard = ({ preview, original, description }) => {
    const elem = document.createElement('li');
    elem.classList.add('gallery__item');

    const addLink = document.createElement('a');
    elem.append(addLink);
    addLink.classList.add('gallery__link');
    addLink.setAttribute('href', original);

    const addImage = document.createElement('img');
    addLink.append(addImage);
    addImage.classList.add('gallery__image');
    addImage.setAttribute('src', preview);
    addImage.setAttribute('data-source', original);
    addImage.setAttribute('alt', description);

    return elem;
};

//по массиву создаю остальные карты
const elements = galleryItems.map(makeImageCard);

// распыляем карты в разметку
galleryEl.append(...elements);
//////////////////////////////////////////////////////////////////////////////////////

galleryEl.addEventListener('click', onOpenModal); //ставим слушателя на ul для открытия модалки
closeButtonEl.addEventListener('click', onCloseModal); //став слуш на кнопку закрыть - закрытие модалки

function onOpenModal(even) {
    even.preventDefault(); // отмена действий браузера по умолчанию

    if (even.target.nodeName !== 'IMG') {
        return;
    }

    modalEl.classList.add('is-open');
    modalImageEl.src = even.target.dataset.source;
    modalImageEl.alt = even.target.alt;

    document.addEventListener('keydown', onCloseModalOnEsc); //повесили слушателя для реагирования на Esc
    document.addEventListener('keydown', onScrolImg);
}

function onCloseModal(even) {
    modalEl.classList.remove('is-open');
    modalImageEl.src = '';
    modalImageEl.alt = '';

    document.removeEventListener('keydown', onCloseModalOnEsc); //сняли слушателя так как модалка закрыта
    document.removeEventListener('keydown', onScrolImg);
}
////////////////////////////////////// закрытие модалки по клику вокруг изображения

const closeOverlayEl = document.querySelector('.lightbox__overlay');

closeOverlayEl.addEventListener('click', onCloseModalOverlay);

function onCloseModalOverlay(even) {
    if (even.currentTarget === even.target) {
        onCloseModal();
    }
}
////////////////////////////////////закрытие модалки по клику на Esk

function onCloseModalOnEsc(even) {
    if (even.code === 'Escape') {
        onCloseModal();
    }
}

//////////////////////////////////////////////// перелистывание изображений

function onScrolImg(even) {
    let imageIndex = galleryItems.findIndex(
        image => image.original === modalImageEl.src,
    );
    // если в лево
    if (even.code === 'ArrowLeft') {
        if (imageIndex === 0) {
            imageIndex += galleryItems.length;
        }
        imageIndex -= 1;
    }
    // если в право
    if (even.code === 'ArrowRight') {
        if (imageIndex === galleryItems.length - 1) {
            imageIndex = -1;
        }

        imageIndex += 1;
    }

    modalImageEl.src = galleryItems[imageIndex].original;
    modalImageEl.alt = galleryItems[imageIndex].description;
}
