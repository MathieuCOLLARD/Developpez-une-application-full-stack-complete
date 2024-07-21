import { User } from 'src/app/interfaces/user.interface';
import { UserService } from '../../services/user.service';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { RootTopic, Topic } from 'src/app/interfaces/topic.interface';
import { TopicsService } from 'src/app/services/topics.service';
import { map, mergeMap } from 'rxjs/operators';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
/**
 * Represents the profile component.
 */
export class ProfileComponent implements OnInit, OnDestroy {
    public hide = true;
    public topics: Topic[] = [];
    public user: User = {
        id: 0,
        email: '',
        username: '',
        topics: []
    };

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
                Validators.minLength(3),
                Validators.maxLength(20)
            ]
        ]
    });

    // Subscriptions
    private userSubscription: Subscription | undefined;
    private topicSubscription: Subscription | undefined;
    private updateSubscription: Subscription | undefined;
    private unsubscribeSubscription: Subscription | undefined;

    constructor(
        private userService: UserService,
        private fb: FormBuilder,
        private topicService: TopicsService
    ) {}

    ngOnInit(): void {
        this.getUserInformationsAndTopics();
    }

    /**
     * Get user informations and topics.
     * @returns void
     */
    private getUserInformationsAndTopics(): void {
        this.userSubscription = this.userService.me().pipe(
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

    /**
     * Disconnect the user.
     * @returns void
     */
    public disconnect(): void {
        localStorage.removeItem('token');
        window.location.reload();
    }

    /**
     * Update the user.
     * @returns void
     */
    public updateUser(): void {
        this.updateSubscription = this.userService.updateMe(this.user).subscribe({
            next: () => this.getUserInformationsAndTopics(),
            error: error => console.error(error)
        });
    }

    /**
     * Unsubscribe from a topic.
     * @param topicID - The ID of the topic to unsubscribe from.
     * @returns void
     */
    public unsubscribeTopic(topicID: number): void {
        this.unsubscribeSubscription = this.topicService.unsubscribe(topicID).subscribe({
            next: () => {
                console.log('Unsubscribed from topic');
                this.getUserInformationsAndTopics();
                this.updateFilteredTopics();
            },
            error: error => console.error(error)
        });
    }

    /**
     * Update the filtered topics based on the user's subscribed topics.
     * @returns void
     */
    private updateFilteredTopics(): void {
        const filteredTopics = this.topics.filter(topic => this.user.topics.some(userTopic => userTopic.id === topic.id));
        this.topics = filteredTopics;
    }

    ngOnDestroy(): void {
        // Unsubscribe to avoid memory leaks
        this.userSubscription?.unsubscribe();
        this.topicSubscription?.unsubscribe();
        this.updateSubscription?.unsubscribe();
        this.unsubscribeSubscription?.unsubscribe();
    }
}
