import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CartaRenuenciaAcComponent } from './carta-renuencia-ac.component';

describe('CartaRenuenciaAcComponent', () => {
  let component: CartaRenuenciaAcComponent;
  let fixture: ComponentFixture<CartaRenuenciaAcComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CartaRenuenciaAcComponent]
    });
    fixture = TestBed.createComponent(CartaRenuenciaAcComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
