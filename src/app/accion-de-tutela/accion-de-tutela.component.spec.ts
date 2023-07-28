import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AccionDeTutelaComponent } from './accion-de-tutela.component';

describe('AccionDeTutelaComponent', () => {
  let component: AccionDeTutelaComponent;
  let fixture: ComponentFixture<AccionDeTutelaComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AccionDeTutelaComponent]
    });
    fixture = TestBed.createComponent(AccionDeTutelaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
