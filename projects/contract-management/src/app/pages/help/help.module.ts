import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AddHelpPersonComponent } from './add-help-person/add-help-person.component';
import { HelpRoutingModule } from './help-routing-module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms'
import { NzSelectModule } from 'ng-zorro-antd/select' 
import { SharedModule } from 'projects/contract-management/src/app/shared.module'
import { AgGridModule } from 'ag-grid-angular'
import { NzIconModule } from 'ng-zorro-antd/icon'
import { NzSwitchModule } from 'ng-zorro-antd/switch' 
import { HelpPersonListComponent } from './help-person-list/help-person-list.component';


@NgModule({
  declarations: [AddHelpPersonComponent,HelpPersonListComponent],
  imports: [
    CommonModule,
    HelpRoutingModule,
    SharedModule, 
    FormsModule,
    ReactiveFormsModule, 
    NzSelectModule,
    NzIconModule,
    NzSwitchModule, 
    AgGridModule.withComponents([]),
  ]
})
export class HelpModule { }
