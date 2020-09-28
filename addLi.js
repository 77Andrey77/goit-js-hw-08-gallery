import galleryItems from './gallery-items.js';

const galleryEl = document.querySelector('.js-gallery');

const modalEl = document.querySelector('.js-lightbox');

const modalImageEl = document.querySelector('.lightbox__image');

const closeButtonEl = document.querySelector('.lightbox__button');

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
}

function onCloseModal(even) {
    modalEl.classList.remove('is-open');
    modalImageEl.src = '';
    modalImageEl.alt = '';
}
