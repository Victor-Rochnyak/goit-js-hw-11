import axios from 'axios';

export default class NewsApiService {
  constructor() {
    this.searchQuery = '';
    this.page = 1;
  }

  async fetchGalleryCards() {
    const axiosOptions = {
      method: 'get',
      url: 'https://pixabay.com/api/',
      params: {
        key: '30006168-b05b26a813c039d7750d56cf6',
        q: `${this.searchQuery}`,
        image_type: 'photo',
        orientation: 'horizontal',
        safesearch: true,
        page: `${this.page}`,
        per_page: 5,
      },
    };
    try {
      const response = await axios(axiosOptions);
      const data = response.data;
      this.incrementPage();
      return data;
    } catch (error) {
      console.error(error);
    }
  }

  incrementPage() {
    this.page += 1;
  }

  resetPage() {
    this.page = 1;
  }

  get query() {
    return this.searchQuery;
  }

  set query(newQuery) {
    this.searchQuery = newQuery;
  }
}

//   // fetchArticles() {
//   //   // метод відповідальний за HTTP запроси
//   //   const url = `https://pixabay.com/api/?key=30063763-445b35770c75047b94dfc0ea2&q=${this.searchQuery}&image_type=photo&orientation=horizontal
//   //   &safesearch=true&per_page=40&page=${this.page}`;

//   //   // повертаємо промис из fetchArticles()
//   //   return fetch(url)
//   //     .then(response => response.json())
//   //     .then(data => {
//   //       this.page += 1;

//   //       return data.hits; //значення
//   //     });
//   // }
//   // зброс сторінки
//   resetPage(){
// this.page = 1;
//   }
//   // получаємо та перезаписуємо поля
//   get query() {
//     return this.searchQuery;
//   }
//   set query(newQuery) {
//     this.searchQuery = newQuery;
//   }
