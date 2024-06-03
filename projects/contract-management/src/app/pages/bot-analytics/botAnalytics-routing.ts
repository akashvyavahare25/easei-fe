import { NgModule } from '@angular/core'
import { Routes, RouterModule } from '@angular/router'
import { AuthGuard } from '../../../../src/app/components/cleanui/system/Guard/auth.guard'
import { LayoutModule } from '../../components/cleanui/layout/layout.module'
import { BotAnalyticsComponent } from './bot-analytics/bot-analytics.component'


const routes: Routes = [
    {
      path: 'bot',
      component: BotAnalyticsComponent,
      data: { title: 'botAnalytics'},
    },
    
  ]

  @NgModule({
    imports: [LayoutModule, RouterModule.forChild(routes)],
    providers: [],
    exports: [RouterModule],
  })
  export class botAnalyticsRoute { }