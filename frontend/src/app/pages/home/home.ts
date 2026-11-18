import { Component, LOCALE_ID, computed, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { CurrencyPipe, formatDate } from '@angular/common';
import { catchError, of } from 'rxjs';
import { ToastrService } from 'ngx-toastr';

import { DashboardData, DashboardService } from '../../services/dashboard';

// Número máximo de linhas por cartão, para a página caber no ecrã sem scroll
const MAX_CATEGORIES = 5;

// Cores das barras, atribuídas pela posição da categoria (a BD ainda não guarda cores)
const CATEGORY_COLORS = ['#f97316', '#3b82f6', '#ec4899', '#eab308', '#a855f7'];

@Component({
  selector: 'app-home',
  imports: [CurrencyPipe],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class Home {
  private dashboardService = inject(DashboardService);
  private toastr = inject(ToastrService);
  private locale = inject(LOCALE_ID);

  // undefined → a carregar | null → erro | DashboardData → sucesso
  readonly data = toSignal<DashboardData | null | undefined>(
    this.dashboardService.getDashboard().pipe(
      catchError(() => {
        this.toastr.error('Não foi possível carregar o resumo. Tenta novamente.');
        return of(null);
      }),
    ),
    { initialValue: undefined },
  );

  // A API já devolve as categorias ordenadas da maior para a menor despesa
  readonly topCategories = computed(() =>
    (this.data()?.spending_by_category ?? []).slice(0, MAX_CATEGORIES).map((item, index) => ({
      ...item,
      color: CATEGORY_COLORS[index % CATEGORY_COLORS.length],
    })),
  );

  readonly recentActivity = computed(() =>
    (this.data()?.recent_activity ?? []).map((transaction) => ({
      ...transaction,
      dateLabel: this.dateLabel(transaction.date),
    })),
  );

  // "Hoje", "Ontem" ou a data (dd/MM/yyyy)
  private dateLabel(date: string): string {
    const day = new Date(`${date.slice(0, 10)}T00:00:00`);
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const diffDays = Math.round((today.getTime() - day.getTime()) / 86_400_000);
    if (diffDays === 0) return 'Hoje';
    if (diffDays === 1) return 'Ontem';
    return formatDate(day, 'dd/MM/yyyy', this.locale);
  }
}
