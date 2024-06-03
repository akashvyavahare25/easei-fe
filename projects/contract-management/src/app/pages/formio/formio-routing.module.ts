import { NgModule } from '@angular/core'
import { Routes, RouterModule } from '@angular/router'
import { AuthGuard } from '../../../../src/app/components/cleanui/system/Guard/auth.guard'
import { LayoutsModule } from '../../../../src/app/layouts/layouts.module'
import { FormBuilderComponent } from './form-builder/form-builder.component'
import { FormRenderComponent } from './form-render/form-render.component'

// dashboard
const routes: Routes = [
  {
    path: 'all',
    component: FormRenderComponent,
    canActivate: [AuthGuard],
    data: { title: 'all', permission: 'parameter:all' },
  },
  {
    path: 'create',
    canActivate: [AuthGuard],
    component: FormBuilderComponent,
    data: { title: 'create', permission: 'parameter:create' },
  },
  {
    path: 'edit/:id',
    canActivate: [AuthGuard],
    component: FormBuilderComponent,
    data: { title: 'edit', permission: 'parameter:edit' },
  }
]

@NgModule({
  imports: [LayoutsModule, RouterModule.forChild(routes)],
  providers: [],
  exports: [RouterModule],
})
export class FormioRouterModule { }
