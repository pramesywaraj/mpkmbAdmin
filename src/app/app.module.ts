import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AppheaderComponent } from './components/appheader/appheader.component';
import { AppfooterComponent } from './components/appfooter/appfooter.component';
import { AppsidemenuComponent } from './components/appsidemenu/appsidemenu.component';
import { LoginPageComponent } from './pages/login-page/login-page.component';
import { AdminPageComponent } from './pages/admin-page/admin-page.component';
import { DashboardComponent } from './pages/admin-page/dashboard/dashboard.component';

@NgModule({
  declarations: [
    AppComponent,
    AppheaderComponent,
    AppfooterComponent,
    AppsidemenuComponent,
    LoginPageComponent,
    AdminPageComponent,
    DashboardComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
