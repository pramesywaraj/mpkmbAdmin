import { Component, OnInit } from '@angular/core';
import { NewsService } from '../../../services/news.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-news',
  templateUrl: './news.component.html',
  styleUrls: ['./news.component.scss']
})
export class NewsComponent implements OnInit {

  newsList: any;

  constructor(private news: NewsService, public router: Router) {
    this.getNews();
  }

  ngOnInit() {
  }

  private getNews() {
    this.news.getNews().subscribe(data => {
      this.newsList = data.news.docs;
      console.log(this.newsList);
    });
  }

  private goToNewsDetail(id) {
    console.log('cobaan', id);
    this.router.navigate(['admin/aweu', id]);
  }

}
