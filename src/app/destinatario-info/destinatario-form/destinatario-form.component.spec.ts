import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DestinatarioFormComponent } from './destinatario-form.component';

describe('DestinatarioFormComponent', () => {
  let component: DestinatarioFormComponent;
  let fixture: ComponentFixture<DestinatarioFormComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DestinatarioFormComponent]
    });
    fixture = TestBed.createComponent(DestinatarioFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
