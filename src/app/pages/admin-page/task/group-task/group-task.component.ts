import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { TaskComponent } from '../task.component';
import { TaskService } from '../../../../services/task.service';
import { Router } from '@angular/router';

declare var ImageCompressor: any;
const compressor = new ImageCompressor();

@Component({
  selector: 'app-group-task',
  templateUrl: './group-task.component.html',
  styleUrls: ['./group-task.component.scss']
})
export class GroupTaskComponent implements OnInit {

  onlyCategory: any;
  categoryTask = [];
  promises: Promise<Blob>;

  compressedImage: any;


  constructor(private task: TaskService, private router: Router) { }

  ngOnInit() {
    this.task.currentCategory.subscribe(
      obj => {
        if(obj != null) {
          this.onlyCategory = obj.category;
          this.categoryTask = obj.tasks;
        } else {
          this.router.navigate(['admin/penugasan']);
        }
      }
    );

    console.log('category', this.onlyCategory);
    console.log('tasks', this.categoryTask);
    
  }

  detectImage(event) {
    if(event.target.files.length > 0) {
      let file = event.target.files[0];

      this.promises = compressor.compress(file, {quality: .5});
  
      let temp = Promise.resolve(this.promises)
        .then(file => {
          this.compressedImage = file;
        }
      );
    }      
  }


  public addTask(form) {
    let temp = form.value;
    console.log('this form', temp);

    const formData = new FormData();
    formData.append('title', temp.taskTitle);
    formData.append('categoryId', this.onlyCategory._id);
    formData.append('description', temp.taskDesc);
    formData.append('img', this.compressedImage);
    formData.append('url', temp.taskLink);
    
    this.task.createTask(formData).subscribe(data => {
      console.log('EX', data);
      if(data.status == 201) {
        alert('Tugas berhasil dibuat.');
        this.router.navigate(['admin/penugasan']);
      }
    });
  }

  public deleteTask(id) {
    if(confirm('Apakah anda yakin untuk menghapus tugas ini?')) {
      this.task.deleteTask(id).subscribe(data => {
        if(data.status == 200) {
          alert('Tugas berhasil dihapus.');
          this.router.navigateByUrl('/', {skipLocationChange: true}).then(()=>
            this.router.navigate(["admin/penugasan"])
          ); 
        }
      });
    }
    
  }

}
