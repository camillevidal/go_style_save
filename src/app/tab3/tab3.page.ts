import { Component, OnInit } from '@angular/core';
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
	couponList: any

	//coupon
	description: String
	code_value: String
	end: String
	start: String


	constructor(couponService: CouponService) {
		this.couponService = couponService
		this.couponList = []
		let currentUser = localStorage.getItem("login");
		this.couponService.getCouponsByUser(currentUser).subscribe(value => {
			this.couponByUserList = value
			console.log("current user"+currentUser)
			if (currentUser != "" || currentUser != null) {
				this.couponByUserList.forEach(coupon => {
					if (coupon.idUser == currentUser) {
						this.idCoupon = coupon.idCoupon
						this.couponService.getCoupon(this.idCoupon).subscribe(result => {

							this.couponList.push(result)



						})
					}
				})
			}
			
			else {
				//si l'utilisateur est null
				alert("erreur lors de la récupèration de l'utilisateur")
			}
			console.log("len"+this.couponList.length)
		})
	}
}



