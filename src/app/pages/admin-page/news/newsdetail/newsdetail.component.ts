import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';

import { switchMap, retry, catchError, map } from 'rxjs/operators';
import { Subscription } from 'rxjs';

import { NewsService } from '../../../../services/news.service';
import { ConfigService } from './../../../../services/config.service';

declare var ImageCompressor: any;
const compressor = new ImageCompressor();

@Component({
  selector: 'app-newsdetail',
  templateUrl: './newsdetail.component.html',
  styleUrls: ['./newsdetail.component.scss']
})
export class NewsdetailComponent implements OnInit, OnDestroy {

  newsDetail: any = null;
  newsImageCoverUrl: string = '';
  private subscription: Subscription;

  newsImageUrl: string;

  compressedBodyImage: any;
  compressedOtherImage: any[] = [];
  description: string = '';

  coverImageSrc: string;

  promises: Promise<any>[] = [];

  

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private news: NewsService,
    private config: ConfigService
  ) {}

  ngOnInit() {
    let id = this.route.snapshot.paramMap.get('id');
    this.newsImageUrl = this.config.newsImageUrl;
    // this.loadDetail(id);
    this.subscription = this.news.getNewsDetail(id).subscribe(
      data => {
        if(data.status == 200) {
          let temp = data.news;
          this.newsDetail = temp;
          this.newsImageCoverUrl = this.config.baseUrl + 'news/image/' + this.newsDetail.imageCover;
        } else if(data.status == 404) {
          alert('Berita sudah tidak ada.');
          this.router.navigate(['admin/berita']);
        } else {
          alert(data.message);
          this.router.navigate(['admin/berita']);
        }
        
      },
      err => console.log('err', err)
    );
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  detectBodyImage(event) {
    console.log('foto', event);
    if(event.target.files.length > 0) {
      
      let file = event.target.files[0];
      console.log('foto', file);
    
      this.promises = compressor.compress(file, {quality: .5});
  
      let temp = Promise.resolve(this.promises)
        .then(file => {
          console.log('tes', file);
          this.compressedBodyImage = file;
        }
      );
    }      
  }

  detectOtherImages(event) {
    console.log('foto', event);
    if(event.target.files.length > 0) {

      let file = event.target.files;
      console.log(file);

      for(let i = 0; i < file.length; i++) {
        this.promises.push(compressor.compress(file[i], {quality: .5}));
      }      
        
      let temp = Promise.all(this.promises)
        .then(file => {
          this.compressedOtherImage = file;
        }
      );
    }      
  }

  addBodyImage() {
    if(this.compressedBodyImage != null) {
      const formData = new FormData();
      formData.append('bodyImages', this.compressedBodyImage);
    
      this.news.addNewsBodyImage(formData, this.newsDetail._id).subscribe(
        data => {
          alert('Gambar berhasil ditambahkan');
          this.ngOnInit();
        },
        err => {
          console.log('err', err);
        }
      );  
    } else {
      alert('Gambar belum Anda masukkan');
    }
    
  }
  
  addOtherImage() {
    if(this.compressedOtherImage != null) {
      console.log(this.newsDetail._id);

      const formData = new FormData();
      for(let i = 0; i < this.compressedOtherImage.length; i++) {
        formData.append('otherImages', this.compressedOtherImage[i], this.compressedOtherImage[i].name);
      }
      formData.append('description', this.description);
    
      this.news.addNewsOtherImage(formData, this.newsDetail._id).subscribe(
        data => {
          console.log('data', data);
          alert('Gambar berhasil ditambahkan');
          this.ngOnInit();
          
        },
        err => {
          console.log('err', err);
        }
      );  
    } else {
      alert('Gambar belum Anda masukkan');
    }
    
  }

  // loadDetail(id) {
  //   // this.news.getNewsDetail(id).subscribe(
  //   //   data => {
  //   //     this.newsDetail = data.news;
  //   //     this.newsImageCoverUrl = this.config.baseUrl + 'news/image/' + this.newsDetail.imageCover;
  //   //     console.log(this.newsDetail);
  //   //   },
  //   //   err => console.log('err', err)
  //   // );
  //   const temp = 
  // }

}
