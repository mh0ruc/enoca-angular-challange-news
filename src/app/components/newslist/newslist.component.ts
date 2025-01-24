import { Component, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';

interface Article {
  id: string;
  title: string;
  subtitle: string;
  image: string;
  description: string;
  category: string;  // ✅ Haberin hangi kategoriye ait olduğunu saklayacağız
}

@Component({
  selector: 'app-newslist',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './newslist.component.html',
  styleUrls: ['./newslist.component.css']
})
export class NewslistComponent {
  private http = inject(HttpClient);
  private router = inject(Router);

  // ✅ Her kategori için ayrı bir dizi
  technologyNews: Article[] = [];
  healthNews: Article[] = [];
  scienceNews: Article[] = [];
  generalNews: Article[] = [];
  entertainmentNews: Article[] = [];
  businessNews: Article[] = [];
  sportsNews: Article[] = [];

  // ✅ Tüm haberleri tek bir listede toplamak için
  allNews: Article[] = [];
  pagedNews: Article[] = []; 
  totalPages: number = 0;
  pageSize: number = 15;
  currentPage: number = 1;
  totalNewsCount: number = 0;
  pages: number[] = [];

  private apiKey = 'b6e41c00e7df4ee5bbb3e9607a99d9a9';
  private apiUrls = {
    technology: `https://newsapi.org/v2/everything?q=technology&apiKey=${this.apiKey}`,
    health: `https://newsapi.org/v2/everything?q=health&apiKey=${this.apiKey}`,
    science: `https://newsapi.org/v2/everything?q=science&apiKey=${this.apiKey}`,
    general: `https://newsapi.org/v2/everything?q=general&apiKey=${this.apiKey}`,
    entertainment: `https://newsapi.org/v2/everything?q=entertainment&apiKey=${this.apiKey}`,
    business: `https://newsapi.org/v2/everything?q=business&apiKey=${this.apiKey}`,
    sports: `https://newsapi.org/v2/everything?q=sports&apiKey=${this.apiKey}`
  };

  constructor() {
    this.fetchAllCategories();
  }

  // ✅ Tüm kategorileri API'den çek
  fetchAllCategories() {
    Object.entries(this.apiUrls).forEach(([category, url]) => {
      this.http.get<{ articles?: any[] }>(url).subscribe(response => {
        if (response && response.articles) {
          const categoryNews = response.articles.map((article: any, index: number): Article => ({
            id: category + index,  // ✅ Benzersiz ID için kategori ismi ekledik
            title: article.title || 'Başlık Yok',
            subtitle: article.source?.name || 'Kaynak Yok',
            image: article.urlToImage || 'https://via.placeholder.com/150',
            description: article.description || 'Açıklama Yok',
            category: category // ✅ Haberin kategorisini kaydettik
          }));

          // ✅ Haberleri ilgili kategori dizisine kaydet
          switch (category) {
            case 'technology': this.technologyNews = categoryNews; break;
            case 'health': this.healthNews = categoryNews; break;
            case 'science': this.scienceNews = categoryNews; break;
            case 'general': this.generalNews = categoryNews; break;
            case 'entertainment': this.entertainmentNews = categoryNews; break;
            case 'business': this.businessNews = categoryNews; break;
            case 'sports': this.sportsNews = categoryNews; break;
          }

          // ✅ Tüm haberleri tek bir dizide birleştir
          this.allNews = [
            ...this.technologyNews,
            ...this.healthNews,
            ...this.scienceNews,
            ...this.generalNews,
            ...this.entertainmentNews,
            ...this.businessNews,
            ...this.sportsNews
          ];
          this.totalPages = Math.ceil(this.totalNewsCount / this.pageSize);

          this.totalNewsCount = this.allNews.length;
          this.updatePagedNews();
          this.generatePages();
        }
      });
    });
  }

  // ✅ Sayfalandırma için haberleri güncelleme
  updatePagedNews() {
    const start = (this.currentPage - 1) * this.pageSize;
    const end = start + this.pageSize;
    this.pagedNews = this.allNews.slice(start, end);
  }

  // ✅ Sayfa numaralarını oluşturma
  generatePages() {
    const totalPages = Math.ceil(this.allNews.length / this.pageSize);
    this.pages = Array.from({ length: totalPages }, (_, i) => i + 1);
  }

  // ✅ Sayfa değiştirme fonksiyonu
  goToPage(page: number) {
    this.currentPage = page;
    this.updatePagedNews();
  }

  // ✅ Detay sayfasına yönlendirme
  goToDetail(news: Article) {
    this.router.navigate(['/news', news.id], { state: { article: news } });
  }
}
