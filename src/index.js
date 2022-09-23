import { Notify } from 'notiflix/build/notiflix-notify-aio';
import NewsApiService from './js/components/news-api-service.js';
import createGalleryMarkup from './js/components/render-cards';
import {lightbox} from './js/components/lightbox.js'

const refs = {
  searchForm: document.querySelector('.search-form'),
  gallery: document.querySelector('.gallery'),
  loadMoreBtn: document.querySelector('.load-more'),
};
// дістаємо об'єкт з властивостями
const newsApiService = new NewsApiService();
// вішаємо слушатєля на кнопки
refs.searchForm.addEventListener('submit', onSearch);
// refs.loadMoreBtn.addEventListener('click', onloadMore);

function onSearch(event) {
  event.preventDefault();
  // при сабміті форми ми на об'єкт newsApiService та в свойстві
  // this.searchQuery за допомогою set query(newQuery) записуємо те,
  // що получаємо при запитті на сервер
  newsApiService.query = event.currentTarget.elements.searchQuery.value.trim();
  newsApiService.resetPage();

  if (newsApiService.query === '') {
    Notify.warning('Please, fill the main field');
    refs.galleryContainer.innerHTML = '';
    return;
  }

  newsApiService.fetchGalleryCards().then(data => {
    refs.gallery.innerHTML = '';
    if (!data.hits.length) {
      Notify.warning(
        `Sorry, there are no images matching your search query. Please try again.`
      );
      return;
    }
    onRenderGallery(data);
    Notify.success(`Hooray! We found ${data.totalHits} images !`);
    lightbox.refresh();
  });
}
function  onRenderGallery(data) {     
    const markup = data.hits.map(data => createGalleryMarkup(data)).join('');
         refs.gallery.insertAdjacentHTML('beforeend', markup);
     
  }

  function onScrollmake(data) {
    const markup = data.hits.map(data => renderCard(data)).join('');
    refs.galleryContainer.insertAdjacentHTML('beforeend', markup);
  
    lightbox.refresh();
}
// function onloadMore() {
//   newsApiService.fetchArticles().then(onloadMore);
// }

// function GalleryMarkup(hits) {
//   refs.gallery.insertAdjacentHTML('beforeend', GalleryMarkup(hits));
// }
