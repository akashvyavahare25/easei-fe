import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LayoutsModule } from '../../layouts/layouts.module';
import { ProjectComponent } from './project/project.component';

const routes: Routes = [
  {
    path: 'create',
    component: ProjectComponent,
    data: { title: 'project' }
  },
]

@NgModule({
  imports: [LayoutsModule, RouterModule.forChild(routes)],
  providers: [],
  exports: [RouterModule],
})
export class ProjectRoutingModule { }
