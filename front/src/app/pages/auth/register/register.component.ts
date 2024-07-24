import { Component, OnDestroy } from '@angular/core';
import { AbstractControl, FormBuilder, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../../services/auth.service';
import { RegisterRequest } from '../../../interfaces/registerRequest.interface';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss', '../auth.component.scss']
})
export class RegisterComponent implements OnDestroy {

  public onError = false;
  public showRequirements = false;

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
    ],
    password: [
      '',
      [
        Validators.required,
        Validators.minLength(8),
        Validators.maxLength(40),
        this.passwordValidator()
      ]
    ]
  });

  // Subscription
  private registerSubscription: Subscription | undefined;

  constructor(
    private authService: AuthService,
    private fb: FormBuilder,
    private router: Router
  ) {}

  /**
   * Submit the register form
   * @returns void
   */
  public submit(): void {
    const registerRequest = this.form.value as RegisterRequest;
    this.registerSubscription = this.authService.register(registerRequest).subscribe({
      next: (_: void) => this.router.navigate(['/login']),
      error: _ => this.onError = true,
    });
  }

  /**
   * Redirect to the home page
   * @returns void
   */
  public goBack(): void {
    this.router.navigate(['/']);
  }

  /**
   * Show password requirements
   * @returns void
   */
  public showPasswordRequirements(): void {
    this.showRequirements = true;
  }

  /**
   * Hide password requirements
   * @returns void
   */
  public hidePasswordRequirements(): void {
    this.showRequirements = false;
  }

  public passwordValidator(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const value = control.value;
  
      if (!value) {
        return null;
      }
  
      const hasUpperCase = /[A-Z]+/.test(value);
      const hasLowerCase = /[a-z]+/.test(value);
      const hasNumeric = /[0-9]+/.test(value);
      const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]+/.test(value);
  
      const passwordValid = hasUpperCase && hasLowerCase && hasNumeric && hasSpecialChar;
  
      return !passwordValid ? { passwordStrength: true } : null;
    };
  }

  ngOnDestroy(): void {
    // Unsubscribe to avoid memory leaks
    this.registerSubscription?.unsubscribe();
  }
}
