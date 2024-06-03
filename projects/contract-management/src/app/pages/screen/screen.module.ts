import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { SharedModule } from '../../../../src/app/shared.module'
import { ScreenRouterModule } from './screen-routing.module'
import { FormsModule } from '@angular/forms'
import { FormioModule } from 'angular-formio'
import { ReactiveFormsModule } from '@angular/forms'
import { AgGridModule } from 'ag-grid-angular'
import { CreateScreenComponent } from './create-screen/create-screen.component';
import { AllScreenComponent } from './all-screen/all-screen.component'
import { DndListModule } from 'ngx-drag-and-drop-lists';
import { NzTagModule } from 'ng-zorro-antd/tag';
import { NzFormModule } from 'ng-zorro-antd/form';


@NgModule({
  declarations: [CreateScreenComponent, AllScreenComponent],
  imports: [
    CommonModule,
    SharedModule,
    ScreenRouterModule,
    FormsModule,
    FormioModule,
    ReactiveFormsModule,
    DndListModule,
    NzTagModule,
    NzFormModule,
    AgGridModule.withComponents([])
  ]
})
export class ScreenModule { }
