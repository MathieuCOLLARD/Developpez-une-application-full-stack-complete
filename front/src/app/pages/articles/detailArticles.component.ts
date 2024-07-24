import { Component, OnDestroy, OnInit } from '@angular/core';
import { Article } from 'src/app/interfaces/article.interface';
import { ArticlesService } from '../../services/articles.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Comment } from 'src/app/interfaces/comment.interface';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-detailArticles',
  templateUrl: './detailArticles.component.html',
  styleUrls: ['./detailArticles.component.scss']
})
export class DetailArticlesComponent implements OnInit, OnDestroy {
  public article: Article = {
    title: '',
    content: ''
  };

  public comments: Comment[] = [];
  commentForm: FormGroup;
  loading: boolean = true;

  // Subscriptions
  private articleSubscription: Subscription | undefined;
  private commentsSubscription: Subscription | undefined;
  private addCommentSubscription: Subscription | undefined;

  constructor(
    private articleService: ArticlesService,
    private formBuilder: FormBuilder,
    private router: Router
  ) {
    this.commentForm = this.formBuilder.group({
      comment: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.loadData();
  }

  /**
   * Load article and comments data
   * @returns void
   */
  private loadData(): void {
    const id = this.getArticleIdFromUrl();
    if (id !== null) {
      this.getArticle(id);
      this.getComments(id);
    } else {
      this.loading = false;
      console.error('Invalid article ID');
    }
  }

  /**
   * Extract article ID from the URL
   * @returns number | null
   */
  private getArticleIdFromUrl(): number | null {
    const url = window.location.href;
    const id = url.substring(url.lastIndexOf('/') + 1);
    return isNaN(Number(id)) ? null : parseInt(id, 10);
  }

  /**
   * Add a comment to the article
   * @returns void
   */
  addComment(): void {
    const id = this.getArticleIdFromUrl();
    if (id !== null && this.commentForm.valid) {
      const comment = this.commentForm.get('comment')?.value;
      this.addCommentSubscription = this.articleService.addComment(id, comment).subscribe({
        next: () => {
          this.getComments(id);
          this.commentForm.reset();
        },
        error: error => console.error('Error adding comment', error)
      });
    }
  }

  /**
   * Redirect to the articles page
   * @returns void
   */
  public goBack(): void {
    this.router.navigate(['/articles']);
  }

  /**
   * Get the article by its ID
   * @returns void
   */
  public getArticle(id: number): void {
    this.articleSubscription = this.articleService.getArticleByID(id).subscribe({
      next: (article: Article) => {
        this.article = article;
        this.loading = false;
      },
      error: (error) => {
        if (error.status === 404) {
          console.error('Article not found');
        } else {
          console.error(error);
        }
        this.loading = false;
      }
    });
  }

  /**
   * Get the comments of the article
   * @returns void
   */
  public getComments(id: number): void {
    this.commentsSubscription = this.articleService.getComments(id).subscribe({
      next: (comments: Comment[]) => this.comments = comments,
      error: error => console.error(error)
    });
  }

  ngOnDestroy(): void {
    // Unsubscribe to avoid memory leaks
    this.articleSubscription?.unsubscribe();
    this.commentsSubscription?.unsubscribe();
    this.addCommentSubscription?.unsubscribe();
  }
}
