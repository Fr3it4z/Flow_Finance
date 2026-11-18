import { Component, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { CurrencyPipe, DatePipe } from '@angular/common';
import { catchError, of } from 'rxjs';
import { ToastrService } from 'ngx-toastr';

import { DashboardData, DashboardService } from '../../services/dashboard';

@Component({
  selector: 'app-dashboard',
  imports: [CurrencyPipe, DatePipe],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css',
})
export class Dashboard {
  private dashboardService = inject(DashboardService);
  private toastr = inject(ToastrService);

  // undefined → a carregar | null → erro | DashboardData → sucesso
  readonly data = toSignal<DashboardData | null | undefined>(
    this.dashboardService.getDashboard().pipe(
      catchError(() => {
        this.toastr.error('Não foi possível carregar o painel. Tenta novamente.');
        return of(null);
      }),
    ),
    { initialValue: undefined },
  );
}
