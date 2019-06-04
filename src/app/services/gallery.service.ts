import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ConfigService } from './config.service';
import { Observable, throwError } from 'rxjs';

import { retry, catchError, map, delay } from 'rxjs/operators';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class GalleryService {

  userToken: any;

  constructor(private http: HttpClient, private config: ConfigService, public auth: AuthService) {
    this.userToken = this.auth.loadToken();
  }

  public getVideosList(): Observable<any> {
    return this.http.get<any>(
      this.config.baseUrl + 'galery/video/list'
    ).pipe(
      map(
        resp => {
          return resp;
        }
      ),
      catchError(err => {
        console.log('This error inside the gallery service and getVideosList function...', err);
        return throwError(err);
      })
    ); 
  }
}
