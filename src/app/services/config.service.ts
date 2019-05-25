import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ConfigService {

  baseUrl: string;
  httpOptions: any;

  constructor() {
    this.baseUrl = 'http://localhost:3056/';
    // this.baseUrl = 'http://backend-mpkmb.codepanda.id/';
    this.httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    }
  }

  
}
