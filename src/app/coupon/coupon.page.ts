import { Component, OnInit } from '@angular/core';
import { Observable} from "rxjs"
import { Coupon } from '../types';
import { CouponService } from '../coupon.service';
import { ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-coupon',
  templateUrl: './coupon.page.html',
  styleUrls: ['./coupon.page.scss'],
})
export class CouponPage implements OnInit {
  couponDetail:Observable <Coupon>
  description:string
  dateDebut:string
  dateFin:string
  code:Number
  

  constructor(couponService:CouponService,activatedRoute:ActivatedRoute) { 
    const COUPONID = activatedRoute.snapshot.params["couponId"]
    
    this.couponDetail = couponService.getCoupon(COUPONID)
    this.couponDetail.forEach(element => {
      this.description = element.description
      this.dateDebut = element.startDate
      this.dateFin = element.endDate
      this.code = element.id
      
      
    })
    
  }
  

  ngOnInit() {
  }

}
