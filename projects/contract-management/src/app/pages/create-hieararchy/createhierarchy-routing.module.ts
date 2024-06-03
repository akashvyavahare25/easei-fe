import { NgModule } from '@angular/core'
import { Routes, RouterModule } from '@angular/router'
import { AuthGuard } from '../../components/cleanui/system/Guard/auth.guard'
import { LayoutsModule } from '../../layouts/layouts.module'
import { CreateHirarchyComponent } from './create-hirarchy/create-hirarchy.component'
import { SearchHierarchyComponent } from './search-hierarchy/search-hierarchy.component'

const routes: Routes = [
 
  {
    path: 'create',
    canActivate: [AuthGuard],
    component: CreateHirarchyComponent,
    // data: { title: 'create', permission: 'parameter:create' },
  },
  {
    path: 'find',
    canActivate: [AuthGuard],
    component: SearchHierarchyComponent,
    // data: { title: 'create', permission: 'parameter:create' },
  },{
    path: 'create/:id',
    component: CreateHirarchyComponent,
    data: { title: 'edit' },
  }
  
]

@NgModule({
  imports: [LayoutsModule, RouterModule.forChild(routes)],
  providers: [],
  exports: [RouterModule],
})
export class CreateHierarchyRouterModule { }
