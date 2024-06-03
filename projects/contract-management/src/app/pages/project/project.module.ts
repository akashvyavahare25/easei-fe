import { NgModule } from '@angular/core'
import { CommonModule, DatePipe } from '@angular/common'
import { FormsModule, ReactiveFormsModule } from '@angular/forms'
import { SharedModule } from '../../../app/shared.module'
import { FormioModule } from 'angular-formio';
import { ProjectComponent } from './project/project.component';
import {ProjectRoutingModule} from './project-routing.module'
import { MonacoEditorModule,NgxMonacoEditorConfig } from 'ngx-monaco-editor';
import { DndListModule } from 'ngx-drag-and-drop-lists';
import { AgGridModule } from 'ag-grid-angular';

const monacoConfig: NgxMonacoEditorConfig = {
  baseUrl: '', // configure base path for monaco editor
  defaultOptions: { scrollBeyondLastLine: false }, // pass default options to be used
  onMonacoLoad: () => { console.log((<any>window).monaco); }
  // here monaco object will be available as window.monaco use this function to extend monaco editor functionality.
};
@NgModule({
  declarations: [ProjectComponent],
  imports: [
    CommonModule,
    SharedModule,
    FormsModule,
    FormioModule,
    AgGridModule,
    ProjectRoutingModule,
    ReactiveFormsModule,
    MonacoEditorModule.forRoot(monacoConfig)
  ],
  providers: [DatePipe],
  bootstrap: [ProjectComponent]
})
export class ProjectModule { }
