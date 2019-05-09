import { TestBed } from '@angular/core/testing';

import { NgrxHocusService } from './ngrx-hocus.service';

describe('NgrxHocusService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: NgrxHocusService = TestBed.get(NgrxHocusService);
    expect(service).toBeTruthy();
  });
});
