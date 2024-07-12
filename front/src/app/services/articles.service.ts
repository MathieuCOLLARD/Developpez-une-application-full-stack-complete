import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Article, RootArticle } from '../interfaces/article.interface';

@Injectable({
  providedIn: 'root'
})
export class ArticlesService {

  private pathService = 'api/articles';

  constructor(private httpClient: HttpClient) { }

  public getAll(): Observable<RootArticle> {
    return this.httpClient.get<RootArticle>(`${this.pathService}`);
  }

  public getArticleByID(articleID: number): Observable<Article> {
    return this.httpClient.get<Article>(`${this.pathService}/${articleID}`);
  }

  public create(article: Article): Observable<String> {
    return this.httpClient.post<String>(`${this.pathService}`,article);
  }

  public addComment(articleID: string, comment: string): Observable<String> {
    return this.httpClient.post<String>(`${this.pathService}/comments`,{articleID, comment});
  }
}
