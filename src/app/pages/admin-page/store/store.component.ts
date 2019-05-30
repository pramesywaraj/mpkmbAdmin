import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';

import { Subscription } from 'rxjs';

import { StoreService } from '../../../services/store.service';

declare var ImageCompressor: any;
const compressor = new ImageCompressor();

@Component({
  selector: 'app-store',
  templateUrl: './store.component.html',
  styleUrls: ['./store.component.scss']
})
export class StoreComponent implements OnInit, OnDestroy {

  private subscription: Subscription;
  promises: Promise<Blob>;
  compressedImage: any;

  goods = [];

  constructor(private store: StoreService, private router: Router) { }

  ngOnInit() {
    this. subscription = this.store.getGoods().subscribe(data => {
      if(data.status == 200) {
        this.goods = data.stores.docs;
        console.log(this.goods);
      }
    });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  addGoods(goods) {
    let temp = goods.value;
    console.log('this form', temp);

    const formData = new FormData();
    formData.append('title', temp.title);
    formData.append('price', temp.price);
    formData.append('desc', temp.desc);
    formData.append('image', this.compressedImage);
    
    this.store.addGoods(formData).subscribe(data => {
      console.log('EX', data);
      if(data.status == 201) {
        this.router.navigate(["admin/toko"]);
        alert('Barang berhasil dimasukkan.');
      }
    });
  }

  detectImage(event) {
    console.log('foto', event);
    if(event.target.files.length > 0) {
      
      let file = event.target.files[0];
      console.log('foto', file);
    
      this.promises = compressor.compress(file, {quality: .5});
  
      let temp = Promise.resolve(this.promises)
        .then(file => {
          this.compressedImage = file;
        }
      );
    }      
  }

  public deleteGoods(id) {
    if(confirm('Apakah anda yakin untuk menghapus barang ini?')) {
      this.store.deleteGoods(id).subscribe(data => {
        console.log(data);
        if(data.status == 200) {
          alert('Barang berhasil dihapus.');
          this.router.navigateByUrl('/', {skipLocationChange: true}).then(()=>
            this.router.navigate(["admin/toko"])
          ); 
        }
      });
    }
    
  }


}
