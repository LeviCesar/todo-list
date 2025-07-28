import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Login } from './login/login';
import { RegisterUser } from './register-user/register-user';
import { RouterLink } from '@angular/router';



@NgModule({
  declarations: [
    Login, 
    RegisterUser,
  ],
  imports: [
    CommonModule,
    RouterLink,
  ]
})
export class AuthModule { }
