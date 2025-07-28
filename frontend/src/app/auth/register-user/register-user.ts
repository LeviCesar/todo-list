import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-register-user',
  // imports: [],
  templateUrl: './register-user.html',
  styleUrl: './register-user.css',
  standalone: false,
})
export class RegisterUser {
  registerForm: FormGroup;

  constructor(private fb: FormBuilder) {
    this.registerForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
      passwordConfirm: ['', Validators.required],
    })
  }

  onSubmit() {
    if (this.registerForm.valid) {
      const { email, password, passwordConfirm } = this.registerForm.value;
      if (password != passwordConfirm) {
        console.error('senhas não dão match')
      }
      
      console.log('New Account:', email, password);
      // enviar para serviço de autenticação
    }
  }
}
