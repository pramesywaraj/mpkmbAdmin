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
    // for development only
    // this.baseUrl = 'http://localhost:3056/';
    // this.newsImageUrl = 'http://localhost:3056/news/image/';

    //for production
    this.baseUrl = 'http://api.mpkmb.ipb.ac.id/';
    this.newsImageUrl = 'http://api.mpkmb.ipb.ac.id/news/image/';

    this.httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    }
  }

  
}
