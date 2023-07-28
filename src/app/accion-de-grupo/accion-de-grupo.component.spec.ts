import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AccionDeGrupoComponent } from './accion-de-grupo.component';

describe('AccionDeGrupoComponent', () => {
  let component: AccionDeGrupoComponent;
  let fixture: ComponentFixture<AccionDeGrupoComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AccionDeGrupoComponent]
    });
    fixture = TestBed.createComponent(AccionDeGrupoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
