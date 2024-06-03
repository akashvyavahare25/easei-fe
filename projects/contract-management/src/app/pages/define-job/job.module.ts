import { NgModule } from '@angular/core'
import { CommonModule, DatePipe } from '@angular/common'
import { SharedModule } from '../../../../src/app/shared.module'
import { JobRouterModule } from './job-routing.module'
import { FormsModule } from '@angular/forms'
import { FormioModule } from 'angular-formio'
import { ReactiveFormsModule } from '@angular/forms'
import { AgGridModule } from 'ag-grid-angular'
import { CreateJobComponent } from './create-job/create-job.component';
import { AllJobComponent } from './all-job/all-job.component';
import { JobDetailsComponent } from './job-details/job-details.component';
// import { CommonModule, DatePipe } from '@angular/common'
// import { CronEditorModule } from 'ngx-cron-editor';

// import { CronSelectionModule } from 'angular2-cron-jobs';
import { CronEditorModule } from 'cron-editor';

@NgModule({
  declarations: [CreateJobComponent, AllJobComponent, JobDetailsComponent],
  imports: [
    CommonModule,
    CronEditorModule,
    SharedModule,
    JobRouterModule,
    FormsModule,
    FormioModule,
    ReactiveFormsModule,
    AgGridModule.withComponents([])
  ],
  providers: [DatePipe]
})
export class JobModule { }
