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

  compressedImage: any;
  coverImageSrc: string;

  promises: Promise<Blob>[] = [];

  constructor(public auth: AuthService, public news: NewsService, public formBuilder: FormBuilder, public router: Router) { }

  ngOnInit() {
    // init the news form

    // this.bodyImage = this.formBuilder.group({
    //   bodyImage: ['']
    // });

    // this.otherImage = this.formBuilder.group({
    //   otherImage: [''],
    //   description: ''
    // });
  }

  // fungsi untuk mengganti preview gambar utama dan gambar body
  detectImage(event) {
    console.log('foto', event);
    if(event.target.files.length > 0) {
      
      let file = event.target.files[0];
      console.log('foto', file);
    
      this.promises = compressor.compress(file, {quality: .5});
  
      let temp = Promise.resolve(this.promises)
        .then(file => {
          this.compressedImage = file;
          this.changeInputLabel(file);
        }
      );
    }      
  }
  // detectImages(event) {
  //   console.log(event.target.files);
  //   if(event.target.files.length > 0) {
  //     let file = event.target.files;

  //     for(let i = 0; i < file.length; i++) {
  //       this.promises.push(compressor.compress(file, {quality: .5}));
  //     }      

  //     let temp = Promise.all(this.promises)
  //       .then(file => {
  //         this.setOtherImage(file);
  //       }
  //     );
  //   }   
  // }
  

  changeInputLabel (file) {
    const reader = new FileReader();
    reader.onload = e => this.coverImageSrc = reader.result as string;
    this.coverImageLabel = file.name;
    reader.readAsDataURL(file);

    console.log('reader', reader);
    console.log('coverlabel', this.coverImageLabel);
    
  }

  // changeInputLabelOtherImage (file: any[]) {
  //   const reader = new FileReader();
  //   reader.onload = e => this.bodyImageLabel = reader.result as string;
  //   this.fileInput = file[0].name;
  //   reader.readAsDataURL(file[0]);    
  // }

  // setBodyImage(file) {
  //   this.bodyImage.get('bodyImage').setValue(file);
  //   this.changeInputLabelImage(file);
  // }

  // setOtherImage(file: any[]) {
  //   this.otherImage.get('otherImage').setValue(file);
  // }

  addBerita(form) {
    let temp = form.value;
    // console.log(this.uploadData);
    if(
      !temp.title || !temp.summary || 
      !temp.body1 || !temp.body2 || 
      !temp.body3 || !temp.snippet || !this.compressedImage
    ) {
      alert('Ada kolom yang belum diisi, silahkan isi terlebih dahulu.');
    } else {
      const formData = new FormData();
      formData.append('title', temp.title);
      formData.append('summary', temp.summary);
      formData.append('body1', temp.body1);
      formData.append('body2', temp.body2);
      formData.append('body3', temp.body3);    
      formData.append('snippet', temp.snippet);
      formData.append('coverImages', this.compressedImage);
    
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

}
