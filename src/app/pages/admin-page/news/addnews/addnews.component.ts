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

  coverImageLabel: string = 'Pilih Gambar...';
  bodyImageLabel: string = 'Pilih Gambar...';
  otherImageLabel: string = 'Pilih Gambar...';

  coverImageName: string;
  bodyImageName: string;
  otherImageName: string;


  coverImage: FormGroup;
  bodyImage: FormGroup;
  otherImage: FormGroup;

  promises: Promise<Blob>[] = [];

  constructor(public auth: AuthService, public news: NewsService, public formBuilder: FormBuilder, public router: Router) { }

  ngOnInit() {
    // init the news form
    this.coverImage = this.formBuilder.group({
      coverImages: ['']
    });

    this.bodyImage = this.formBuilder.group({
      bodyImage: ['']
    });

    this.otherImage = this.formBuilder.group({
      otherImage: [''],
      description: ''
    });
  }

  // fungsi untuk mengganti preview gambar utama dan gambar body
  detectImage(event, type) {
    console.log(event.target.files);
    if(event.target.files.length > 0) {
      let file = event.target.files;

      this.promises.push(compressor.compress(file, {quality: .5}));
  
      let temp = Promise.all(this.promises)
        .then(file => {
          if(type == 'cover')
            this.setCoverImage(file);
          else if(type == 'body')
            this.setBodyImage(file);
        }
      );
    }      
  }

  detectImages(event) {
    console.log(event.target.files);
    if(event.target.files.length > 0) {
      let file = event.target.files;

      for(let i = 0; i < file.length; i++) {
        this.promises.push(compressor.compress(file, {quality: .5}));
      }      

      let temp = Promise.all(this.promises)
        .then(file => {
          this.setOtherImage(file);
        }
      );
    }   
  }
  

  changeInputLabel (file: any[], type) {
    const reader = new FileReader();
    if(type == 'cover') {
      reader.onload = e => this.coverImageLabel = reader.result as string;
      this.fileInput = file[0].name;
      reader.readAsDataURL(file[0]);  
    }
      
  }

  changeInputLabelOtherImage (file: any[]) {
    const reader = new FileReader();
    reader.onload = e => this.bodyImageLabel = reader.result as string;
    // this.fileInput = file[0].name;
    reader.readAsDataURL(file[0]);    
  }

  setCoverImage(file) {
    this.coverImage.get('coverImages').setValue(file);
    // this.changeInputLabelCoverImage(file);
  }

  setBodyImage(file) {
    this.bodyImage.get('bodyImage').setValue(file);
    // this.changeInputLabelImage(file);
  }

  setOtherImage(file: any[]) {
    this.otherImage.get('otherImage').setValue(file);
  }

  addBerita(form) {
    let temp = form.value;
    // console.log(this.uploadData);

    const formData = new FormData();
    formData.append('title', temp.title);
    formData.append('summary', temp.summary);
    formData.append('body', temp.body1);
    formData.append('body', temp.body2);
    formData.append('body', temp.body3);    
    formData.append('snippet', temp.snippet);
    formData.append('coverImages', this.coverImage.get('coverImages').value);

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

    console.log('tetot');
    
  }

}
