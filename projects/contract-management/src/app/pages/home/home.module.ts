import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home/home.component';
import { SharedModule } from '../../../../src/app/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HomeRouterModule } from './home-routing.module';



@NgModule({
  declarations: [HomeComponent],
  imports: [
    CommonModule,
    SharedModule,
    HomeRouterModule,
    FormsModule,
    ReactiveFormsModule,
  ]
})
export class HomeModule { }
