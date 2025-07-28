import { Routes } from '@angular/router';
import { Login } from './auth/login/login';
import { RegisterUser } from './auth/register-user/register-user';
import { Tasks } from './todo/tasks/tasks';
import { authGuard } from './auth-guard';

export const routes: Routes = [
  {
    path: 'auth',
    children: [
      { path: 'login', component: Login },
      { path: 'register', component: RegisterUser },
    ],
  },
  {
    path: 'todo',
    children: [
      { path: 'tasks', component: Tasks},
    ],
    canActivate: [authGuard],
  }
];
