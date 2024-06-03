import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LayoutsModule } from '../../layouts/layouts.module'
import {HistoryComponent} from './history/history.component'

const routes: Routes = [  
  {
    path: 'history',
    component: HistoryComponent,
    data: { title: 'history' }
  },
]

@NgModule({
  imports: [LayoutsModule, RouterModule.forChild(routes)],
  providers: [],
  exports: [RouterModule],
})
export class HistoryRoutingModule { }
