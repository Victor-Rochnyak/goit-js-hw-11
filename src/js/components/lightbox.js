import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';


var lightbox = new SimpleLightbox('.gallery a',{
    
  nav: true,
  close: true,
  caption: true,
  // captionsData: 'alt',
  captionPosition: 'bottom',
  captionDelay: 250,
});
export { lightbox };