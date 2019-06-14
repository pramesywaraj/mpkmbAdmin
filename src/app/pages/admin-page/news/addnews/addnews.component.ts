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
  
  changeInputLabel (file) {
    const reader = new FileReader();
    reader.onload = e => this.coverImageSrc = reader.result as string;
    this.coverImageLabel = file.name;
    reader.readAsDataURL(file);

    console.log('reader', reader);
    console.log('coverlabel', this.coverImageLabel);
    
  }


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
