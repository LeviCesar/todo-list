import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-register-user',
  imports: [
    ReactiveFormsModule,
    RouterLink,
  ],
  templateUrl: './register-user.html',
  styleUrl: './register-user.css',
})
export class RegisterUser {
  registerForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', Validators.required),
  });

  private authService = inject(AuthService);
  private router = inject(Router);
  errorMessage = '';

  onSubmit() {
    if (this.registerForm.invalid) return;

    this.errorMessage = '';

    const { email, password } = this.registerForm.value;

    this.authService.registerUser(email!, password!).subscribe({
      next: () => {
        this.router.navigate(['/auth/login']);
      },
      error: (err: any) => {
        this.errorMessage = err.error?.message || 'Erro ao registrar usuário.';
      },
    });
  }
}
