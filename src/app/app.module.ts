import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRouting } from './app.routing';
import { AppPage } from './app.page';
import { LoginComponent } from './login/login.component';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AppPage,
    LoginComponent
  ],
  imports: [
    BrowserModule,
    AppRouting,
    ReactiveFormsModule
  ],
  bootstrap: [
    AppPage
  ]
})
export class AppModule { }
