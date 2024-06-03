import { NgModule } from '@angular/core'
import { CommonModule, DatePipe } from '@angular/common'
import { FormsModule, ReactiveFormsModule } from '@angular/forms'
import { SharedModule } from '../../../app/shared.module'
import { FormioModule } from 'angular-formio';
import { AgGridModule } from 'ag-grid-angular';
import { CreateRulesComponent } from './create-rules/create-rules.component';
import { AllRulesComponent } from './all-rules/all-rules.component'
import {RulesRouterModule} from './rules-routing.module'; 
@NgModule({
  declarations: [CreateRulesComponent, AllRulesComponent,],
  imports: [
    CommonModule,
    SharedModule,
    FormsModule,
    FormioModule,
    ReactiveFormsModule,
    RulesRouterModule,
    AgGridModule.withComponents([]),    
  ],
  providers: [DatePipe],
  bootstrap: [CreateRulesComponent]
})
export class RulesModule { }
