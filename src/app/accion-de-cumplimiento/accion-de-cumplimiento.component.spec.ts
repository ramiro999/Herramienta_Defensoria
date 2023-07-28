import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AccionDeCumplimientoComponent } from './accion-de-cumplimiento.component';

describe('AccionDeCumplimientoComponent', () => {
  let component: AccionDeCumplimientoComponent;
  let fixture: ComponentFixture<AccionDeCumplimientoComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AccionDeCumplimientoComponent]
    });
    fixture = TestBed.createComponent(AccionDeCumplimientoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
