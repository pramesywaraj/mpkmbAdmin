import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-appsidemenu',
  templateUrl: './appsidemenu.component.html',
  styleUrls: ['./appsidemenu.component.scss']
})
export class AppsidemenuComponent implements OnInit {

  constructor(
    private router: Router
  ) { }

  ngOnInit() {
  }

}
