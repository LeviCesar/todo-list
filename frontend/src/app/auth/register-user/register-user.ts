import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterLink } from '@angular/router';

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

  onSubmit() {
    if (this.registerForm.valid) {
      const { email, password } = this.registerForm.value;
      console.log('Login with:', email, password);
      // enviar para serviço de autenticação
    }
  }
}
