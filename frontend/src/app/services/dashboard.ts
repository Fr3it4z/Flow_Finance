import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

// Totais do mês corrente
export interface DashboardSummary {
  total_income: number;
  total_expenses: number;
  net_savings: number;
}

// Despesas do mês agrupadas por categoria
export interface CategorySpending {
  category: string;
  icon: string | null;
  amount: number;
  percentage: number;
}

export interface DashboardCategory {
  id: number;
  name: string;
  type: string;
  icon: string | null;
}

// Transação tal como é devolvida pelo TransactionResource
export interface DashboardTransaction {
  id: number;
  category_id: number;
  amount: string; // cast decimal do Laravel → chega como string
  date: string;
  description: string | null;
  type: 'income' | 'expense';
  category?: DashboardCategory;
}

// Resposta de GET /api/dashboard
export interface DashboardData {
  summary: DashboardSummary;
  spending_by_category: CategorySpending[];
  recent_activity: DashboardTransaction[];
}

@Injectable({
  providedIn: 'root',
})
export class DashboardService {
  private http = inject(HttpClient);
  private apiUrl = 'http://localhost:8000/api';

  // O header Authorization é tratado pelo AuthInterceptor
  getDashboard(): Observable<DashboardData> {
    return this.http.get<DashboardData>(`${this.apiUrl}/dashboard`);
  }
}
