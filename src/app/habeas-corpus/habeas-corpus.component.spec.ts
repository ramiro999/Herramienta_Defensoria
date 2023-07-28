import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HabeasCorpusComponent } from './habeas-corpus.component';

describe('HabeasCorpusComponent', () => {
  let component: HabeasCorpusComponent;
  let fixture: ComponentFixture<HabeasCorpusComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [HabeasCorpusComponent]
    });
    fixture = TestBed.createComponent(HabeasCorpusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
