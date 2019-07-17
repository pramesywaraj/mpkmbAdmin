import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Alert } from 'selenium-webdriver';
import { Router } from '@angular/router';

@Component({
  selector: 'app-appheader',
  templateUrl: './appheader.component.html',
  styleUrls: ['./appheader.component.scss']
})
export class AppheaderComponent implements OnInit {

  constructor(private auth: AuthService, public router: Router) { }

  ngOnInit() {
  }

  public logout() {
    this.auth.logout();
    alert('Anda berhasil keluar.');
    this.router.navigate(['/login']);
  }

}
