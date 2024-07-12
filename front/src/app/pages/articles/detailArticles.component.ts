import { Component } from '@angular/core';
import { Article } from 'src/app/interfaces/article.interface';
import { ArticlesService } from '../../services/articles.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-detailArticles',
  templateUrl: './detailArticles.component.html',
  styleUrls: ['./detailArticles.component.scss']
})
export class DetailArticlesComponent {
  public article: Article = {
    id: 0,
    title: '',
    content: '',
    author: '',
    comments: [],
    createdAt: '',
    topicTitle: 0
  };

  commentForm: FormGroup;

  constructor(
    private articleService: ArticlesService,
    private formBuilder: FormBuilder
  ) {
    this.commentForm = this.formBuilder.group({
      comment: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    const url = window.location.href;
    const id = url.substring(url.lastIndexOf('/') + 1);
    this.articleService.getArticleByID(parseInt(id)).subscribe({
      next: (article: Article) => this.article = article,
      error: error => console.error(error)
    });
  }

  addComment(): void {
    const url = window.location.href;
    const id = url.substring(url.lastIndexOf('/') + 1);

    if (this.commentForm.valid) {
      const comment = this.commentForm.get('comment')?.value;
      console.log(this.article);
      this.articleService.addComment(id, comment).subscribe({
        next: () => {
          console.log('Comment added successfully');
          this.articleService.getArticleByID(this.article.id).subscribe({
            next: (article: Article) => this.article = article,
            error: error => console.error(error)
          });
        },
        error: error => console.error('Error adding comment', error)
      });
    }
  }
}
