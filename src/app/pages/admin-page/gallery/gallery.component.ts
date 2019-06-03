import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-gallery',
  templateUrl: './gallery.component.html',
  styleUrls: ['./gallery.component.scss']
})
export class GalleryComponent implements OnInit {

  constructor() { }

  ngOnInit() {
    let element = document.getElementById('tab_1');
    console.log('elemetn', element.className);
  }

}
