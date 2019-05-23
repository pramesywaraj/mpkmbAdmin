import { Component, OnInit, OnDestroy } from '@angular/core';

@Component({
  selector: 'app-admin-page',
  templateUrl: './admin-page.component.html',
  styleUrls: ['./admin-page.component.scss']
})
export class AdminPageComponent implements OnInit, OnDestroy {

  bodyClasses = 'skin-green-light sidebar-mini';
  body: HTMLBodyElement = document.getElementsByTagName('body')[0];

  constructor() { }

  ngOnInit() {
    this.body.classList.add('skin-green-light');
    this.body.classList.add('sidebar-mini');
  }

  ngOnDestroy() {
    // remove the the body classes
    this.body.classList.remove('skin-green-light');
    this.body.classList.remove('sidebar-mini');
  }
}
