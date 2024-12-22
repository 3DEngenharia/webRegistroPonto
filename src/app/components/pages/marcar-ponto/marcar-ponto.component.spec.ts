import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MarcarPontoComponent } from './marcar-ponto.component';

describe('MarcarPontoComponent', () => {
  let component: MarcarPontoComponent;
  let fixture: ComponentFixture<MarcarPontoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MarcarPontoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MarcarPontoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
