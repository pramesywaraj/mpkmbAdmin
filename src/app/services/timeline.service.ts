import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ConfigService } from './config.service';
import { Observable, throwError, BehaviorSubject } from 'rxjs';

import { retry, catchError, map, delay } from 'rxjs/operators';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class TimelineService {

  userToken: any;

  constructor(private http: HttpClient, private config: ConfigService, public auth: AuthService) {
    this.userToken = this.auth.loadToken();
  }

  public postTimeline(form) {
    let header = new HttpHeaders();
    header = header.append('Content-type', 'application/json');
    header = header.append('Authorization', 'Bearer ' + this.userToken);


    return this.http.post<any>(
      this.config.baseUrl + 'timeline/create', JSON.stringify(form), {headers: header})
      .pipe(
        map(
          resp => {
            return resp;
          }
        ),
        catchError(err => {
          console.log('This error inside the timeline service and postTimeline function...', err);
          return throwError(err);
        })
      );
  }

  public getTimeline() {
    return this.http.get<any>(
      this.config.baseUrl + 'timeline/list')
      .pipe(
        map(
          resp => {
            return resp;
          }
        ),
        catchError(err => {
          console.log('This error inside the timeline service and getTimeline function...', err);
          return throwError(err);
        })
      );
  }

  public editTimeline(form, id) {
    let header = new HttpHeaders();
    header = header.append('Content-type', 'application/json');
    header = header.append('Authorization', 'Bearer ' + this.userToken);


    return this.http.post<any>(
      this.config.baseUrl + 'timeline/edit/' + id, JSON.stringify(form), {headers: header})
      .pipe(
        map(
          resp => {
            return resp;
          }
        ),
        catchError(err => {
          console.log('This error inside the timeline service and postTimeline function...', err);
          return throwError(err);
        })
      );
  }

  public deleteTimeline(id) {
    return this.http.delete<any>(
      this.config.baseUrl + 'timeline/delete/' + id)
      .pipe(
        map(
          resp => {
            return resp;
          }
        ),
        catchError(err => {
          console.log('This error inside the timeline service and deleteTimeline function...', err);
          return throwError(err);
        })
      );
  }
}
