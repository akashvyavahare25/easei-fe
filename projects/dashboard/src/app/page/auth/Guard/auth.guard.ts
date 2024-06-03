//@ts-nocheck
import { Injectable } from '@angular/core'
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router'
import { Observable } from 'rxjs'
import { environment } from 'src/environments/environment'
import { select, Store } from '@ngrx/store'
import * as Reducers from '../../../../../src/app/store/reducers'
import * as _ from 'lodash'
import { DataService } from '../../../data.service'

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  authorized: boolean=false
  userPermission: any
  role: any
  token:any
  constructor(
    private store: Store<any>,
    public router: Router,
    data:DataService
    // private notification: NzNotificationService,
  ) {
    this.store.pipe(select(Reducers.getUser)).subscribe(state => {
     
      this.role = localStorage.getItem('role') ? localStorage.getItem('role') : state.role
      this.role=this.role.split(',')

      if(this.role.length>0)
      {
        this.role= this.role.map(element => {
            return element.toLowerCase();
          });
      }
    })
  }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot,
  ): Observable<boolean> | Promise<boolean> | boolean {
    if( localStorage.getItem('jwtToken')){
      this.authorized=true
    }

    if (this.authorized && this.isValid(next.data.role,this.role)) { 
     return true
    }
    this.router.navigate(['front/auth/login'])
    return false
  }

  public getToken(): string {
    return localStorage.getItem('jwtToken')
    // return "jwt"
  }

   isValid(arr1, arr2) {
    return arr1.some(item => arr2.includes(item.toLowerCase()))
  }
}
