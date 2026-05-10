import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth';

export const authGuard = (): boolean => {
  const authService = inject(AuthService);
  const router = inject(Router);
  
  // Verifica se o utilizador tem um token válido guardado
  if (authService.hasToken()) {
    return true; // Autenticado - acesso concedido
  }
  
  // Não autenticado - redireciona para login
  router.navigate(['/login']);
  return false;
};