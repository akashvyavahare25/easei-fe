import { NgModule } from '@angular/core'
import { Routes, RouterModule } from '@angular/router'   
import { HomeComponent } from './home/home.component'
import { RenewSolarFormComponent } from './renewSolarForm/renewSolarForm.component'
// dashboard
const routes: Routes = [
  {
    path: 'home',
    component: HomeComponent, 
  },
  {
    path: 'renewSolarForm/:id/:name/:flag/:region/:country/:state/:incharge/:startDate/:endDate/:dayFilter',
    component: RenewSolarFormComponent, 
  },
]

@NgModule({
  imports: [ RouterModule.forChild(routes)],
  providers: [],
  exports: [RouterModule],
})
export class PortfolioRoutingModule { }