import { Topic } from './../../interfaces/topic.interface';
import { Article } from 'src/app/interfaces/article.interface';
import { ArticlesService } from '../../services/articles.service';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { TopicsService } from 'src/app/services/topics.service';

@Component({
  selector: 'app-newArticle',
  templateUrl: './newArticle.component.html',
  styleUrls: ['./newArticle.component.scss']
})
export class NewArticleComponent {

  public article: Article = {
    title: '',
    content: '',
    author: '',
    comments: [],
    createdAt: '',
    topicTitle: 0,
    id: 0
  }
  public topic: Topic = {
    id: 0,
    title: '',
    description: '',
    createdAt: ''
  }
  public topics: string[] = [];

  constructor(private articleService: ArticlesService,
    private topicService: TopicsService,
    private router: Router) { }


  ngOnInit(): void {
    this.getTopics();
  }

  public createArticle() {
    this.articleService.create(this.article).subscribe(() => {
      this.router.navigate(['/articles']);
    });
  
  }

  public getTopics() {
    this.topicService.getAll().subscribe((data) => {
      this.topics = data.topics.map((topic) => topic.title);
    });
  }


}