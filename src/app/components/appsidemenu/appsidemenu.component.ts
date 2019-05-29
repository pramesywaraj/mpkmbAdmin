import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { TaskService } from './../../services/task.service';

@Component({
  selector: 'app-appsidemenu',
  templateUrl: './appsidemenu.component.html',
  styleUrls: ['./appsidemenu.component.scss']
})
export class AppsidemenuComponent implements OnInit {

  categoryList : any;

  constructor(
    private router: Router,
    private task: TaskService
  ) { }

  ngOnInit() {
    this.task.getCategory().subscribe(data => {
      if(data.status == 200) {
        this.categoryList = data.categories;
      }
    });
  }

}
