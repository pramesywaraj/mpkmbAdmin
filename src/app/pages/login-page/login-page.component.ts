import { Component, OnInit, OnDestroy } from '@angular/core';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss']
})
export class LoginPageComponent implements OnInit, OnDestroy {

  bodyClasses = 'skin-blue sidebar-mini';
  body: HTMLBodyElement = document.getElementsByTagName('body')[0];
  checkbox_icheck: HTMLElement = document.getElementById('checkbox_icheck');


  constructor() { }

  ngOnInit() {
    this.body.classList.add('hold-transition');
    this.body.classList.add('login-page');
  }

  ngOnDestroy() {
    // remove the the body classes
    this.body.classList.remove('hold-transition');
    this.body.classList.remove('login-page');
  }


}
