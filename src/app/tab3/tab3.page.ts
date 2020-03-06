import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { Coupon } from '../types';
import { CouponService } from '../coupon.service';
import { CouponByUser } from '../couponByUser';

@Component({
	selector: 'app-tab3',
	templateUrl: 'tab3.page.html',
	styleUrls: ['tab3.page.scss']
})
export class Tab3Page {

	//prop qui contient les données consommées
	coupons: Coupon
	idCoupon: Number
	unCoupon: Observable<Coupon>
	couponService: CouponService
	couponByUserList: CouponByUser[]
	couponList:any

	//coupon
	description: String

	constructor(couponService: CouponService) {
		this.couponService = couponService
		this.couponList =  this.afficheCouponsByUser()
	}
	afficheCouponsByUser() {
		//variable contenant tout les coupons
		let couponsList=[]
		this.couponService.getCouponsByUser().subscribe(value => {
			this.couponByUserList = value
			this.couponByUserList.forEach(coupon => {
				console.log(coupon.idUser)
				if (coupon.idUser == "camille@yopmail.com") {
					console.log("ookkaaayyyy")
					this.idCoupon = coupon.idCoupon
					console.log(this.idCoupon)
					this.couponService.getCoupon(this.idCoupon).subscribe(result => {

						this.couponList.push(result)
						console.log("coupon list"+couponsList)
						return couponsList

					})
				}
			})
		})
	}

}



