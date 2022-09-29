import { Notify } from 'notiflix/build/notiflix-notify-aio';
import NewsApiService from './js/components/news-api-service.js';
import createGalleryMarkup from './js/components/render-cards';
import { lightbox } from './js/components/lightbox.js';
// import './js/components/io';

const refs = {
  searchForm: document.querySelector('.search-form'),
    gallery: document.querySelector('.gallery'),
    sentinel: document.querySelector('#sentinel'),
}
// дістаємо об'єкт з властивостями
const newsApiService = new NewsApiService();
// вішаємо слушатєля на кнопки
refs.searchForm.addEventListener('submit', onSearch);
// refs.loadMoreBtn.addEventListener('click', onloadMore);

function onSearch(event) {
  event.preventDefault();

  refs.gallery.innerHTML = '';
  newsApiService.query = event.currentTarget.elements.searchQuery.value.trim();
  newsApiService.resetPage();

  if (newsApiService.query === '') {
    return Notify.warning('Please, fill the main field');
  }

  newsApiService.fetchGalleryCards().then(data => {
    createGalleryMarkup(data);
    newsApiService.incrementPage();
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

function onRenderGallery(data) {
  const markup = data.hits.map(data => createGalleryMarkup(data)).join('');
  refs.gallery.insertAdjacentHTML('beforeend', markup);
}
// Регістрація Обзервера, який відстежує блок під інформацією.
//  для безкінечного скрола
const onEntry = entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      console.log('пора грузіть статью');
      newsApiService.fetchGalleryCards().then(data => {
        refs.gallery.insertadjacenthtml = '';
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
  });
};
const options = {
  rootMargin: '50px',
};
const observer = new IntersectionObserver(onEntry, options);
observer.observe(refs.sentinel);


// Функція, яка при нажиманні на кнопку підгружає картинки
// function onloadMore() {
//   newsApiService.fetchGalleryCards().then(data => {
//     refs.gallery.innerHTML = '';
//     if (!data.hits.length) {
//       Notify.warning(
//         `Sorry, there are no images matching your search query. Please try again.`
//       );
//       return;
//     }
//     onRenderGallery(data);
//     Notify.success(`Hooray! We found ${data.totalHits} images !`);
//     lightbox.refresh();
//   });
// }

//   function onScrollmake(data) {
//     const markup = data.hits.map(data => renderCard(data)).join('');
//     refs.galleryContainer.insertAdjacentHTML('beforeend', markup);

//     lightbox.refresh();
// }

// function GalleryMarkup(hits) {
//   refs.gallery.insertAdjacentHTML('beforeend', GalleryMarkup(hits));
// }
