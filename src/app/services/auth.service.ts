import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ConfigService } from './config.service';
import { Observable, throwError } from 'rxjs';

import { retry, catchError, map } from 'rxjs/operators';
import { User } from '../class/user';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  userToken = null;

  constructor(private http: HttpClient, private config: ConfigService) { }

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  }

  public login(user): Observable<any> {
    return this.http.post<any>(
      this.config.baseUrl + 'auth/login', JSON.stringify(user), this.httpOptions)
      .pipe(
        map(user => {
          if(user.status == 200) {
            this.storeToken(user.token);
          }
          return user;
        })
      )
  }

  public logout() {
    this.userToken = null;
    localStorage.removeItem("token");
  }

  public storeToken(token) {
    window.localStorage.setItem('token', JSON.stringify(token));
    this.userToken = token;
  }

  // public loadToken() {
  //   let token = JSON.parse(window)
  // }

  // Error handling 
  handleError(error) {
    let errorMessage = '';
    if(error.error instanceof ErrorEvent) {
    // Get client-side error
    errorMessage = error.error.message;
    } else {
    // Get server-side error
    errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    window.alert(errorMessage);
    return throwError(errorMessage);
  }
}
