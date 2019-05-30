import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ConfigService } from './config.service';
import { Observable, throwError, BehaviorSubject } from 'rxjs';

import { retry, catchError, map, delay } from 'rxjs/operators';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class StoreService {

  userToken: any;

  constructor(private http: HttpClient, private config: ConfigService, public auth: AuthService) {
    this.userToken = this.auth.loadToken();
  }

  public addGoods(goods): Observable<any> {
    let header = new HttpHeaders();
    header = header.append('Authorization', 'Bearer ' + this.userToken);
    return this.http.post<any>(
      this.config.baseUrl + 'store/create', goods, {headers: header})
      .pipe(
        map(
          resp => {
            return resp;
          }
        ),
        catchError(err => {
          console.log('This error inside the store service and addGoods function...', err);
          return throwError(err);
        })
      );
  }

  public getGoods(): Observable<any> {
    return this.http.get<any>(
      this.config.baseUrl + 'store/gets?page=1&limit=50')
      .pipe(
        map(
          resp => {
            return resp;
          }
        ),
        catchError(err => {
          console.log('This error inside the store service and getGoods function...', err);
          return throwError(err);
        })
      );
  }

  public editCategory(category, id): Observable<any> {
    let header = new HttpHeaders();
    header = header.append('Content-type', 'application/json');
    header = header.append('Authorization', 'Bearer ' + this.userToken);
    
    return this.http.post<any>(
      this.config.baseUrl + 'category/edit/' + id, JSON.stringify(category), {headers: header})
      .pipe(
        map(
          resp => {
            return resp;
          }
        ),
        catchError(err => {
          console.log('This error inside the store service and editCategory function...', err);
          return throwError(err);
        })
      );
  }

  public deleteGoods(id): Observable<any> {
    let header = new HttpHeaders();
    header = header.append('Authorization', 'Bearer ' + this.userToken);

    return this.http.delete<any>(
      this.config.baseUrl + 'store/delete/' + id, {headers: header})
      .pipe(
        map(
          resp => {
            return resp;
          }
        ),
        catchError(err => {
          console.log('This error inside the store service and deleteStore function...', err);
          return throwError(err);
        })
      );
  }
}
