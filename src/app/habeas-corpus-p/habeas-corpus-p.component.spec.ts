import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HabeasCorpusPComponent } from './habeas-corpus-p.component';

describe('HabeasCorpusPComponent', () => {
  let component: HabeasCorpusPComponent;
  let fixture: ComponentFixture<HabeasCorpusPComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [HabeasCorpusPComponent]
    });
    fixture = TestBed.createComponent(HabeasCorpusPComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
