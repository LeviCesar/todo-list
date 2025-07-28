import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  // imports: [],
  templateUrl: './login.html',
  styleUrl: './login.css',
  standalone: false,
})
export class Login {
  loginForm: FormGroup;

  constructor(private fb: FormBuilder) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
    })
  }

  onSubmit() {
    if (this.loginForm.valid) {
      const { email, password } = this.loginForm.value;
      console.log('Login with:', email, password);
      // enviar para serviço de autenticação
    }
  }
}
