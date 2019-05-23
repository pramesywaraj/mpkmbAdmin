import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LoginPageComponent } from './pages/login-page/login-page.component';
import { AdminPageComponent } from './pages/admin-page/admin-page.component';
import { DashboardComponent } from './pages/admin-page/dashboard/dashboard.component';


const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },

  {
    path: 'login',
    component: LoginPageComponent
  },

  {
    path: 'admin',
    component: AdminPageComponent,
    children: [
      {
        path: 'dashboard',
        component: DashboardComponent
      }
    ]
  },

  {
    path: 'admin',
    redirectTo: 'admin/dashboard',
    pathMatch: 'full'
  },
   
  {
    path: '**',
    redirectTo: ''
  }
    //   {
    //     path: 'admin-home',
    //     component: AdminHomeComponent
    //   },
    //   {
    //     path: 'admin-programs',
    //     component: AdminProgramsComponent
    //   }
    // ]
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
