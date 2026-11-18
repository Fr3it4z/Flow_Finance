import { Routes } from '@angular/router';
import { Welcome } from './pages/welcome/welcome';
import { Login } from './pages/login/login';
import { Register } from './pages/register/register';
import { Dashboard } from './pages/dashboard/dashboard';
import { authGuard } from './guards/auth-guard';
import { Home } from './pages/home/home';
import { MainLayout } from './layout/main-layout/main-layout';

export const routes: Routes = [
  { path: 'login', component: Login }, // Rota para a página de login
  { path: 'register', component: Register }, // Rota para a página de registro
  { path: '', component: Welcome, pathMatch: 'full' },

  // Páginas privadas: partilham a sidebar do MainLayout e são protegidas pelo guard
  {
    path: '',
    component: MainLayout,
    canActivate: [authGuard],
    children: [
      { path: 'home', component: Home },
      { path: 'dashboard', component: Dashboard },
    ],
  },
];
