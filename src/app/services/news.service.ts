import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ConfigService } from './config.service';
import { Observable, throwError } from 'rxjs';

import { retry, catchError, map, delay } from 'rxjs/operators';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class NewsService {

  userToken: any;

  constructor(private http: HttpClient, private config: ConfigService, public auth: AuthService) {
    this.userToken = this.auth.loadToken();
  }

  public addNews(news): Observable<any> {
    let header = new HttpHeaders();
    // header = header.append('Content-type', 'multipart/form-data');
    header = header.append('Authorization', 'Bearer ' + this.userToken);

    console.log('beritea', news);

    return this.http.post<any>(
      this.config.baseUrl + 'news/create', news, {headers: header})
      .pipe(
        map(
          resp => {
            return resp;
          }
        ),
        catchError(err => {
          console.log('This error inside the news service and addNews function...', err);
          return throwError(err);
        })
      );
  }

  public getNews(): Observable<any> {
    return this.http.get<any>(
      this.config.baseUrl + 'news/gets?page=1&limit=50&sort=-1'
    ).pipe(
      map(
        resp => {
          return resp;
        }
      ),
      catchError(err => {
        console.log('This error inside the news service and getNews function...', err);
        return throwError(err);
      })
    ); 
  }

  public deleteNews(id): Observable<any> {
    let header = new HttpHeaders();
    header = header.append('Authorization', 'Bearer ' + this.userToken);
    return this.http.delete<any>(
      this.config.baseUrl + 'news/delete/' + id, {headers: header}
    ).pipe(
      map(
        resp => {
          return resp;
        }
      ),
      catchError(err => {
        console.log('This error inside the news service and deleteNews function...', err);
        return throwError(err);
      })
    );
  }

  public getNewsDetail(id): Observable<any> {
    return this.http.get<any>(
      this.config.baseUrl + 'news/get/' + id
    ).pipe(
      map(
        resp => {
          return resp;
        }
      ),
      catchError(err => {
        console.log('This error inside the news service and getNewsDetail function...', err);
        return throwError(err);
      })
    ); 
  }

  
}
