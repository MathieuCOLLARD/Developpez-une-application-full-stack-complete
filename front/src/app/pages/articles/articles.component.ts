import { Article, RootArticle } from 'src/app/interfaces/article.interface';
import { ArticlesService } from '../../services/articles.service';
import { Component } from '@angular/core';
import { map } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-articles',
  templateUrl: './articles.component.html',
  styleUrls: ['./articles.component.scss']
})
export class ArticlesComponent {

  public articles: Article[] = [];
  public isSortedByDate: boolean = false;
  
  constructor(private articleService: ArticlesService,
    private router: Router) { }

  ngOnInit(): void {
    this.articleService.getAll().pipe(
      map((articles : RootArticle) => articles.articles)
    ).subscribe({
      next: (articles: Article[]) => this.articles = articles,
      error: error => console.error(error)
    });
  }

  viewArticle(articleID: number) {
    this.router.navigate(['/articles', articleID]);
  }

  createNewArticle() {
    this.router.navigate(['/newArticle']);
  }

  sortArticlesByDate(): void {
    this.isSortedByDate = !this.isSortedByDate;
    this.articles.sort((a, b) => {
      const dateA = new Date(a.createdAt).getTime();
      const dateB = new Date(b.createdAt).getTime();
      return this.isSortedByDate ? dateB - dateA : dateA - dateB;
    });
  }

}