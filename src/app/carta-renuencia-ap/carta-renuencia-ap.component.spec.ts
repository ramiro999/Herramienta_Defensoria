import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CartaRenuenciaApComponent } from './carta-renuencia-ap.component';

describe('CartaRenuenciaApComponent', () => {
  let component: CartaRenuenciaApComponent;
  let fixture: ComponentFixture<CartaRenuenciaApComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CartaRenuenciaApComponent]
    });
    fixture = TestBed.createComponent(CartaRenuenciaApComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
