import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HistoricoFuncionarioComponent } from './historico-funcionario.component';

describe('HistoricoFuncionarioComponent', () => {
  let component: HistoricoFuncionarioComponent;
  let fixture: ComponentFixture<HistoricoFuncionarioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HistoricoFuncionarioComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HistoricoFuncionarioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
