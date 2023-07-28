import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CartaConstitucionComponent } from './carta-constitucion.component';

describe('CartaConstitucionComponent', () => {
  let component: CartaConstitucionComponent;
  let fixture: ComponentFixture<CartaConstitucionComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CartaConstitucionComponent]
    });
    fixture = TestBed.createComponent(CartaConstitucionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
