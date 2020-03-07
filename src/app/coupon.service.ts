import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from "@angular/common/http"
import { Observable, throwError } from 'rxjs';
import { Coupon } from './types';
import { CouponByUser } from './couponByUser';
import { catchError, tap, map } from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export class CouponService {


  constructor(private http: HttpClient) { }

  //recup une seule observable activité 
  getCoupon(id: Number): Observable<Coupon> {
    console.log("okay")
    return this.http.get<Coupon>("http://109.11.21.53:9996/api/coupon/" + id.toString(),optionRequete).pipe(
      tap(data => console.log('coupon by id: ' + JSON.stringify(data))),
      catchError(this.handleError)
    );
    
    


  }
  getCoupons(): Observable<Coupon[]> {
    return this.http.get<Coupon[]>(API, optionRequete).pipe(
      tap(data => console.log('All: ' + JSON.stringify(data))),
      catchError(this.handleError)
    );
  }
  getCouponsByUser(): Observable<CouponByUser[]> {
    return this.http.get<CouponByUser[]>("http://109.11.21.53:9996/api/couponbyuser/all",optionRequete ).pipe(
      tap(data => console.log('All coupons by user: ' + JSON.stringify(data))),
      catchError(this.handleError)
    )

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
}
const API = "http://109.11.21.53:9996/api/coupon/all";
const x = btoa("user:password")
const optionRequete = {
  headers: new HttpHeaders({ 
    'Authorization': 'Basic '+x
    
    
  })};