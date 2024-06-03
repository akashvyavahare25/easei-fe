import { NgModule } from '@angular/core'
import { Routes, RouterModule } from '@angular/router' 
import { AlarmComponent } from './alarm/alarm.component'
import { PlantServiceComponent } from './plant-service/plant-service.component'
import { PlantDashboardComponent } from './plantDashboard/plantDashboard.component'
import { ReplacementNotificationComponent } from './replacementNotification/replacementNotification.component'
// dashboard
const routes: Routes = [
  {
    path: 'plants',
    component: PlantDashboardComponent,
    data: { title: 'create', data: { permission: 'application master:create' } },
  },
  {
    path: 'alarm',
    component: AlarmComponent,
  },
  {
    path: 'alarm/:type/:plantid/:knuid/:status/:botid/:startdate/:enddate',
    component: AlarmComponent,
  },
  {
    path: 'plantService',
    component: PlantServiceComponent,
  },
  {
    path: 'plantService/:type/:plantid/:knuid/:status/:botid/:startdate/:enddate',
    component: PlantServiceComponent,
  },
  {
    path: 'replacementNotification/:type/:plantid/:knuid/:status/:botid/:startdate/:enddate',
    component: ReplacementNotificationComponent,
  },
  {
    path: 'replacementNotification',
    component: ReplacementNotificationComponent,
  },
]

@NgModule({
  imports: [ RouterModule.forChild(routes)],
  providers: [],
  exports: [RouterModule],
})
export class PlantDashboardRoutingModule { }