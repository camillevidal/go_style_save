import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from "@angular/common/http"
import { Observable, throwError } from 'rxjs';
import { Coupon } from './types';
import { CouponByUser } from './couponByUser';
import { catchError, tap, map } from 'rxjs/operators';
import { AlertController } from '@ionic/angular';
@Injectable({
    providedIn: 'root'
})
export class CouponService {


    constructor(private http: HttpClient, private alert: AlertController) { }

    //recup une seule observable activité 
    getCoupon(id: Number): Observable<Coupon> {
      return this.http.get<Coupon>("http://109.11.21.53:9996/api/coupon/" + id, optionRequete).pipe(
      tap(data => null),
      catchError(this.handleError)
    );
    }

    getCoupons(): Observable<Coupon[]> {
        return this.http.get<Coupon[]>(API, optionRequete).pipe(
            tap(data => null),
            catchError(this.handleError)
        );
    }

    getCouponsByUser(): Observable<CouponByUser[]> {
        return this.http.get<CouponByUser[]>("http://109.11.21.53:9996/api/couponbyuser/all", optionRequete).pipe(
            tap(data => null),
            catchError(this.handleError)
        )
    }

    checkCouponByUser(idUser): Observable<Coupon[]> {
        return this.http.get<Coupon[]>("http://109.11.21.53:9996/api/coupon/spec/" + idUser, optionRequete).pipe(
            tap(data => null),
            catchError(this.handleError)
        )
    }

    addCouponByuser(idUser, idCoupon): Observable<Object> {
        console.log("ADD BY USER : " + idUser + " " + idCoupon)
        let URL = "http://109.11.21.53:9996/api/couponbyuser/add?idUser=" + idUser + "&idCoupon=" + idCoupon
        return this.http.post(URL, {}, optionRequetePost);
    }

    private handleError(err: HttpErrorResponse) {

        let errorMessage = '';
        if (err.error instanceof ErrorEvent) {

            errorMessage = `An error occurred: ${err.error.message}`;
        } else {

            errorMessage = `Server returned code: ${err.status}, error message is: ${err.message}`;
        }
        console.error(errorMessage);
        return throwError(errorMessage);
    }


    async alertCouponid(id) {
        const alert = await this.alert.create({
            header: 'Alert',
            subHeader: 'Subtitle',
            message: "id = " + id,
            buttons: ['OK']
        });

        await alert.present();
    }
}

const API = "http://109.11.21.53:9996/api/coupon/all";
const x = btoa("DR567Kle_i:2Kjl9-(kl")
const optionRequete = {
    headers: new HttpHeaders({
        'Authorization': 'Basic ' + x


    })
};

const optionRequetePost = {
    responseType: 'text' as 'json',
    headers: new HttpHeaders({
        'Authorization': 'Basic ' + x
    })
};