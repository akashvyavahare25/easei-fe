import { NgModule } from '@angular/core'
import { CommonModule, DatePipe } from '@angular/common'
import { FormsModule, ReactiveFormsModule } from '@angular/forms'
import { SharedModule } from '../../../app/shared.module'
import { FormioModule } from 'angular-formio';
import { CreateReportComponent } from './create-report/create-report.component'
import { ReportRoutingModule } from './report-routing.module';
import { AgGridModule } from 'ag-grid-angular';
import { AllReportComponent } from './all-report/all-report.component'
import { MonacoEditorModule,NgxMonacoEditorConfig } from 'ngx-monaco-editor';
import { DndListModule } from 'ngx-drag-and-drop-lists';
const monacoConfig: NgxMonacoEditorConfig = {
  baseUrl: '', // configure base path for monaco editor
  defaultOptions: { scrollBeyondLastLine: false }, // pass default options to be used
  onMonacoLoad: () => { console.log((<any>window).monaco); }
  // here monaco object will be available as window.monaco use this function to extend monaco editor functionality.
};
@NgModule({
  declarations: [CreateReportComponent, AllReportComponent,],
  imports: [
    CommonModule,
    SharedModule,
    FormsModule,
    FormioModule,
    DndListModule,
    ReportRoutingModule,
    ReactiveFormsModule,
    AgGridModule.withComponents([]),
    MonacoEditorModule.forRoot(monacoConfig)
  ],
  providers: [DatePipe],
})
export class ReportModule { }
