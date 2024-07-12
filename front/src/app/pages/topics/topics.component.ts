import { UserService } from './../../services/user.service';
import { Component } from '@angular/core';
import { map, mergeMap } from 'rxjs';
import { RootTopic, Topic } from 'src/app/interfaces/topic.interface';
import { User } from 'src/app/interfaces/user.interface';
import { TopicsService } from 'src/app/services/topics.service';

@Component({
  selector: 'app-topics',
  templateUrl: './topics.component.html',
  styleUrls: ['./topics.component.scss']
})
export class TopicsComponent {

  public topics: Topic[] = [];

  public user: User = {
    id: 0,
    email: '',
    username: '',
    topics: []
  } 

  constructor(private topicService: TopicsService, private userService: UserService) { }

  ngOnInit(): void {
    this.getUserInformationsAndTopics();
  }

  private getUserInformationsAndTopics(): void {
    this.topicService.getAll().pipe(
      mergeMap((rootTopic: RootTopic) => {
        return this.userService.me().pipe(
          map((user: User) => {
            this.user = user;
            return rootTopic.topics.filter(topic => !this.user.topics.some(userTopic => userTopic.id == topic.id));
          })
        );
      })
    ).subscribe({
        next: (filteredTopics: Topic[]) => {
            console.log(filteredTopics);
            this.topics = filteredTopics;
        },
        error: error => console.error(error)
    });
}

  public subscribeTopic(topicID: number) {
    this.topicService.subscribe(topicID).subscribe({
      next: () => console.log('Subscribed to topic'),
      error: error => console.error(error)
    });
  }
}