import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ConfigService {

  baseUrl: string;
  newsImageUrl: string;

  httpOptions: any;

  constructor() {
    this.baseUrl = 'http://localhost:3056/';
    this.newsImageUrl = 'http://localhost:3056/news/image/';
    // this.baseUrl = 'http://backend-mpkmb.codepanda.id/';
    this.httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    }
  }

  
}
