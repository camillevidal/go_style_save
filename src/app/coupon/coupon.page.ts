import { Component, OnInit } from '@angular/core';
import { Observable } from "rxjs"
import { Coupon } from '../types';
import { CouponService } from '../coupon.service';
import { ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-coupon',
  templateUrl: './coupon.page.html',
  styleUrls: ['./coupon.page.scss'],
})
export class CouponPage {
  couponDetail: Coupon
  description: string
  start: string
  end: string
  code_value: String
  nbreUtilisation: number
  reduction: Number
  devise: String


  constructor(couponService: CouponService, activatedRoute: ActivatedRoute) {
    const COUPONID = activatedRoute.snapshot.params["couponId"]
    couponService.getCoupon(COUPONID).subscribe(res => {
      this.code_value = res.code_value
      this.description = res.description
      this.start = res.startDate
      this.end = res.endDate
      this.nbreUtilisation = res.nbUtilisation
      this.devise = res.devise
      this.reduction = res.reductionAmount
    })

  }
  
}



