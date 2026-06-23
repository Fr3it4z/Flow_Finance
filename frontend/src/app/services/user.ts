import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private http = inject(HttpClient);
  private apiUrl = 'http://localhost:8000/api';

/*   getProfile(): Observable<any> {
    // 🛑 O TEU CÓDIGO AQUI: 
    // Faz o return de um pedido GET para a rota certa do teu Laravel
    // Exemplo do que falta: return this.http.???<any>(...);
  } */
}