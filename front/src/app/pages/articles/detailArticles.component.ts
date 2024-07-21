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
    id: 0,
    title: '',
    content: '',
    author: '',
    createdAt: '',
    topicTitle: 0
  };

  public comments: Comment[] = [];
  commentForm: FormGroup;

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
    this.getArticle();
    this.getComments();
  }

  /**
   * Add a comment to the article
   * @returns void
   */
  addComment(): void {
    const url = window.location.href;
    const id = url.substring(url.lastIndexOf('/') + 1);
    if (this.commentForm.valid) {
      const comment = this.commentForm.get('comment')?.value;
      this.addCommentSubscription = this.articleService.addComment(parseInt(id), comment).subscribe({
        next: () => {
          this.getComments();
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
  public getArticle(): void {
    const url = window.location.href;
    const id = url.substring(url.lastIndexOf('/') + 1);
    this.articleSubscription = this.articleService.getArticleByID(parseInt(id)).subscribe({
      next: (article: Article) => this.article = article,
      error: error => console.error(error)
    });
  }

  /**
   * Get the comments of the article
   * @returns void
   */
  public getComments(): void {
    const url = window.location.href;
    const id = url.substring(url.lastIndexOf('/') + 1);
    this.commentsSubscription = this.articleService.getComments(parseInt(id)).subscribe({
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
