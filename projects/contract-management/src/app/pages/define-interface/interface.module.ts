import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { SharedModule } from '../../../../src/app/shared.module'
import { InterfaceRouterModule } from './interface-routing.module'
import { FormsModule } from '@angular/forms'
import { FormioModule } from 'angular-formio'
import { ReactiveFormsModule } from '@angular/forms'
import { AgGridModule } from 'ag-grid-angular'
import { CreateInterfaceComponent } from './create-interface/create-interface.component';
import { AllInterfaceComponent } from './all-interface/all-interface.component'

@NgModule({
  declarations: [CreateInterfaceComponent, AllInterfaceComponent],
  imports: [
    CommonModule,
    SharedModule,
    InterfaceRouterModule,
    FormsModule,
    FormioModule,
    ReactiveFormsModule,
    AgGridModule.withComponents([])
  ]
})
export class InterfaceModule { }
