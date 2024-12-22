import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AutenticarFuncionarioComponent } from './autenticar-funcionario.component';

describe('AutenticarFuncionarioComponent', () => {
  let component: AutenticarFuncionarioComponent;
  let fixture: ComponentFixture<AutenticarFuncionarioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AutenticarFuncionarioComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AutenticarFuncionarioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
