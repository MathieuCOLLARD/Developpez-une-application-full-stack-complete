import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { filter, Subscription } from 'rxjs';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit, OnDestroy {
  profileImageSrc: string = '/assets/user.svg';
  private routerSubscription: Subscription | undefined;

  constructor(private router: Router) {}

  ngOnInit(): void {
    // Initialisation de l'URL de l'image en fonction de l'URL actuelle
    this.updateProfileImage();

    // Observer les changements de navigation pour mettre à jour l'URL de l'image
    this.routerSubscription = this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe(() => {
      this.updateProfileImage();
    });
  }

  /**
   * Met à jour l'URL de l'image du profil en fonction de l'URL actuelle
   * @returns void
   */
  private updateProfileImage(): void {
    this.profileImageSrc = this.router.url === '/profile'
      ? '/assets/user_selected.svg'
      : '/assets/user.svg';
  }

  /**
   * Vérifie si l'utilisateur est connecté
   * @returns boolean
   */
  public isLogged(): boolean {
    return localStorage.getItem('token') !== null;
  }

  /**
   * Redirige vers la page des articles
   * @returns void
   */
  public showArticles(): void {
    this.router.navigate(['/articles']);
  }

  /**
   * Redirige vers la page des sujets
   * @returns void
   */
  public showTopics(): void {
    this.router.navigate(['/topics']);
  }

  /**
   * Redirige vers la page de profil
   * @returns void
   */
  public showProfile(): void {
    this.router.navigate(['/profile']);
  }

  /**
   * Redirige vers la page d'accueil
   * @returns void
   */
  public goBack(): void {
    this.router.navigate(['/']);
  }

  /**
   * Vérifie si la route est active
   * @param route
   * @returns boolean
   */
  public isActiveRoute(route: string): boolean {
    return this.router.url === route;
  }

  ngOnDestroy(): void {
    this.routerSubscription?.unsubscribe();
  }
}
