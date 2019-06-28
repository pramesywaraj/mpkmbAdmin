import { Component, OnInit, OnDestroy } from '@angular/core';
import { TaskService } from '../../../services/task.service';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.scss']
})
export class TaskComponent implements OnInit, OnDestroy {

  private subscription: Subscription;

  categories = [];
  nameInput = {
    name: ''
  };

  constructor(public task: TaskService, public router: Router) { }

  ngOnInit() {
    this.subscription = this.task.getCategory().subscribe(data => {
      if(data.status == 200) {
        this.categories = data.categories;
        console.log(this.categories);
      }
    });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  private addCategoryAction() {
    console.log(this.nameInput);
    if(this.nameInput.name) {
      this.task.addCategory(this.nameInput).subscribe(data => {
        alert('Kategori berhasil ditambahkan!');
        this.ngOnInit();
      },
      err => console.log(err)
      );
    }
  }

  private editCategory(name, id) {
    let nameChange = prompt('Silahkan masukan nama kelompok lain', name);
    if(nameChange) {

      let input = {
        name: nameChange
      };

      this.task.editCategory(input, id).subscribe(data => {
        alert('Nama kelompok berhasil diubah.');
        this.ngOnInit(); 
      });


    } else {
      alert('Nama kelompok tidak berhasil diubah.');
    }
  }

}
