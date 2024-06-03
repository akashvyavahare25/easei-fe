import { NgModule } from '@angular/core'
import { Routes, RouterModule } from '@angular/router'
import { AuthGuard } from '../../../../src/app/components/cleanui/system/Screenguard/auth.guard'
import { LayoutsModule } from '../../../../src/app/layouts/layouts.module'
import { CreateRulesComponent } from './create-rules/create-rules.component';
import { AllRulesComponent } from './all-rules/all-rules.component'

// dashboard
const routes: Routes = [
    {
        path: 'create',
        component: CreateRulesComponent,
        canActivate: [AuthGuard],
        //data: { title: 'create', permission: 'apiinterface:create' },
      },
      {
        path: 'all',
        component: AllRulesComponent,
        canActivate: [AuthGuard],
        //data: { title: 'all', permission: 'apiinterface:all' },
      },
      {
        path: 'edit/:id',
        component: CreateRulesComponent,
        canActivate: [AuthGuard],
       // data: { title: 'edit', permission: 'apiinterface:edit' },
      }
  
]

@NgModule({
  imports: [LayoutsModule, RouterModule.forChild(routes)],
  providers: [],
  exports: [RouterModule],
})
export class RulesRouterModule { }
