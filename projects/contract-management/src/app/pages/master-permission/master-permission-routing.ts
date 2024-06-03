import { NgModule } from '@angular/core'
import { Routes, RouterModule } from '@angular/router'
import { AuthGuard } from '../../../../src/app/components/cleanui/system/Guard/auth.guard'
import { LayoutModule } from '../../components/cleanui/layout/layout.module'
import { MasterPermissionComponent } from './master-permission/master-permission.component'
// dashboard
const routes: Routes = [
  {
    path: 'permission',
    component: MasterPermissionComponent,
    data: { title: 'masterPermission'},
  },
]

@NgModule({
  imports: [LayoutModule, RouterModule.forChild(routes)],
  providers: [],
  exports: [RouterModule],
})
export class masterPermissionRoute { }
