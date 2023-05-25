import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';
import { galleryItems } from './gallery-items';

const galleryContainer = document.querySelector('.gallery');

const galleryMarkup = galleryItems
  .map(
    ({ preview, description, original }) => `
    <li class="gallery__item">
  <a class="gallery__link" href=${original}>
    <img
      class="gallery__image"
      src=${preview}
      alt=${description}
    />
  </a>
</li>
  `
  )
  .join('');

galleryContainer.insertAdjacentHTML(`beforeend`, galleryMarkup);

new SimpleLightbox('.gallery a', {
  captions: true,
  captionsData: 'alt',
  captionDelay: 250,
});

console.log(galleryItems);
