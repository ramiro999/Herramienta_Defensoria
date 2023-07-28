import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DerechoDePeticionComponent } from './derecho-de-peticion.component';

describe('DerechoDePeticionComponent', () => {
  let component: DerechoDePeticionComponent;
  let fixture: ComponentFixture<DerechoDePeticionComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DerechoDePeticionComponent]
    });
    fixture = TestBed.createComponent(DerechoDePeticionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
