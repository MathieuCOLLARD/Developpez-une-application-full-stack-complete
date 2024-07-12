import { User } from 'src/app/interfaces/user.interface';
import { UserService } from '../../services/user.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { RootTopic, Topic } from 'src/app/interfaces/topic.interface';
import { TopicsService } from 'src/app/services/topics.service';
import { map, mergeMap, switchMap } from 'rxjs/operators';

@Component({
    selector: 'app-profile',
    templateUrl: './profile.component.html',
    styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
    public hide = true;
    public topics: Topic[] = [];
    public user: User = {
        id: 0,
        email: '',
        username: '',
        topics: []
    }

    public form = this.fb.group({
        email: [
          '',
          [
            Validators.required,
            Validators.email
          ]
        ],
        username: [
          '',
          [
            Validators.required,
            Validators.min(3),
            Validators.max(20)
          ]
        ]
      });

    constructor(private userService: UserService,
        private fb: FormBuilder,
        private topicService: TopicsService) { }

    ngOnInit(): void {
        this.getUserInformationsAndTopics();
    }

    private getUserInformationsAndTopics(): void {
        this.userService.me().pipe(
            mergeMap((user: User) => {
                this.user = user;
                return this.topicService.getAll().pipe(
                    map((topics: RootTopic) => topics.topics),
                    map((topics: Topic[]) => topics.filter(topic => this.user.topics.some(userTopic => userTopic.id === topic.id)))
                );
            })
        ).subscribe({
            next: (filteredTopics: Topic[]) => {
                this.topics = filteredTopics;
            },
            error: error => console.error(error)
        });
    }

    public disconnect(): void {    
        localStorage.removeItem('token');
        window.location.reload();
    }

    public updateUser(): void {
        this.userService.updateMe(this.user).subscribe({
            next: () => this.getUserInformationsAndTopics(),
            error: error => console.error(error)
        });
    }

    public unsubscribeTopic(topicID: number) {
        this.topicService.unsubscribe(topicID).subscribe({
            next: () => {
                console.log('Unsubscribed from topic');
                this.getUserInformationsAndTopics();
                this.updateFilteredTopics();
            },
            error: error => console.error(error)
        });
    }

    private updateFilteredTopics(): void {
        const filteredTopics = this.topics.filter(topic => this.user.topics.some(userTopic => userTopic.id === topic.id));
        this.topics = filteredTopics;
    }
}
