import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { RouterModule } from '@angular/router'
import { TranslateModule } from '@ngx-translate/core'

// antd components module
import { AntdModule } from '../../src/app/antd.module'
import { NgxPermissionsModule } from 'ngx-permissions'
import { NgProgressModule } from '@ngx-progressbar/core'

const MODULES = [CommonModule, RouterModule, AntdModule, TranslateModule, NgxPermissionsModule,NgProgressModule]

@NgModule({
  imports: [...MODULES],
  exports: [...MODULES],
})
export class SharedModule {}
