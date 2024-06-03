import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MasterDetailsComponent } from './master-details/master-details.component'
import { MasterListComponent } from './master-list/master-list.component'
import { LayoutsModule } from '../../../app/layouts/layouts.module'
import { MasterFormRenderComponent } from './master-form-render/master-form-render.component';

const routes: Routes = [
  {
    path: 'list',
    component: MasterListComponent,
    data: { title: 'Master List' }
  },
  {
    path: 'details/:masterName/:id',
    component: MasterDetailsComponent,
    data: { title: 'Master Details' }
  },
  {
    path: 'details/new/add/:id',
    component: MasterFormRenderComponent,
    data: { title: 'Add Master Details' }
  },
  {
    path: 'details/update/:masterName/:id/:masterId',
    component: MasterFormRenderComponent,
    data: { title: 'Update Master Details' }
  },
]

@NgModule({
  imports: [LayoutsModule, RouterModule.forChild(routes)],
  providers: [],
  exports: [RouterModule],
})
export class MasterManagementRoutingModule { }
