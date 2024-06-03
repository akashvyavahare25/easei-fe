import { NgModule } from '@angular/core'
import { Routes, RouterModule } from '@angular/router'
import { LayoutsModule } from '../../../../src/app/layouts/layouts.module'
import { HomeComponent } from './home/home.component'

// dashboard
const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    data: { title: 'home', permission: '-' },
  }
]

@NgModule({
  imports: [LayoutsModule, RouterModule.forChild(routes)],
  providers: [],
  exports: [RouterModule],
})
export class HomeRouterModule { }
