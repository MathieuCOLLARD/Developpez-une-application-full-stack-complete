import { Component, OnDestroy } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { SessionInformation } from 'src/app/interfaces/sessionInformation.interface';
import { SessionService } from 'src/app/services/session.service';
import { LoginRequest } from '../../../interfaces/loginRequest.interface';
import { AuthService } from '../../../services/auth.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss', '../auth.component.scss']
})
export class LoginComponent implements OnDestroy {
  public hide = true;
  public onError = false;

  public form = this.fb.group({
    email: [
      '',
      [
        Validators.required,
        Validators.email
      ]
    ],
    password: [
      '',
      [
        Validators.required,
        Validators.min(3)
      ]
    ]
  });

  // Subscription
  private loginSubscription: Subscription | undefined;

  constructor(
    private authService: AuthService,
    private fb: FormBuilder,
    private router: Router,
    private sessionService: SessionService
  ) {}

  /**
   * Submit the login form
   * @returns void
   */
  public submit(): void {
    const loginRequest = this.form.value as LoginRequest;
    this.loginSubscription = this.authService.login(loginRequest).subscribe({
      next: (response: SessionInformation) => {
        this.sessionService.logIn(response);
        this.router.navigate(['/articles']);
      },
      error: error => this.onError = true,
    });
  }

  /**
   * Redirect to the home page
   * @returns void
   */
  public goBack(): void {
    this.router.navigate(['/']);
  }

  ngOnDestroy(): void {
    // Unsubscribe to avoid memory leaks
    this.loginSubscription?.unsubscribe();
  }
}
