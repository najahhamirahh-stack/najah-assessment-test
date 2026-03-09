import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRouting } from './app.routing';
import { AppPage } from './app.page';
import { LoginComponent } from './login/login.component';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AuthInterceptor } from './_helpers/auth.interceptor';

@NgModule({
  providers: [
    { 
      provide: HTTP_INTERCEPTORS, 
      useClass: AuthInterceptor, 
      multi: true 
    }
  ],
  declarations: [
    AppPage,
    LoginComponent,
    DashboardComponent
  ],
  imports: [
    BrowserModule,
    AppRouting,
    ReactiveFormsModule,
    HttpClientModule
  ],
  bootstrap: [
    AppPage
  ]
})
export class AppModule { }
