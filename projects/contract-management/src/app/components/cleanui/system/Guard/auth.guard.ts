import { Injectable } from '@angular/core'
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router'
import { Observable } from 'rxjs'
import { environment } from '../../../../../../src/environments/environment'
import { select, Store } from '@ngrx/store'
import * as Reducers from '../../../../../../../dashboard/src/app/store/reducers'
import * as _ from 'lodash'
import { NzNotificationService } from 'ng-zorro-antd'

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  authorized: boolean=false
  userPermission: any;
  role: any;
  token:any
  constructor(
    private store: Store<any>,
    public router: Router,
    private notification: NzNotificationService
  ) {
    this.store.pipe(select(Reducers.getUser)).subscribe(state => {
      // this.authorized = state.authorized
      // this.userPermission = state.userPermission;
      // this.userPermission = JSON.parse(localStorage.getItem("permissionData"));
      // this.role = state.role;
     
      // this.authorized = state.authorized
      this.role = localStorage.getItem('role') ? localStorage.getItem('role') : state.role
      this.role=this.role.split(',')
    })
  }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot,
  ): Observable<boolean> | Promise<boolean> | boolean {
   
    //console.log(this.authorized,next.data,"IN GUARD",this.isValid(this.role))
    if(localStorage.getItem('jwtToken')){
      this.authorized=true
    }
   
    if (this.authorized && this.isValid(this.role)) { 
     return true
    }
    this.router.navigate(['front/auth/login'])
    return false
  }
  isValid(arr1) {
    return arr1.some(item => item.toLowerCase()=="super user" || item.toLowerCase()=="superadmin-it" || item.toLowerCase()=="admin")
  }

  // canActivate(
  //   next: ActivatedRouteSnapshot,
  //   state: RouterStateSnapshot,
  // ): Observable<boolean> | Promise<boolean> | boolean {
  //   if (environment.authenticated) {
  //     // skip guard checking on demo environment serve/build, remove it in your app
  //     return false
  //   }
  //   if (localStorage.getItem('jwtToken')) {
   
  //     return true
  //   }  else {
  //     // this.router.navigate(['/appscreen/dashboard'])
  //     this.router.navigate(['/home'])
  //     setTimeout(() => {
  //       this.notification.error('Error', 'You have not permisson!')
  //     }, 700)
  //     return true
  //   }

  //   this.router.navigate(['auth/login'], { queryParams: { returnUrl: state.url } })
  //   return false
  // }

  public getToken(): string {
    return localStorage.getItem('jwtToken')
  }
}
