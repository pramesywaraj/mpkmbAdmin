import { Component, OnInit } from '@angular/core';
import { TaskComponent } from '../task.component';
import { TaskService } from '../../../../services/task.service';

@Component({
  selector: 'app-group-task',
  templateUrl: './group-task.component.html',
  styleUrls: ['./group-task.component.scss']
})
export class GroupTaskComponent implements OnInit {

  categoryTask: any;

  constructor(private task: TaskService) { }

  ngOnInit() {
    this.task.currentCategory.subscribe(
      obj => this.categoryTask = obj
    );
    console.log('detail task', this.categoryTask);
  }

}
