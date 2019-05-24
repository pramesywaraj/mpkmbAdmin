import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ConfigService {

  baseUrl: string;

  constructor() {
    this.baseUrl = 'http://localhost:3056/';
  }
}
