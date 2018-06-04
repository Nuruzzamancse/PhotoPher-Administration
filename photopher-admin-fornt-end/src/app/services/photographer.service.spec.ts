import { TestBed, inject } from '@angular/core/testing';

import { PhotographerService } from './photographer.service';

describe('PhotographerService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [PhotographerService]
    });
  });

  it('should be created', inject([PhotographerService], (service: PhotographerService) => {
    expect(service).toBeTruthy();
  }));
});
