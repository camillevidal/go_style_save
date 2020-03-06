import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders,HttpErrorResponse} from "@angular/common/http"
import { Observable,throwError } from 'rxjs';
import { User } from './user';
import {catchError, tap, map} from 'rxjs/operators';
import { sha256} from 'js-sha256';
@Injectable({
  providedIn: 'root'
})
export class UserService {


  constructor(private http:HttpClient) { }

  //recup une seule observable activité 
  getUser(email:string):Observable<User>{
    return this.http.get<User>("http://109.11.21.53:9996/api/user/"+email,optionRequete).pipe(
      tap(data => console.log('Un utilisateur: ' + JSON.stringify(data))),
      catchError(this.handleError)
  )
}

  login(email): Observable<User>{
    return this.http.get<User>(`http://109.11.21.53:9996/api/user/${email}`,optionRequete);
  }

  register(email,fullName, password): Observable<User>{
    let hash = sha256.create();
    hash.update(password);
    hash.hex();
    let pass= hash.toString()
    return this.http.post<User>(`http://109.11.21.53:9996/api/user/add?email=${email}&fullname=${fullName}&password=${pass}`,({}));
  }

  getCoupons():Observable<User[]>{
    return this.http.get<User[]>(API,optionRequete).pipe(
      tap(data => console.log('All users: ' + JSON.stringify(data))),
      catchError(this.handleError)
  );
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
const API ="http://109.11.21.53:9996/api/user/all";
const x = btoa("user:password")
const optionRequete = {
  headers: new HttpHeaders({ 
    'Authorization': 'Basic '+x
    
    
  })};
