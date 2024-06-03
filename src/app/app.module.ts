import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { RouterModule } from '@angular/router';
import { App1SharedModule } from '../../projects/contract-management/src/app/app.module';
import { App2SharedModule } from '../../projects/dashboard/src/app/app.module';

const MODULES = [BrowserModule, AppRoutingModule];

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    App1SharedModule.forRoot(),
    App2SharedModule.forRoot()
  ],

  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
