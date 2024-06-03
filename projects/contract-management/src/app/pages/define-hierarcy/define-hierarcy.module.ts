import { NgModule } from '@angular/core'
import { SharedModule } from '../../../../src/app/shared.module'
import { HierarcyRouterModule} from './define-hierarcy-routing.module'
import { FormsModule } from '@angular/forms'
import { FormioModule } from 'angular-formio'
import { CreateHierarcyComponent } from './create-hierarcy/create-hierarcy.component'
import { AllHierarcyComponent } from './all-hierarcy/all-hierarcy.component'
import { ReactiveFormsModule } from '@angular/forms'
import { AgGridModule } from 'ag-grid-angular';

// dashboard

@NgModule({
  imports: [
    SharedModule,
    HierarcyRouterModule,
    FormsModule,
    FormioModule,
    ReactiveFormsModule,
    AgGridModule.withComponents([])
  ],
  declarations: [CreateHierarcyComponent, AllHierarcyComponent],
})
export class HierarcyModule { }
