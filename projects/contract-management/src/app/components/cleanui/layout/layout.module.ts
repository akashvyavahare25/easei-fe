import { NgModule } from '@angular/core'
import { FormsModule, ReactiveFormsModule } from '@angular/forms'
import { PerfectScrollbarModule } from 'ngx-perfect-scrollbar'
import { SharedModule } from '../../../../../src/app/shared.module'

import { TopbarComponent } from './Topbar/topbar.component'
import { TopbarActionsComponent } from './Topbar/Actions/actions.component'
import { TopbarLanguageSwitcherComponent } from './Topbar/LanguageSwitcher/language-switcher.component'
import { TopbarIssuesHistoryComponent } from './Topbar/IssuesHistory/issues-history.component'
import { TopbarSearchComponent } from './Topbar/Search/search.component'
import { TopbarUserMenuComponent } from './Topbar/UserMenu/user-menu.component'
import { TopbarProjectManagementComponent } from './Topbar/ProjectManagement/project-management.component'
import { MenuLeftComponent } from './Menu/MenuLeft/menu-left.component'
import { MenuTopComponent } from './Menu/MenuTop/menu-top.component'
import { FooterComponent } from './Footer/footer.component'
import { SidebarComponent } from './Sidebar/sidebar.component'

const COMPONENTS = [
  TopbarComponent,
  TopbarIssuesHistoryComponent,
  TopbarSearchComponent,
  TopbarUserMenuComponent,
  TopbarProjectManagementComponent,
  TopbarActionsComponent,
  TopbarLanguageSwitcherComponent,
  MenuLeftComponent,
  MenuTopComponent,
  FooterComponent,
  SidebarComponent,
]

@NgModule({
  imports: [
    SharedModule,
    FormsModule,
    ReactiveFormsModule,
    PerfectScrollbarModule,
  ],
  declarations: [...COMPONENTS],
  exports: [...COMPONENTS],
})
export class LayoutModule {}
