import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';

// import 'rxjs/Rx' ;
import { Subscription } from 'rxjs';
import * as FileSaver from 'file-saver';

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
  orderList = [];

  constructor(private store: StoreService, private router: Router) {
    this.subscription = this.store.getGoods().subscribe(data => {
      if(data.status == 200) {
        this.goods = data.stores.docs;
        console.log(this.goods);
      }
    });

    this.getOrderList();
  }

  ngOnInit() {}

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  async getOrderList() {
    await this.store.orderList().subscribe(data => {
      if(data.status == 200) {
        this.orderList = data.orders;
        this.orderList.reverse();
      } else {
        alert(data.message);
      }
    });
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
          this.ngOnInit();
        }
      });
    }
    
  }

  public orderListDownload() {
    this.store.orderListDownload().subscribe(data => 
      {
        console.log(data);
        FileSaver.saveAs(data, 'daftar_pembeli.xlsx');
      },
      err => {
        console.log('err', err);
      }
    );
  }

}
