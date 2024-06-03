import { NgModule } from '@angular/core'
import { CommonModule, DatePipe } from '@angular/common'
import { SharedModule } from '../../../../src/app/shared.module'
// import { MasterRouterModule } from './master-routing.module'
import { FormsModule } from '@angular/forms'
import { FormioModule } from 'angular-formio'
import { ReactiveFormsModule } from '@angular/forms'
import { AgGridModule } from 'ag-grid-angular'
import { FileUploadComponent } from './file-upload/file-upload.component'
import { UploadFileRouterModule } from './upload-file-routing.module';
import { TemplateUploadComponent } from './template-upload/template-upload.component'
@NgModule({
  declarations: [FileUploadComponent, TemplateUploadComponent],
  imports: [
    CommonModule,
    UploadFileRouterModule,
    SharedModule,
    FormsModule,
    FormioModule,
    ReactiveFormsModule,
    AgGridModule.withComponents([])
  ],
  providers: [DatePipe],
})
export class UploadFileModule { }
