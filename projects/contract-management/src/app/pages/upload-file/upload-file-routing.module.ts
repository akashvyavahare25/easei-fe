import { NgModule } from '@angular/core'
import { Routes, RouterModule } from '@angular/router'
import { FileUploadComponent } from './file-upload/file-upload.component'
import { TemplateUploadComponent } from './template-upload/template-upload.component'
// import { AuthGuard } from 'src/app/components/cleanui/system/Guard/aut
import { LayoutsModule } from '../../layouts/layouts.module'
// import { AllMastersComponent } from './all-masters/all-masters.component'
// import { CreateMasterComponent } from './create-master/create-master.component'

// dashboard
const routes: Routes = [
  {
    path: 'upload',
    component: FileUploadComponent,
    // canActivate: [AuthGuard],
    // data: { title: 'create', permission: 'define master:create' },
  },
  {
    path: 'template',
    component: TemplateUploadComponent,
    // canActivate: [AuthGuard],
    // data: { title: 'create', permission: 'define master:create' },
  }
 
]

@NgModule({
  imports: [LayoutsModule,RouterModule.forChild(routes)],
  providers: [],
  exports: [RouterModule],
})
export class UploadFileRouterModule { }
