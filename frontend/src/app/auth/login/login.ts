import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-login',
  imports: [
    ReactiveFormsModule,
    RouterLink,
  ],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class Login {
  loginForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', Validators.required),
  });

  private authService = inject(AuthService);
  private router = inject(Router);
  errorMessage = '';

  onSubmit() {
    if (this.loginForm.invalid) return;

    this.errorMessage = '';

    const { email, password } = this.loginForm.value;

    this.authService.login(email!, password!).subscribe({
      next: (response: any) => {
        this.authService.saveToken(response.access_token);
        this.authService.saveRefreshToken(response.refresh_token);
        this.router.navigate(['/todo/tasks']);
      },
      error: (err: any) => {
        this.errorMessage = err.error?.message || 'Erro ao registrar usuário.';
      }
    });
  }
}
