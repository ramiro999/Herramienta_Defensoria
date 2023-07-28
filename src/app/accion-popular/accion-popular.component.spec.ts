import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AccionPopularComponent } from './accion-popular.component';

describe('AccionPopularComponent', () => {
  let component: AccionPopularComponent;
  let fixture: ComponentFixture<AccionPopularComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AccionPopularComponent]
    });
    fixture = TestBed.createComponent(AccionPopularComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
