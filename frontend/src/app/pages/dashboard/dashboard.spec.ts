import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { ToastrService } from 'ngx-toastr';

import { Dashboard } from './dashboard';
import { DashboardData } from '../../services/dashboard';

const mockData: DashboardData = {
  summary: { total_income: 1500, total_expenses: 400, net_savings: 1100 },
  spending_by_category: [{ category: 'Supermercado', icon: '🛒', amount: 400, percentage: 100 }],
  recent_activity: [
    {
      id: 1,
      category_id: 1,
      amount: '400.00',
      date: '2026-11-05',
      description: 'Compras da semana',
      type: 'expense',
      category: { id: 1, name: 'Supermercado', type: 'expense', icon: '🛒' },
    },
  ],
};

describe('Dashboard', () => {
  let component: Dashboard;
  let fixture: ComponentFixture<Dashboard>;
  let httpMock: HttpTestingController;
  const toastr = { error: vi.fn() };

  beforeEach(async () => {
    toastr.error.mockClear();

    await TestBed.configureTestingModule({
      imports: [Dashboard],
      providers: [
        provideHttpClient(),
        provideHttpClientTesting(),
        { provide: ToastrService, useValue: toastr },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(Dashboard);
    component = fixture.componentInstance;
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => httpMock.verify());

  it('deve mostrar os dados devolvidos pela API', () => {
    httpMock.expectOne((req) => req.url.endsWith('/dashboard')).flush(mockData);
    fixture.detectChanges();

    const text: string = fixture.nativeElement.textContent;
    expect(component.data()).toEqual(mockData);
    expect(text).toContain('Supermercado');
    expect(text).toContain('Compras da semana');
  });

  it('deve mostrar um toast quando o pedido falha', () => {
    httpMock
      .expectOne((req) => req.url.endsWith('/dashboard'))
      .flush(null, { status: 500, statusText: 'Server Error' });
    fixture.detectChanges();

    expect(component.data()).toBeNull();
    expect(toastr.error).toHaveBeenCalled();
  });
});
