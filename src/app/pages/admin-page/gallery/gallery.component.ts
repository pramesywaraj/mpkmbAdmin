import { Component, OnInit, OnDestroy } from '@angular/core';
import { GalleryService } from '../../../services/gallery.service';

import { Subscription } from 'rxjs';

@Component({
  selector: 'app-gallery',
  templateUrl: './gallery.component.html',
  styleUrls: ['./gallery.component.scss']
})
export class GalleryComponent implements OnInit, OnDestroy {

  viewTab: string;
  private subscription: Subscription;

  videosList = [];
  
  constructor(private gallery: GalleryService) { }

  ngOnInit() {
    this.initTheTab();
    this.getVideos();
  }

  initTheTab() {
    this.viewTab = 'tab1';
    console.log('awa', this.viewTab);
  }

  getVideos() {
    this.subscription = this.gallery.getVideosList().subscribe(data => {
      if(data.status == 200) {
        this.videosList = data.videoGaleries;
        console.log('video', this.videosList);
      }
    });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

}
