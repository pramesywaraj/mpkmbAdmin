import { Component, OnInit } from '@angular/core';
import { TaskService } from '../../../services/task.service';

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.scss']
})
export class TaskComponent implements OnInit {

  categories: any;
  nameInput = {
    name: ''
  };

  constructor(public task: TaskService) { }

  ngOnInit() {
    this.task.getCategory().subscribe(data => {
      if(data.status == 200) {
        this.categories = data.categories;
        console.log(this.categories);
      }
    });
  }

  private addCategoryAction() {
    console.log(this.nameInput);
    if(this.nameInput.name) {
      this.task.addCategory(this.nameInput).subscribe(data => {
        alert('Kategori berhasil ditambahkan!');
      },
      err => console.log(err)
      );
    }
  }

  private editCategory(id) {
    
  }

}
