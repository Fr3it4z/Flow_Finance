import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';

import { MainLayout } from './main-layout';

describe('MainLayout', () => {
  let fixture: ComponentFixture<MainLayout>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MainLayout],
      providers: [provideRouter([])],
    }).compileComponents();

    fixture = TestBed.createComponent(MainLayout);
    await fixture.whenStable();
  });

  it('deve mostrar os links de navegação', () => {
    const text: string = fixture.nativeElement.textContent;
    expect(text).toContain('Início');
    expect(text).toContain('Painel');
  });
});
