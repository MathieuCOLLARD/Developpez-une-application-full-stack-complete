import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {

  constructor(
    private router: Router) {
}

  public isLogged() : boolean {
    return localStorage.getItem('token') !== null;
  }
  
  public showArticles() : void {
    this.router.navigate(['/articles']);
  }

  public showTopics() : void {
    this.router.navigate(['/topics']);
  }

  public showProfile() : void {
    this.router.navigate(['/profile']);
  }

  public goBack() : void {
    this.router.navigate(['/']);
  }
}