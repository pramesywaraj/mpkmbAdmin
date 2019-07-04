import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule  } from '@angular/forms';


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AppheaderComponent } from './components/appheader/appheader.component';
import { AppfooterComponent } from './components/appfooter/appfooter.component';
import { AppsidemenuComponent } from './components/appsidemenu/appsidemenu.component';
import { LoginPageComponent } from './pages/login-page/login-page.component';
import { AdminPageComponent } from './pages/admin-page/admin-page.component';
import { DashboardComponent } from './pages/admin-page/dashboard/dashboard.component';

import { ConfigService } from './services/config.service';
import { AuthService } from './services/auth.service';
import { NewsComponent } from './pages/admin-page/news/news.component';
import { TaskComponent } from './pages/admin-page/task/task.component';
import { GalleryComponent } from './pages/admin-page/gallery/gallery.component';
import { StoreComponent } from './pages/admin-page/store/store.component';
import { AddnewsComponent } from './pages/admin-page/news/addnews/addnews.component';
import { NewsdetailComponent } from './pages/admin-page/news/newsdetail/newsdetail.component';
import { GroupTaskComponent } from './pages/admin-page/task/group-task/group-task.component';

@NgModule({
  declarations: [
    AppComponent,
    AppheaderComponent,
    AppfooterComponent,
    AppsidemenuComponent,
    LoginPageComponent,
    AdminPageComponent,
    DashboardComponent,
    NewsComponent,
    TaskComponent,
    GalleryComponent,
    StoreComponent,
    AddnewsComponent,
    NewsdetailComponent,
    GroupTaskComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [
    ConfigService,
    AuthService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
