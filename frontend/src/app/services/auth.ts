import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, tap } from 'rxjs';

export interface LoginRequest {
  email: string;
  password: string;
}

export interface RegisterRequest {
  name: string;
  email: string;
  password: string;
}

export interface AuthResponse {
  token: string; // O backend deve devolver um token
  user?: any;
}

@Injectable({
  providedIn: 'root',
})
export class AuthService {

  // URL base para a API de autenticação
  private apiUrl = 'http://127.0.0.1:8000/api';

  private isAuthenticatedSubject = new BehaviorSubject<boolean>(this.hasToken());
  public isAuthenticated$ = this.isAuthenticatedSubject.asObservable();

  //Injetar o construtor HttpClient para fazer requisições HTTP
  constructor(private http: HttpClient) { }

  public hasToken(): boolean {
    return !!localStorage.getItem('finance_token');
  }

  // Método para atualizar status de autenticação (usado pelo interceptor)
  public updateAuthStatus(isAuthenticated: boolean): void {
    this.isAuthenticatedSubject.next(isAuthenticated);
  }

  login(dadosLogin: LoginRequest): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(`${this.apiUrl}/login`, dadosLogin).pipe(
      tap((replyBackend) => {
        // O operador 'tap' executa este bloco SE o backend responder com sucesso
        console.log('Login com sucesso, a guardar token...');

        // Guardamos o passe VIP
        localStorage.setItem('finance_token', replyBackend.token);

        // Avisamos a app toda que o utilizador entrou!
        this.isAuthenticatedSubject.next(true);
      })
    );
  }

  register(dadosRegistro: RegisterRequest): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(`${this.apiUrl}/register`, dadosRegistro).pipe(
      tap((replyBackend) => {
        console.log('Registo bem-sucedido, a guardar token...');

        // Guardamos o token recebido do backend
      localStorage.setItem('finance_token', replyBackend.token);

        // Avisamos a app toda que o utilizador entrou!
        this.isAuthenticatedSubject.next(true);
      })
    );
  }


  logout(): Observable<any> {
    return this.http.post(`${this.apiUrl}/logout`, {}).pipe(
      tap(() => {
        // Se o backend confirmar o logout, limpamos a casa
        localStorage.removeItem('finance_token');
        this.isAuthenticatedSubject.next(false);
      })
    );
  }
}
