import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LoginPageComponent } from './pages/login-page/login-page.component';
import { AdminPageComponent } from './pages/admin-page/admin-page.component';
import { DashboardComponent } from './pages/admin-page/dashboard/dashboard.component';
import { RouteGuardGuard } from './guards/route-guard.guard';
import { NewsComponent } from './pages/admin-page/news/news.component';
import { TaskComponent } from './pages/admin-page/task/task.component';
import { GalleryComponent } from './pages/admin-page/gallery/gallery.component';
import { StoreComponent } from './pages/admin-page/store/store.component';
import { AddnewsComponent } from './pages/admin-page/news/addnews/addnews.component';
import { NewsdetailComponent } from './pages/admin-page/news/newsdetail/newsdetail.component';
import { GroupTaskComponent } from './pages/admin-page/task/group-task/group-task.component';


const routes: Routes = [
  {
    path: '',
    redirectTo: 'dashboard',
    pathMatch: 'full'
  },

  {
    path: 'login',
    component: LoginPageComponent
  },

  {
    path: 'admin',
    component: AdminPageComponent,
    canActivate: [RouteGuardGuard],
    children: [
      {
        path: 'dashboard',
        component: DashboardComponent
      },
      {
        path: 'berita',
        component: NewsComponent,
      },
      {
        path: 'berita-detail/:id',
        component: NewsdetailComponent,
      },
      {
        path: 'tambah-berita',
        component: AddnewsComponent
      },
      {
        path: 'penugasan',
        component: TaskComponent,
      },
      {
        path: 'kelompok-detail/:id',
        component: GroupTaskComponent,
      },
      {
        path: 'galeri',
        component: GalleryComponent
      },
      {
        path: 'toko',
        component: StoreComponent
      },
    ]
  },

  {
    path: 'admin',
    redirectTo: 'admin/dashboard',
    pathMatch: 'full'
  },
   
  {
    path: '**',
    redirectTo: 'admin/dashboard'
  }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
