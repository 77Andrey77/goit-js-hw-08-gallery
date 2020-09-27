import galleryItems from './gallery-items.js';

const galleryEl = document.querySelector('.gallery.js-gallery');

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
