import { NgModule } from '@angular/core'
import { SharedModule } from '../../../../src/app/shared.module'
import { FormsModule } from '@angular/forms'
import { FormioModule } from 'angular-formio'
import { FormBuilderComponent } from './form-builder/form-builder.component'
import { FormRenderComponent } from './form-render/form-render.component'
import { ReactiveFormsModule } from '@angular/forms'
import { AgGridModule } from 'ag-grid-angular';
import { FormioRouterModule } from './formio-routing.module'

// dashboard

@NgModule({
  imports: [
    SharedModule,
    FormioRouterModule,
    FormsModule,
    FormioModule,
    ReactiveFormsModule,
    AgGridModule.withComponents([])
  ],
  declarations: [FormBuilderComponent, FormRenderComponent],
})
export class FormiojsModule { }
