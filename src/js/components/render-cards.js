export default function createGalleryMarkup(data) {
        return `<div class="photo-card">
      <a href="${data.webformatURL}">
        <img
          class="photo-card__img"
          src="${data.largeImageURL}" 
          alt="${data.tags}" 
          loading="lazy" 
          width="320"
          height="212"
        />
      </a>
      <div class="info">
        <p class="info-item">
          <b>Likes</b>
          <span>${data.likes}</span>
        </p>
        <p class="info-item">
          <b>Views</b>
          <span>${data.views}</span>
        </p>
        <p class="info-item">
          <b>Comments</b>
          <span>${data.comments}</span>
        </p>
        <p class="info-item">
          <b>Downloads</b>
          <span>${data.downloads}</span>
        </p>
      </div>
    </div>`
      }