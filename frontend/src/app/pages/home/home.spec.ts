import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { ToastrService } from 'ngx-toastr';

import { Home } from './home';
import { CategorySpending, DashboardData } from '../../services/dashboard';

const today = new Date();
const todayIso = `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, '0')}-${String(today.getDate()).padStart(2, '0')}`;

const categories: CategorySpending[] = ['A', 'B', 'C', 'D', 'E', 'F'].map((name, i) => ({
  category: `Categoria ${name}`,
  icon: null,
  amount: 100 - i * 10,
  percentage: 20 - i,
}));

const mockData: DashboardData = {
  summary: { total_income: 1500, total_expenses: 400, net_savings: 1100 },
  spending_by_category: categories,
  recent_activity: [
    {
      id: 1,
      category_id: 1,
      amount: '12.50',
      date: todayIso,
      description: 'Almoço',
      type: 'expense',
      category: { id: 1, name: 'Restauração', type: 'expense', icon: '🍔' },
    },
  ],
};

describe('Home', () => {
  let component: Home;
  let fixture: ComponentFixture<Home>;
  let httpMock: HttpTestingController;
  const toastr = { error: vi.fn() };

  beforeEach(async () => {
    toastr.error.mockClear();

    await TestBed.configureTestingModule({
      imports: [Home],
      providers: [
        provideHttpClient(),
        provideHttpClientTesting(),
        { provide: ToastrService, useValue: toastr },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(Home);
    component = fixture.componentInstance;
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => httpMock.verify());

  it('deve mostrar no máximo 5 categorias, cada uma com cor', () => {
    httpMock.expectOne((req) => req.url.endsWith('/dashboard')).flush(mockData);
    fixture.detectChanges();

    expect(component.topCategories().length).toBe(5);
    expect(component.topCategories().every((c) => !!c.color)).toBe(true);
    expect(fixture.nativeElement.textContent).not.toContain('Categoria F');
  });

  it('deve mostrar "Hoje" para transações do próprio dia', () => {
    httpMock.expectOne((req) => req.url.endsWith('/dashboard')).flush(mockData);
    fixture.detectChanges();

    expect(component.recentActivity()[0].dateLabel).toBe('Hoje');
    expect(fixture.nativeElement.textContent).toContain('Almoço');
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
