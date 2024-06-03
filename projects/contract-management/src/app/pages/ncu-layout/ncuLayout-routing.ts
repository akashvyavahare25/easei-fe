import { NgModule } from '@angular/core'
import { Routes, RouterModule } from '@angular/router'
import { AuthGuard } from '../../../../src/app/components/cleanui/system/Guard/auth.guard'
import { LayoutModule } from '../../components/cleanui/layout/layout.module'
import { NcuLayoutComponent } from './ncu-layout/ncu-layout.component'
 
const routes: Routes = [
    {
      path: 'ncu',
      component: NcuLayoutComponent,
      data: { title: 'ncuLayout'},
    },
    
  ]

  @NgModule({
    imports: [LayoutModule, RouterModule.forChild(routes)],
    providers: [],
    exports: [RouterModule],
  })
  export class ncuLayoutRoute { }