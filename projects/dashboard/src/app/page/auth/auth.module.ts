import { NgModule } from '@angular/core'
import { SharedModule } from '../../shared.module'
import { AuthRouterModule } from './auth-routing.module'
import { FormsModule, ReactiveFormsModule } from '@angular/forms'
import { ResetPasswordComponent } from './reset-password/reset-password.component';
import { LayoutComponent } from './layout/layout.component';
import { AuthlayoutComponent } from './authlayout/authlayout.component'
import { LoginComponent } from './login/login.component';
import { Error404PageComponent } from './error404-page/error404-page.component';
import { SendOTPComponent } from './send-otp/send-otp.component';

const COMPONENTS = [
  ResetPasswordComponent,
  LoginComponent,SendOTPComponent
]

@NgModule({
  imports: [SharedModule, AuthRouterModule, FormsModule, ReactiveFormsModule
    ],
  declarations: [...COMPONENTS, LayoutComponent, AuthlayoutComponent, Error404PageComponent],
})
export class AuthModule {}
