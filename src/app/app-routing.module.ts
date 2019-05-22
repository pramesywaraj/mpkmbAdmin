import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LoginPageComponent } from './pages/login-page/login-page.component';
import { AdminPageComponent } from './pages/admin-page/admin-page.component';


const routes: Routes = [
  {
    path: 'login',
    component: LoginPageComponent
  },

  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },

  {
    path: 'admin',
    component: AdminPageComponent,
    // children: [
    //   {
    //     path: '',
    //     redirectTo: 'admin-home',
    //     pathMatch: 'full'
    //   },
    //   {
    //     path: 'admin-home',
    //     component: AdminHomeComponent
    //   },
    //   {
    //     path: 'admin-programs',
    //     component: AdminProgramsComponent
    //   }
    // ]
  },
  
  {
    path: '**',
    redirectTo: ''
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
