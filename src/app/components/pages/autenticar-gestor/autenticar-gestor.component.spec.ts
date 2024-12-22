import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AutenticarGestorComponent } from './autenticar-gestor.component';

describe('AutenticarGestorComponent', () => {
  let component: AutenticarGestorComponent;
  let fixture: ComponentFixture<AutenticarGestorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AutenticarGestorComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AutenticarGestorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
