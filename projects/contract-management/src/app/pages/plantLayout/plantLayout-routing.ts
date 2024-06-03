import { NgModule } from '@angular/core'
import { Routes, RouterModule } from '@angular/router'
import { AuthGuard } from '../../../../src/app/components/cleanui/system/Guard/auth.guard'
import { LayoutModule } from '../../components/cleanui/layout/layout.module'
import { PlantLayoutComponent } from './plant-layout/plant-layout.component'
import { PlantLayoutModule } from './plant-layout.module'
// dashboard
const routes: Routes = [
  {
    path: 'plant',
    component: PlantLayoutComponent,
    data: { title: 'plantLayout'},
  },
  
]

@NgModule({
  imports: [LayoutModule, RouterModule.forChild(routes)],
  providers: [],
  exports: [RouterModule],
})
export class plantLayoutRoute { }
