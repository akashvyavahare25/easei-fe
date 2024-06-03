import { NgModule } from '@angular/core'
import { Routes, RouterModule } from '@angular/router'
import { Error404PageComponent } from './error404-page/error404-page.component'
import { LoginComponent } from './login/login.component'
import { ResetPasswordComponent } from './reset-password/reset-password.component'
import { SendOTPComponent } from './send-otp/send-otp.component'

const routes: Routes = [
  {
    path: 'reset-password/:email',
    component: ResetPasswordComponent,
    data: { title: 'Reset Password' },
  },
  {
    path: 'sendotp',
    component: SendOTPComponent,
    data: { title: 'Send OTP' },
  },
  {
    path: 'login',
    component: LoginComponent,
    data: { title: 'Login' },
  },
  {
    path: '404',
    component: Error404PageComponent,
    data: { title: '404' },
  },
]

@NgModule({
  imports: [ RouterModule.forChild(routes)],
  providers: [],
  exports: [RouterModule],
})
export class AuthRouterModule {}
