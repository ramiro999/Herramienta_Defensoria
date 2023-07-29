import { TestBed } from '@angular/core/testing';

import { DocgeneratorService } from './docgenerator.service';

describe('DocgeneratorService', () => {
  let service: DocgeneratorService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DocgeneratorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
