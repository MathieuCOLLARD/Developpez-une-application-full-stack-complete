import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../interfaces/user.interface';

@Injectable({
  providedIn: 'root'
})

export class UserService {

  private pathService = 'api/me';

  constructor(private httpClient: HttpClient) { }

  public me(): Observable<User> {
    return this.httpClient.get<User>(`${this.pathService}`);
  }

  public updateMe(me: User): Observable<void> {
    return this.httpClient.put<void>(`${this.pathService}`, me);
  }

}