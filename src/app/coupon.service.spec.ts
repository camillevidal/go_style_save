import { TestBed } from '@angular/core/testing';

import { CouponService } from './coupon.service';

describe('ActivityService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: CouponService = TestBed.get(CouponService);
    expect(service).toBeTruthy();
  });
});
