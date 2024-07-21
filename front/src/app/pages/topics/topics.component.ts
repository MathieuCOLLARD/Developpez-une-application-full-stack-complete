import { UserService } from './../../services/user.service';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { map, mergeMap, Subscription } from 'rxjs';
import { RootTopic, Topic } from 'src/app/interfaces/topic.interface';
import { User } from 'src/app/interfaces/user.interface';
import { TopicsService } from 'src/app/services/topics.service';

@Component({
  selector: 'app-topics',
  templateUrl: './topics.component.html',
  styleUrls: ['./topics.component.scss']
})
export class TopicsComponent implements OnInit, OnDestroy {

  public topics: Topic[] = [];

  public user: User = {
    id: 0,
    email: '',
    username: '',
    topics: []
  };

  // Subscriptions
  private userTopicsSubscription: Subscription | undefined;
  private subscribeSubscription: Subscription | undefined;

  constructor(private topicService: TopicsService, private userService: UserService) { }

  ngOnInit(): void {
    this.getUserInformationsAndTopics();
  }

  /**
   * Retrieves user information and topics that the user has not subscribed to.
   * @returns void
   */
  private getUserInformationsAndTopics(): void {
    this.userTopicsSubscription = this.topicService.getAll().pipe(
      mergeMap((rootTopic: RootTopic) => {
        return this.userService.me().pipe(
          map((user: User) => {
            this.user = user;
            return rootTopic.topics.filter(topic => !this.user.topics.some(userTopic => userTopic.id === topic.id));
          })
        );
      })
    ).subscribe({
      next: (filteredTopics: Topic[]) => {
        this.topics = filteredTopics;
      },
      error: error => console.error(error)
    });
  }

  /**
   * Subscribes the user to a topic.
   * @param topicID - The ID of the topic to subscribe to.
   */
  public subscribeTopic(topicID: number): void {
    this.subscribeSubscription = this.topicService.subscribe(topicID).subscribe({
      next: () => {
        this.getUserInformationsAndTopics();
      },
      error: error => console.error(error)
    });
  }

  ngOnDestroy(): void {
    // Unsubscribe to avoid memory leaks
    this.userTopicsSubscription?.unsubscribe();
    this.subscribeSubscription?.unsubscribe();
  }
}
