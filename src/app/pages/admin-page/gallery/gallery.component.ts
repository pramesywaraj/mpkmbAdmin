import { Component, OnInit, OnDestroy } from '@angular/core';
import { GalleryService } from '../../../services/gallery.service';

import { Subscription } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-gallery',
  templateUrl: './gallery.component.html',
  styleUrls: ['./gallery.component.scss']
})
export class GalleryComponent implements OnInit, OnDestroy {

  viewTab: string;
  private subscription: Subscription;

  videosList = [];
  photosList = [];
  categoriesList = [];  
  
  constructor(private gallery: GalleryService, private router: Router) { }

  ngOnInit() {
    this.initTheTab();
    this.getVideos();
    this.getPhotos();
    this.getCategories();
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  initTheTab() {
    this.viewTab = 'tab1';
    console.log('awa', this.viewTab);
  }

  async getVideos() {
    this.subscription = await this.gallery.getVideosList().subscribe(data => {
      if(data.status == 200) {
        this.videosList = data.videoGaleries;
      }
    });
  }

  async getPhotos() {
    this.subscription = await this.gallery.getPhotosList().subscribe(data => {
      if(data.status == 200) {
        this.photosList = data.imageGalery;
      }
    });
  }

  async getCategories() {
    this.subscription = await this.gallery.getCategories().subscribe(data => {
      if(data.status == 200) {
        this.categoriesList = data.categories;
      }
    });
  }

  addPhotoCategories(categories) {
    if(categories) {
      let temp = categories.value;
      let objArray = {
        'name' : temp.categoryName
      };
      
      console.log('wwww', objArray);
      this.gallery.addCategory(objArray).subscribe(
        data => {
          if(data.status == 201) {
            alert(data.message);
            this.router.navigateByUrl('/', {skipLocationChange: true}).then(()=>
              this.router.navigate(["admin/galeri"])
            ); 
          }
        },
        err => {
          console.log('err', err);
        }
      );
    } else {
      alert('Anda belum memasukkan nama kategori!');
    }
  }

  addVideo(video) {
    if(video) {
      let temp = video.value;
      let objArray = {
        'title' : temp.videoTitle,
        'url' : temp.videoUrl
      };
      
      this.gallery.addVideo(objArray).subscribe(
        data => {
          if(data.status == 201) {
            alert(data.message);
            this.router.navigateByUrl('/', {skipLocationChange: true}).then(()=>
              this.router.navigate(["admin/galeri"])
            ); 
          }
        },
        err => {
          console.log('err', err);
        }
      );
    } else {
      alert('Anda belum mengisi form tambah video!');
    }
  }

  addPhoto(photo) {
    if(photo) {
      let temp = photo.value;
      let objArray = {
        'categoryId' : temp.categoryId,
        'url' : temp.photoUrl
      };
      
      this.gallery.addPhoto(objArray).subscribe(
        data => {
          if(data.status == 201) {
            alert(data.message);
            this.router.navigateByUrl('/', {skipLocationChange: true}).then(()=>
              this.router.navigate(["admin/galeri"])
            ); 
          }
        },
        err => {
          console.log('err', err);
        }
      );
    } else {
      alert('Anda belum mengisi form tambah video!');
    }
  }

}
