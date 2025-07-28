import { Routes } from '@angular/router';
import { Login } from './auth/login/login';
import { RegisterUser } from './auth/register-user/register-user';

export const routes: Routes = [
  {
    path: 'auth',
    children: [
      { path: 'login', component: Login },
      { path: 'register', component: RegisterUser },
    ],
  },
];
