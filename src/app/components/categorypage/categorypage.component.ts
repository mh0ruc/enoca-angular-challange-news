import { Component, OnInit, inject } from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router'; // Router'ı da buraya ekleyin
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';

interface Article {
  id: string;
  title: string;
  subtitle: string;
  image: string;
  description: string;
  category: string;
}

@Component({
  selector: 'app-categorypage',
  templateUrl: './categorypage.component.html',
  styleUrls: ['./categorypage.component.css'],
  imports: [CommonModule, RouterModule, HttpClientModule]
})
export class CategorypageComponent implements OnInit {
  private route = inject(ActivatedRoute);
  private http = inject(HttpClient);
  private router = inject(Router); // Router'ı burada enjekte edin

  categoryName: string = '';
  categoryNews: Article[] = [];
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

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      this.categoryName = params.get('name') || 'general';
      this.fetchCategoryNews();
    });
  }
  fetchCategoryNews() {
    const categoryKey = this.categoryName.toLowerCase();
    const apiUrl = this.apiUrls[categoryKey as keyof typeof this.apiUrls];
  
    if (!apiUrl) {
      this.categoryNews = [];
      return;
    }
  
    this.http.get<{ articles?: any[] }>(apiUrl).subscribe(response => {
      if (response?.articles) {
        this.categoryNews = response.articles.map((article: any, index: number) => ({
          id: categoryKey + index,
          title: article.title || 'Başlık Yok',
          subtitle: article.source?.name || 'Kaynak Yok',
          image: article.urlToImage || 'https://via.placeholder.com/150',
          description: article.description || 'Açıklama Yok',
          category: categoryKey
        }));
  
        // Doğru toplam haber sayısını hesapla
        this.totalNewsCount = this.categoryNews.length;
  
        // Sayfa sayısını doğru hesapla
        this.totalPages = Math.ceil(this.totalNewsCount / this.pageSize);
  
        // Sayfalandırmayı güncelle
        this.updatePagedNews();
        this.generatePages();
      }
    });
  }
  
  // Sayfa numaralarını doğru hesaplayacak şekilde fonksiyon
  generatePages() {
    // Toplam sayfa sayısını doğru hesapla
    this.totalPages = Math.ceil(this.totalNewsCount / this.pageSize);
    this.pages = Array.from({ length: this.totalPages }, (_, i) => i + 1); // Sayfa numaralarını oluştur
  }
// ✅ Sayfalandırma için haberleri güncelleme
updatePagedNews() {
  const start = (this.currentPage - 1) * this.pageSize;
  const end = start + this.pageSize;
  this.pagedNews = this.categoryNews.slice(start, end);
}

// ✅ Sayfa numaralarını oluşturma


goToPage(page: number) {
  this.currentPage = page;
  this.updatePagedNews();
}
// Yönlendirme fonksiyonu
  goToDetail(news: Article) {
    this.router.navigate(['/news', news.id], { state: { article: news } });
  }
}
