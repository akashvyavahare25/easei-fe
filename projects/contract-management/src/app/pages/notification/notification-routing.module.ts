import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LayoutsModule } from '../../layouts/layouts.module'
import { AllComponent } from './all-notification/all.component';
import { ScreenNotificationComponent } from './screen-notification/screen-notification.component';

const routes: Routes = [
  {
    path: 'all',
    component: AllComponent,
    data: { title: 'notification' }
  },
  {
    path: 'action/:code/:editId/:wfInstanceId/:notificationId',
    component: ScreenNotificationComponent,
    data: { title: 'create', permission: ':create' },
  },  
]

@NgModule({
  imports: [LayoutsModule, RouterModule.forChild(routes)],
  providers: [],
  exports: [RouterModule],
})
export class NotificationRoutingModule { }
