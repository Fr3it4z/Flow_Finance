import { Routes } from '@angular/router';
import { Welcome } from './pages/welcome/welcome';
import { Login } from './pages/login/login';
import { Register } from './pages/register/register';
import { Dashboard } from './pages/dashboard/dashboard';
import { authGuard } from './guards/auth-guard';
import { Home } from './pages/home/home';

export const routes: Routes = [
  { path: 'login', component: Login }, // Rota para a página de login
  { path: 'register', component: Register }, // Rota para a página de registro
  
  { path: 'dashboard', component: Dashboard, canActivate: [authGuard] }, // O segurança fica posicionado aqui!
  { path: 'home',component: Home , canActivate: [authGuard] }, //Rota para página de home

  { path: '', component: Welcome }
];
