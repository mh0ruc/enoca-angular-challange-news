import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

interface Article {
  id: string;
  title: string;
  subtitle: string;
  image: string;
  description: string;
}

@Injectable({
  providedIn: 'root'  // Servisi global hale getiriyoruz
})
export class NewsService {
  private http = inject(HttpClient);
  private apiKey = 'b6e41c00e7df4ee5bbb3e9607a99d9a9';
  private apiUrl = `https://newsapi.org/v2/everything?q=technology&apiKey=${this.apiKey}`;

  private newsList: Article[] = [];

  constructor() {}

  fetchNews(): Observable<Article[]> {
    return this.http.get<{ articles: any[] }>(this.apiUrl).pipe(
      map(response => {
        this.newsList = response.articles.map((article: any, index: number): Article => ({
          id: index.toString(),
          title: article.title || 'Başlık Yok',
          subtitle: article.source?.name || 'Kaynak Yok',
          image: article.urlToImage || 'https://via.placeholder.com/150',
          description: article.description || 'Açıklama Yok'
        }));
        return this.newsList;
      })
    );
  }

  getArticleById(id: string): Article | undefined {
    return this.newsList.find(article => article.id === id);
  }
}
