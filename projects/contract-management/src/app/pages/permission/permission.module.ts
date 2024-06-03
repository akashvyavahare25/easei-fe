import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { FormsModule, ReactiveFormsModule } from '@angular/forms'
import { SharedModule } from '../../../app/shared.module'
import { FormioModule } from 'angular-formio';
import { PermissionPageComponent } from './permission-page/permission-page.component'
import { PermissionRoutingModule } from './permission-routing.module';

@NgModule({
  declarations: [PermissionPageComponent],
  imports: [
    CommonModule,
    SharedModule,
    FormsModule,
    FormioModule,
    PermissionRoutingModule,
    ReactiveFormsModule
  ],
})
export class PermissionModule { }
