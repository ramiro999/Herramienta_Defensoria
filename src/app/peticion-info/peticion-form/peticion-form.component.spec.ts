import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PeticionFormComponent } from './peticion-form.component';

describe('PeticionFormComponent', () => {
  let component: PeticionFormComponent;
  let fixture: ComponentFixture<PeticionFormComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PeticionFormComponent]
    });
    fixture = TestBed.createComponent(PeticionFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
