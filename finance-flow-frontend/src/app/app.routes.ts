import { Routes } from '@angular/router';
import { Welcome } from './pages/welcome/welcome';
import { Login } from './pages/login/login';
import { Register } from './pages/register/register';

export const routes: Routes = [
  { path: '', component: Welcome },
  { path: 'login', component: Login }, // Rota para a página de login
  { path: 'register', component: Register } // Rota para a página de registro
];
