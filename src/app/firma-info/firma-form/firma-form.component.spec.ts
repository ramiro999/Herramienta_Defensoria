import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FirmaFormComponent } from './firma-form.component';

describe('FirmaFormComponent', () => {
  let component: FirmaFormComponent;
  let fixture: ComponentFixture<FirmaFormComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FirmaFormComponent]
    });
    fixture = TestBed.createComponent(FirmaFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
