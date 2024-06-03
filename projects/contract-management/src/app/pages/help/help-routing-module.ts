import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router'; 
import { LayoutsModule } from 'projects/contract-management/src/app/layouts/layouts.module';
import { AddHelpPersonComponent } from './add-help-person/add-help-person.component';
import { HelpPersonListComponent } from './help-person-list/help-person-list.component';
 
const routes: Routes = [
   {path : 'create', component : AddHelpPersonComponent, data: { title: 'Create Help Person' }},
  {path : 'list', component : HelpPersonListComponent,  data: { title: 'Help Person List' }}, 
]

@NgModule({
  imports: [LayoutsModule, RouterModule.forChild(routes)],
  providers: [],
  exports: [RouterModule],
})
export class HelpRoutingModule { }
