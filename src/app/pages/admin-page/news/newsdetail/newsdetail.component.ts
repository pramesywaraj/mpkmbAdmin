import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';

import { switchMap, retry, catchError, map } from 'rxjs/operators';
import { Subscription } from 'rxjs';

import { NewsService } from '../../../../services/news.service';
import { ConfigService } from './../../../../services/config.service';


@Component({
  selector: 'app-newsdetail',
  templateUrl: './newsdetail.component.html',
  styleUrls: ['./newsdetail.component.scss']
})
export class NewsdetailComponent implements OnInit, OnDestroy {

  newsDetail: any;
  newsImageCoverUrl: string = '';
  private subscription: Subscription;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private news: NewsService,
    private config: ConfigService
  ) {}

  ngOnInit() {
    let id = this.route.snapshot.paramMap.get('id');
    // this.loadDetail(id);
    this.subscription = this.news.getNewsDetail(id).subscribe(
      data => {
        this.newsDetail = data.news;
        this.newsImageCoverUrl = this.config.baseUrl + 'news/image/' + this.newsDetail.imageCover;
        console.log(this.newsDetail);
      },
      err => console.log('err', err)
    );
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
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
