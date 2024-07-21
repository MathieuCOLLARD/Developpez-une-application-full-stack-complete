import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { SessionInformation } from '../interfaces/sessionInformation.interface';

@Injectable({
  providedIn: 'root'
})
export class SessionService {

  public isLogged = false;
  public sessionInformation: SessionInformation | undefined;

  private isLoggedSubject = new BehaviorSubject<boolean>(this.isLogged);

  /**
   * Returns an observable that emits the login status of the user.
   * @returns {Observable<boolean>} An observable emitting the user's login status.
   */
  public $isLogged(): Observable<boolean> {
    return this.isLoggedSubject.asObservable();
  }

  /**
   * Logs in the user and sets the session information.
   * @param user - The session information of the user.
   * @returns void
   */
  public logIn(user: SessionInformation): void {
    this.sessionInformation = user;
    this.isLogged = true;
    this.next();
    if(user != null) {
      localStorage.setItem('token', user.token);
    }
  }

  /**
   * Removes session data from local storage.
   * @returns void
   */
  public removeDataFromLocalStorage(): void {
    localStorage.removeItem('token');
  }

  /**
   * Logs out the user, clears the session information, and updates the login status.
   * @returns void
   */
  public logOut(): void {
    this.sessionInformation = undefined;
    this.isLogged = false;
    this.next();
    this.removeDataFromLocalStorage();
  }

  private next(): void {
    this.isLoggedSubject.next(this.isLogged);
  }
}
