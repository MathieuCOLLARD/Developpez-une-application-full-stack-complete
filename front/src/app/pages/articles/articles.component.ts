import { Article, RootArticle } from 'src/app/interfaces/article.interface';
import { ArticlesService } from '../../services/articles.service';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { map, Subscription } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-articles',
  templateUrl: './articles.component.html',
  styleUrls: ['./articles.component.scss']
})

export class ArticlesComponent implements OnInit, OnDestroy {

  public articles: Article[] = [];
  public isSortedByDate: boolean = false;
  
  // Subscriptions
  private articleServiceSubscription : Subscription | undefined;
  
  constructor(private articleService: ArticlesService,
    private router: Router) { }

  ngOnInit(): void {
    this.articleServiceSubscription = this.articleService.getAll().pipe(
      map((articles : RootArticle) => articles.articles)
    ).subscribe({
      next: (articles: Article[]) => this.articles = articles,
      error: error => console.error(error)
    });
  }

  /**
   * Redirect to the article detail page
   * @param article 
   */
  viewArticle(article: Article) {
    if(article.id) {
      this.router.navigate(['/articles', article.id]);
    }
  }

  /**
   * Redirect to the new article
   * @returns void
   */
  createNewArticle() {
    this.router.navigate(['/newArticle']);
  }

  /**
   * Sort articles by date
   * @returns void
   */
  sortArticlesByDate(): void {
    this.isSortedByDate = !this.isSortedByDate;
    this.articles.sort((a : Article, b : Article) => {
      if (!a.createdAt || !b.createdAt) return 0;
      const dateA = new Date(a.createdAt).getTime();
      const dateB = new Date(b.createdAt).getTime();
      return this.isSortedByDate ? dateB - dateA : dateA - dateB;
    });
  }

  ngOnDestroy(): void {
    this.articleServiceSubscription?.unsubscribe();
  }
}