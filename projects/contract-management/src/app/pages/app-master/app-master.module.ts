import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { SharedModule } from '../../../../src/app/shared.module'
import { AppMasterRouterModule } from './app-master-routing.module'
import { FormsModule } from '@angular/forms'
import { FormioModule } from 'angular-formio'
import { ReactiveFormsModule } from '@angular/forms'
import { AgGridModule } from 'ag-grid-angular'
import { CreateAppMasterComponent } from './create-app-master/create-app-master.component';
import { AllAppMasterComponent } from './all-app-master/all-app-master.component'

@NgModule({
  declarations: [CreateAppMasterComponent, AllAppMasterComponent],
  imports: [
    CommonModule,
    SharedModule,
    AppMasterRouterModule,
    FormsModule,
    FormioModule,
    ReactiveFormsModule,
    AgGridModule.withComponents([])
  ]
})
export class AppMasterModule { }
