import { Topic } from './../../interfaces/topic.interface';
import { Article } from 'src/app/interfaces/article.interface';
import { ArticlesService } from '../../services/articles.service';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TopicsService } from 'src/app/services/topics.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-newArticle',
  templateUrl: './newArticle.component.html',
  styleUrls: ['./newArticle.component.scss']
})
export class NewArticleComponent implements OnInit, OnDestroy {

  public article: Article = {
    title: '',
    content: '',
    topicTitle: 0,
  };

  public topic: Topic = {
    id: 0,
    title: '',
    description: '',
    createdAt: ''
  };

  public topics: string[] = [];

  // Subscriptions
  private createArticleSubscription: Subscription | undefined;
  private getTopicsSubscription: Subscription | undefined;

  constructor(
    private articleService: ArticlesService,
    private topicService: TopicsService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.getTopics();
  }

  /**
   * Create a new article
   * @returns void
   */
  public createArticle(): void {
    this.createArticleSubscription = this.articleService.create(this.article).subscribe(() => {
      this.router.navigate(['/articles']);
    });
  }

  /**
   * Get all topics
   * @returns void
   */
  public getTopics(): void {
    this.getTopicsSubscription = this.topicService.getAll().subscribe((data) => {
      this.topics = data.topics.map((topic) => topic.title);
    });
  }

  /**
   * Redirect to the articles page
   * @returns void
   */
  public goBack(): void {
    this.router.navigate(['/articles']);
  }

  ngOnDestroy(): void {
    // Unsubscribe to avoid memory leaks
    this.createArticleSubscription?.unsubscribe();
    this.getTopicsSubscription?.unsubscribe();
  }
}
