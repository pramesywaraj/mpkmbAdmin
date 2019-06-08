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

  public getPhotosList(): Observable<any> {
    return this.http.get<any>(
      this.config.baseUrl + 'galery/image/list'
    ).pipe(
      map(
        resp => {
          return resp;
        }
      ),
      catchError(err => {
        console.log('This error inside the gallery service and getPhotosList function...', err);
        return throwError(err);
      })
    ); 
  }
  
  public getCategories(): Observable<any> {
    return this.http.get<any>(
      this.config.baseUrl + 'galery/category/get'
    ).pipe(
      map(
        resp => {
          return resp;
        }
      ),
      catchError(err => {
        console.log('This error inside the gallery service and getCategories function...', err);
        return throwError(err);
      })
    ); 
  }


  public addVideo(video): Observable<any> {
    let header = new HttpHeaders();
    header = header.append('Content-Type', 'application/json');
    header = header.append('Authorization', 'Bearer ' + this.userToken);

    return this.http.post<any>(
      this.config.baseUrl + 'galery/video/create', JSON.stringify(video), {headers: header})
      .pipe(
        map(
          resp => {
            return resp;
          }
        ),
        catchError(err => {
          console.log('This error inside the gallery service and addVideo function...', err);
          return throwError(err);
        })
      );
  }

  public addPhoto(photo): Observable<any> {
    let header = new HttpHeaders();
    header = header.append('Content-Type', 'application/json');
    header = header.append('Authorization', 'Bearer ' + this.userToken);

    return this.http.post<any>(
      this.config.baseUrl + 'galery/image/create', JSON.stringify(photo), {headers: header})
      .pipe(
        map(
          resp => {
            return resp;
          }
        ),
        catchError(err => {
          console.log('This error inside the gallery service and addImage function...', err);
          return throwError(err);
        })
      );
  }

  public addCategory(category): Observable<any> {
    let header = new HttpHeaders();
    header = header.append('Content-Type', 'application/json');
    header = header.append('Authorization', 'Bearer ' + this.userToken);

    return this.http.post<any>(
      this.config.baseUrl + 'galery/category/create', JSON.stringify(category), {headers: header})
      .pipe(
        map(
          resp => {
            console.log('debug', resp);
            return resp;
          }
        ),
        catchError(err => {
          console.log('This error inside the gallery service and addCategory function...', err);
          return err;
        })
      );
  }

  public deleteVideo(videoId): Observable<any> {
    return this.http.delete<any>(
      this.config.baseUrl + 'galery/video/delete/' + videoId)
      .pipe(
        map(
          resp => {
            console.log('debug', resp);
            return resp;
          }
        ),
        catchError(err => {
          console.log('This error inside the gallery service and addCategory function...', err);
          return err;
        })
      );
  }

  
  public deletePhoto(photoId): Observable<any> {
    return this.http.delete<any>(
      this.config.baseUrl + 'galery/image/delete/' + photoId)
      .pipe(
        map(
          resp => {
            console.log('debug', resp);
            return resp;
          }
        ),
        catchError(err => {
          console.log('This error inside the gallery service and addCategory function...', err);
          return err;
        })
      );
  }

  public editPhoto(photoId, obj): Observable<any> {
    let header = new HttpHeaders();
    header = header.append('Content-Type', 'application/json');
    header = header.append('Authorization', 'Bearer ' + this.userToken);

    return this.http.post<any>(
      this.config.baseUrl + 'galery/image/edit/' + photoId, JSON.stringify(obj), {headers: header})
      .pipe(
        map(
          resp => {
            console.log('debug', resp);
            return resp;
          }
        ),
        catchError(err => {
          console.log('This error inside the gallery service and addCategory function...', err);
          return err;
        })
      );
  }

  public editVideo(videoId, obj): Observable<any> {
    let header = new HttpHeaders();
    header = header.append('Content-Type', 'application/json');
    header = header.append('Authorization', 'Bearer ' + this.userToken);

    return this.http.post<any>(
      this.config.baseUrl + 'galery/video/edit/' + videoId, JSON.stringify(obj), {headers: header})
      .pipe(
        map(
          resp => {
            console.log('debug', resp);
            return resp;
          }
        ),
        catchError(err => {
          console.log('This error inside the gallery service and addCategory function...', err);
          return err;
        })
      );
  }


}
