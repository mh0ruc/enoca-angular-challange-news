import { Component, inject } from '@angular/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

// 📌 Haber verisi için bir interface tanımlandı
interface Article {
  title: string;
  subtitle: string;
  image: string;
  description: string;
  id: string;  // Her haberin benzersiz bir ID'si olması gerektiğini unutmayın
}

@Component({
  selector: 'app-newsslider',
  standalone: true,
  imports: [CommonModule, HttpClientModule],
  templateUrl: './newsslider.component.html',
  styleUrls: ['./newsslider.component.css']
})
export class NewssliderComponent {

  private http = inject(HttpClient);
  private router = inject(Router);

  currentIndex = 0;
  newsList: Article[] = [];  // 📌 Artık `Article` tipinde bir dizi olacak

  private apiKey = 'b6e41c00e7df4ee5bbb3e9607a99d9a9';
  private apiUrl = `https://newsapi.org/v2/everything?q=technology&apiKey=${this.apiKey}`;

  constructor() {
    this.fetchNews();
  }

  fetchNews() {
    this.http.get<{ articles: any[] }>(this.apiUrl).subscribe(response => {
      if (response.articles) {
        // Yalnızca ilk üç haberi alıyoruz
        this.newsList = response.articles.slice(0, 3).map((article: any, index: number): Article => ({
          id: index.toString(),  // Benzersiz ID'yi burada tanımlıyoruz
          title: article.title || 'Başlık Yok',
          subtitle: article.source?.name || 'Kaynak Yok',
          image: article.urlToImage || 'https://via.placeholder.com/150',
          description: article.description || 'Açıklama Yok'
        }));
      }
    });
  }

  nextSlide() {
    this.currentIndex = (this.currentIndex + 1) % this.newsList.length;
  }

  prevSlide() {
    this.currentIndex = (this.currentIndex - 1 + this.newsList.length) % this.newsList.length;
  }

  trackByFn(index: number, item: Article) {
    return index;
  }

  // Detay sayfasına yönlendirme fonksiyonu
  goToDetail(news: Article) {
    this.router.navigate(['/news', news.id], { state: { article: news } });
  }
}
