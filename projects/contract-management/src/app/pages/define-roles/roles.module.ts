import { NgModule } from '@angular/core'
import { CommonModule, DatePipe } from '@angular/common'
import { FormsModule, ReactiveFormsModule } from '@angular/forms'
import { SharedModule } from '../../../app/shared.module'
import { FormioModule } from 'angular-formio';
import { AgGridModule } from 'ag-grid-angular';
import { CreateRolesComponent } from './create-roles/create-roles.component';
import { AllRolesComponent } from './all-roles/all-roles.component'
import {RolesRouterModule} from './roles-routing.module'; 
@NgModule({
  declarations: [CreateRolesComponent, AllRolesComponent,],
  imports: [
    CommonModule,
    SharedModule,
    FormsModule,
    FormioModule,
    ReactiveFormsModule,
    RolesRouterModule,
    AgGridModule.withComponents([]),    
  ],
  providers: [DatePipe],
  bootstrap: [CreateRolesComponent]
})
export class RolesModule { }
