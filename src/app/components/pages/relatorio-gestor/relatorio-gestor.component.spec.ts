import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RelatorioGestorComponent } from './relatorio-gestor.component';

describe('RelatorioGestorComponent', () => {
  let component: RelatorioGestorComponent;
  let fixture: ComponentFixture<RelatorioGestorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RelatorioGestorComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RelatorioGestorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
