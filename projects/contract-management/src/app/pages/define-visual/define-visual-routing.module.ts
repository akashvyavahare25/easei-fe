import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LayoutsModule } from '../../../../src/app/layouts/layouts.module';
import { AllVisualComponent } from './all-visual/all-visual.component';
import { CreateVisualComponent } from './create-visual/create-visual.component';

const routes: Routes = [
  {
    path: 'all',
    component: AllVisualComponent,
    data: { title: 'all', permission: '-' },
  },
  {
    path: 'create',
    component: CreateVisualComponent,
    data: { title: 'create', permission: '-' },
  },
  {
    path: 'edit/:id',
    component: CreateVisualComponent,
    data: { title: 'edit' },
  }
]

@NgModule({
  imports: [LayoutsModule, RouterModule.forChild(routes)],
  providers: [],
  exports: [RouterModule],
})
export class DefineVisualRoutingModule { }
