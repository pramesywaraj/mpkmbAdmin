import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';

import { switchMap } from 'rxjs/operators';

import { NewsService } from '../../../../services/news.service';


@Component({
  selector: 'app-newsdetail',
  templateUrl: './newsdetail.component.html',
  styleUrls: ['./newsdetail.component.scss']
})
export class NewsdetailComponent implements OnInit {

  newsDetail: any;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private news: NewsService) {

    }

  ngOnInit() {
    // let temp = this.route.paramMap.pipe(
    //   switchMap((params: ParamMap) => 
    //     console.log(params.get('id')))
    // );

    let id = this.route.snapshot.paramMap.get('id');
    this.loadDetail(id);


  }

  loadDetail(id) {
    this.news.getNewsDetail(id).subscribe(data => {
      if(data.status == 200) {
        this.newsDetail = data.news;
      }
    });
  }

}
