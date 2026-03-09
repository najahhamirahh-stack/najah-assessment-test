import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRouting } from './app.routing';
import { AppPage } from './app.page';

@NgModule({
  declarations: [
    AppPage
  ],
  imports: [
    BrowserModule,
    AppRouting
  ],
  bootstrap: [
    AppPage
  ]
})
export class AppModule { }
