import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { RootTopic } from '../interfaces/topic.interface';

@Injectable({
  providedIn: 'root'
})
export class TopicsService {

  private pathService = 'api/topics';

  constructor(private httpClient: HttpClient) { }

  public getAll(): Observable<RootTopic> {
    return this.httpClient.get<RootTopic>(`${this.pathService}`);
  }

  public subscribe(topicID: number): Observable<void> {
    return this.httpClient.post<void>(`${this.pathService}/${topicID}/subscribe`, {});
  }

  public unsubscribe(topicID: number): Observable<void> {
    return this.httpClient.post<void>(`${this.pathService}/${topicID}/unsubscribe`, {});
  }

}
