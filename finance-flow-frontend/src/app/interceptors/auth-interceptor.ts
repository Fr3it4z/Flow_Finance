import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(
    private authService: AuthService,
    private router: Router
  ) { }

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    // Adicionar token a todas as requisições se existir
    const token = localStorage.getItem('finance_token');
    if (token) {
      request = request.clone({
        setHeaders: {
          Authorization: `Bearer ${token}`
        }
      });
    }

    return next.handle(request).pipe(
      catchError((error: HttpErrorResponse) => {
        // Se receber erro 401 (não autorizado), o token expirou
        if (error.status === 401) {
          console.warn('Token expirou ou é inválido');
          
          // Limpar token expirado
          localStorage.removeItem('finance_token');
          this.authService.updateAuthStatus(false);
          
          // Redirecionar para login
          this.router.navigate(['/login']);
          
          alert('Sessão expirada. Por favor, faça login novamente.');
        }

        return throwError(() => error);
      })
    );
  }
}
