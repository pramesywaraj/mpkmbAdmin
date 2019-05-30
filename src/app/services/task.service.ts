import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ConfigService } from './config.service';
import { Observable, throwError, BehaviorSubject } from 'rxjs';

import { retry, catchError, map, delay } from 'rxjs/operators';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class TaskService {

  userToken: any;

  private categorySource = new BehaviorSubject(null);
  currentCategory = this.categorySource.asObservable();

  constructor(private http: HttpClient, private config: ConfigService, public auth: AuthService) {
    this.userToken = this.auth.loadToken();
  }

  public addCategory(category): Observable<any> {
    let header = new HttpHeaders();
    header = header.append('Content-type', 'application/json');
    header = header.append('Authorization', 'Bearer ' + this.userToken);


    return this.http.post<any>(
      this.config.baseUrl + 'category/create', JSON.stringify(category), {headers: header})
      .pipe(
        map(
          resp => {
            return resp;
          }
        ),
        catchError(err => {
          console.log('This error inside the task service and addCategory function...', err);
          return throwError(err);
        })
      );
  }

  public getCategory(): Observable<any> {
    return this.http.get<any>(
      this.config.baseUrl + 'category/get?isPopulate=true')
      .pipe(
        map(
          resp => {
            return resp;
          }
        ),
        catchError(err => {
          console.log('This error inside the task service and getCategory function...', err);
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
          console.log('This error inside the task service and editCategory function...', err);
          return throwError(err);
        })
      );
  }

  public createTask(tasks): Observable<any> {
    let header = new HttpHeaders();
    header = header.append('Authorization', 'Bearer ' + this.userToken);

    return this.http.post<any>(
      this.config.baseUrl + 'task/create', tasks, {headers: header})
      .pipe(
        map(
          resp => {
            return resp;
          }
        ),
        catchError(err => {
          console.log('This error inside the task service and addTask function...', err);
          return throwError(err);
        })
      );
  }


  public deleteTask(id): Observable<any> {
    let header = new HttpHeaders();
    header = header.append('Authorization', 'Bearer ' + this.userToken);


    return this.http.delete<any>(
      this.config.baseUrl + 'task/delete/' + id, {headers: header})
      .pipe(
        map(
          resp => {
            return resp;
          }
        ),
        catchError(err => {
          console.log('This error inside the task service and deleteTask function...', err);
          return throwError(err);
        })
      );
  }

  public setCategoryData(category) {
    this.categorySource.next(category);
  }
}
