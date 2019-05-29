import { Component, OnInit, OnDestroy } from '@angular/core';
import { NewsService } from '../../../services/news.service';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-news',
  templateUrl: './news.component.html',
  styleUrls: ['./news.component.scss']
})
export class NewsComponent implements OnInit, OnDestroy {

  newsList = [];
  private subscription: Subscription;

  constructor(private news: NewsService, public router: Router) {
  }

  ngOnInit() {
    this.getNews();
  }

  ngOnDestroy() {
    this.clearNews();
  }

  private getNews() {
    this.subscription = this.news.getNews().subscribe(
      data => {
        this.newsList = data.news.docs;
        console.log(this.newsList);
      }
    );
  }

  private clearNews() {
    this.subscription.unsubscribe();
  }

  private deleteNews(id) {

    if(confirm('Apakah Anda yakin akan menghapus berita ini?')) {
      this.news.deleteNews(id).subscribe(data => {
        alert('Berita berhasil dihapus.');
        this.router.navigate(['admin/berita']);
      });
    }
  }

}
