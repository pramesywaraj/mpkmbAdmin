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
  compressedOtherImage: any;
  description: string = 'wawa';

  coverImageSrc: string;

  promises: Promise<Blob>[] = [];

  

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
        console.log('data', data);
        let temp = data.news;
        this.newsDetail = temp;
        this.newsImageCoverUrl = this.config.baseUrl + 'news/image/' + this.newsDetail.imageCover;
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
          this.compressedBodyImage = file;
        }
      );
    }      
  }

  detectOtherImages(event) {
    console.log('foto', event);
    if(event.target.files.length > 0) {

      let file = event.target.files;

      for(let i = 0; i < file.length; i++) {
        this.promises.push(compressor.compress(file[i], {quality: .5}));
      }      
        
      let temp = Promise.all(this.promises)
        .then(file => {
          this.compressedOtherImage = file;
          console.log('other', this.compressedOtherImage);
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
          this.router.navigateByUrl('/', {skipLocationChange: true}).then(()=>
            this.router.navigate(["admin/berita-detail/", this.newsDetail._id])
          ); 
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

      const formData = new FormData();
      formData.append('description', this.description);
      formData.append('otherImages', this.compressedOtherImage);
    
      this.news.addNewsOtherImage(formData, this.newsDetail._id).subscribe(
        data => {
          alert('Gambar berhasil ditambahkan');
          this.router.navigateByUrl('/', {skipLocationChange: true}).then(()=>
            this.router.navigate(["admin/berita-detail/", this.newsDetail._id])
          ); 
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
