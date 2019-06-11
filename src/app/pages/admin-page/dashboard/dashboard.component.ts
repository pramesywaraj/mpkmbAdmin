import { Component, OnInit, OnDestroy } from '@angular/core';
import * as moment from 'moment';
import { TimelineService } from '../../../services/timeline.service';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { getLocaleDateFormat } from '@angular/common';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit, OnDestroy {
  currentDate: any;
  eventList: any[];

  private subscription: Subscription;

  constructor(public timeline: TimelineService, public router: Router) { }

  ngOnInit() {
    this.subscription = this.timeline.getTimeline().subscribe(data => {
      if(data.status == 200) {
        this.eventList = data.timelines;
      }
    });

  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  addTimeline(form) {
    let dataObj = {
      'title' : form.value.title,
      'body' : form.value.summary,
      'date' : form.value.date
    };

    if(dataObj.body && dataObj.date && dataObj.title) {
      this.timeline.postTimeline(dataObj).subscribe(data => {
        if(data.status == 201) {
          alert('Kegiatan berhasil ditambahkan.');
          this.ngOnInit();
        } else {
          alert(data.message);
        }
      });
    } else {
      alert('Ada bagian yang belum terisi.');
    }
  }

  deleteTimeline(id) {
    if(id != null) {
      this.timeline.deleteTimeline(id).subscribe(data => {
        if(data.status == 200) {
          alert('Kegiatan berhasil dihapus dari Jadwal Kegiatan.');
          // this.router.navigateByUrl('/', {skipLocationChange: true}).then(()=>
          //   this.router.navigate(["admin/dashboard"])
          // ); 
          this.ngOnInit();
        }
      });
    } else {
      alert('Kegiatan tidak valid.');
    }
  }

}
