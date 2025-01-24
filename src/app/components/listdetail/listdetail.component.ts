import { Component, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router, RouterModule } from '@angular/router';

interface Article {
  id: string;
  title: string;
  subtitle: string;
  image: string;
  description: string;
}

@Component({
  selector: 'app-listdetail',
  standalone: true,
  imports: [RouterModule],  // RouterModule import edilmiştir
  templateUrl: './listdetail.component.html',
  styleUrls: ['./listdetail.component.css']  // styleUrls doğru yazılmalı
})
export class ListdetailComponent {
  private http = inject(HttpClient);
  private router = inject(Router);

  newsList: Article[] = [];

  private apiKey = 'b6e41c00e7df4ee5bbb3e9607a99d9a9';
  private apiUrl = `https://newsapi.org/v2/everything?q=technology&apiKey=${this.apiKey}`;

  constructor() {
    this.fetchNews();
  }

  fetchNews() {
    this.http.get<{ articles: any[] }>(this.apiUrl).subscribe(response => {
      if (response.articles) {
        this.newsList = response.articles.map((article: any, index: number): Article => ({
          id: index.toString(),
          title: article.title || 'Başlık Yok',
          subtitle: article.source?.name || 'Kaynak Yok',
          image: article.urlToImage || 'https://via.placeholder.com/150',
          description: article.description || 'Açıklama Yok'
        }));
      }
    });
  }
}
