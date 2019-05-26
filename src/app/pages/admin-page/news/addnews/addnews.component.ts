import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { AuthService } from '../../../../services/auth.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { NewsService } from '../../../../services/news.service';
import { Router } from '@angular/router';

declare var ImageCompressor: any;
const compressor = new ImageCompressor();

@Component({
  selector: 'app-addnews',
  templateUrl: './addnews.component.html',
  styleUrls: ['./addnews.component.scss']
})
export class AddnewsComponent implements OnInit {

  fileInput: string = 'Pilih Gambar...';
  primaryImage: string;

  uploadData: FormGroup;

  promises: Promise<Blob>[] = [];

  constructor(public auth: AuthService, public news: NewsService, public formBuilder: FormBuilder, public router: Router) { }

  ngOnInit() {
    // init the news form
    this.uploadData = this.formBuilder.group({
      title: '',
      summary: '',
      body: '',
      snippet: '',
      coverImages: ['']
    });
  }

  // fungsi untuk mengganti preview gambar utama
  detectFiles(event) {
    console.log(event.target.files);
    if(event.target.files.length > 0) {
      let file = event.target.files[0];

      // this.compressingImage(file);
      this.promises.push(compressor.compress(file, {quality: .5}));
    
      let temp = Promise.all(this.promises)
        .then(file => {
          this.setImage(file);
        }
      );

      // this.uploadData.get('coverImages').setValue(file);
    }   
  }

  changeInputLabelImage (file: any[]) {
    const reader = new FileReader();
    reader.onload = e => this.primaryImage = reader.result as string;
    this.fileInput = file[0].name;
    reader.readAsDataURL(file[0]);    
  }

  setImage(file: any[]) {
    this.uploadData.get('coverImages').setValue(file[0]);
    this.changeInputLabelImage(file);
  }

  addBerita(form) {
    let temp = form.value;
    // console.log(this.uploadData);

    const formData = new FormData();
    formData.append('title', temp.title);
    formData.append('summary', temp.summary);
    formData.append('body', temp.body);
    formData.append('snippet', temp.snippet);
    formData.append('coverImages', this.uploadData.get('coverImages').value);

    // console.log('cek',);
  
    this.news.addNews(formData).subscribe(
      data => {
        alert('Berita berhasil ditambahkan');
        this.router.navigate(['admin/berita']);
      },
      err => {
        console.log('err', err);
      }
    );
    
  }

}
