import { Injectable } from '@angular/core'
import { Router, ActivatedRoute } from '@angular/router'
import { Actions, Effect, ofType, OnInitEffects } from '@ngrx/effects'
import { Action, select, Store } from '@ngrx/store'
import { Observable, of, empty, from } from 'rxjs'
import { map, switchMap, catchError, withLatestFrom, concatMap } from 'rxjs/operators'
import store from 'store'
import { NzNotificationService } from 'ng-zorro-antd'
import * as Reducers from '../../../../src/app/store/reducers'
import * as UserActions from './actions'
import { FormRenderService } from '../../../../src/app/services/form-render.service'
import { NgxPermissionsService } from 'ngx-permissions'
import { PermissionService } from '../../../../src/app/services/permission.service'
import * as _ from 'lodash'
import { DataService } from 'projects/dashboard/src/app/data.service'

@Injectable()
export class UserEffects implements OnInitEffects {
  constructor(
    private actions: Actions,
    private mainService: FormRenderService,
    public service: DataService,
    private router: Router,
    private route: ActivatedRoute,
    private rxStore: Store<any>,
    private notification: NzNotificationService,
    private permissionsService: NgxPermissionsService,
    private permissionService: PermissionService
  ) { }

  ngrxOnInitEffects(): Action {
    return { type: UserActions.LOAD_CURRENT_ACCOUNT }
  }

  // tslint:disable-next-line: member-ordering
  // @Effect()
  // login: Observable<any> = this.actions.pipe(
  //   ofType(UserActions.LOGIN),
  //   map((action: UserActions.Login) => action.payload),
  //   concatMap(action =>
  //     of(action).pipe(withLatestFrom(this.rxStore.pipe(select(Reducers.getSettings)))),
  //   ),
  //   switchMap(([payload, settings]) => {
  //     // backend login
  //     return from(
  //       this.mainService.login({ username: payload.email, password: payload.password })).pipe(
  //         map((data) => {
  //           this.notification.success('Logged In', 'You have successfully logged in!')
  //           const userData = {
  //             id: data.userDTO.id,
  //             name: data.userDTO.firstName + ' ' + data.userDTO.lastName,
  //             role:  'superadmin' ,
  //             avatar: '',
  //            //customer: data.customerData,
  //             accessToken: data.id_token,
  //            email: data.userDTO.email,
  //             authorized: true,
  //             loading: false,
  //             phone:data.userDTO.phone,
  //           }
  //           if (data.userPermission) {
  //             const permissionData = [];
  //             _.each(data.userPermission.configPermission, (config) => {
  //               if (config.view) {
  //                 permissionData.push(config.name);
  //               }
  //               if (config.create) {
  //                 permissionData.push(config.name + ':create')
  //               }
  //               if (config.list) {
  //                 permissionData.push(config.name + ':all')
  //               }
  //               if (config.edit) {
  //                 permissionData.push(config.name + ':edit')
  //               }
  //               if (config.delete) {
  //                 permissionData.push(config.name + ':delete')
  //               }
  //             })
  //             _.each(data.userPermission.appsPermissoin, (apps) => {
  //               if (apps.value) {
  //                 permissionData.push(apps.name);
  //               }
  //               _.each(apps.screen, (config) => {
  //                 if (config.view) {
  //                   permissionData.push(config.name);
  //                 }
  //                 if (config.create) {
  //                   permissionData.push(config.name + ':create')
  //                 }
  //                 if (config.list) {
  //                   permissionData.push(config.name + ':all')
  //                 }
  //                 if (config.edit) {
  //                   permissionData.push(config.name + ':edit')
  //                 }
  //                 if (config.delete) {
  //                   permissionData.push(config.name + ':delete')
  //                 }
  //               });
  //             })
  //             _.each(data.userPermission.mastersPermissoin, (apps, index) => {
  //               if (index === 0) {
  //                 permissionData.push('masters');
  //               }
  //               if (apps.view) {
  //                 permissionData.push(apps.name + ':view');
  //               }
  //               if (apps.create) {
  //                 permissionData.push(apps.name + ':create')
  //               }
  //               if (apps.list) {
  //                 permissionData.push(apps.name + ':all')
  //               }
  //               if (apps.edit) {
  //                 permissionData.push(apps.name + ':edit')
  //               }
  //               if (apps.delete) {
  //                 permissionData.push(apps.name + ':delete')
  //               }
  //             })
  //             permissionData.push('-');
  //             permissionData.push(data.userDTO.roleName[0]);
  //             /*   userData['userPermission'] = permissionData; */
  //             localStorage.setItem("permissionData", JSON.stringify(permissionData));
  //             this.permissionsService.loadPermissions(permissionData);
  //           } else {
  //             const permissionData = [];
  //             permissionData.push(data.userDTO.id === '6017d2e42d22202c63862683' ? 'superadmin': data.userDTO.roleName[0]);
  //             localStorage.setItem("permissionData", JSON.stringify(permissionData));
  //             /*  userData['userPermission'] = permissionData; */
  //           }
  //           if (data.customerData) {
  //             localStorage.setItem('customerData', JSON.stringify(data.customerData))
  //           }
	//         localStorage.setItem('login','portfolio');
          
  //           localStorage.setItem('jwtToken', data.id_token)
  //           localStorage.setItem('role',userData.role)
  //           if (this.route.snapshot.queryParams.returnUrl) {
  //             this.router.navigate([this.route.snapshot.queryParams.returnUrl]) // // redirect to returnUrl
  //           } else if (this.router.url.includes('/auth')) {
  //             this.router.navigate(['/']) // redirect to root route on auth pages
  //           }
  //           else{
  //             this.router.navigate(['drone/home']) 
  //           }
  //           // this.service.setLogin(true);
  //           return new UserActions.LoginSuccessful(userData)
  //         }),
  //         catchError((error: any) => {
  //           if (error.error.statusCode === 409) {
  //             this.notification.warning(error.error.statusCode, "Can't log in: This user ID not found")
  //           } else {
  //             if (error.error.statusCode === 401) {
  //               this.notification.warning(error.error.statusCode, "Can't log in: You've entered the wrong password")
  //             } else {
  //               this.notification.warning(error.error.statusCode, error.error.message)
  //             }
  //           }

  //           return from([{ type: UserActions.LOGIN_UNSUCCESSFUL }])
  //         }),
  //       )
  //   }),
  // )

  // tslint:disable-next-line: member-ordering
  /* @Effect()
  register: Observable<any> = this.actions.pipe(
    ofType(UserActions.REGISTER),
    map((action: UserActions.Register) => action.payload),
    concatMap(action =>
      of(action).pipe(withLatestFrom(this.rxStore.pipe(select(Reducers.getSettings)))),
    ),
    switchMap(([payload, settings]) => {
      // firebase register
      return from(
        
      ).pipe(
        map(() => {
          return new UserActions.EmptyAction()
        }),
        catchError(error => {
          this.notification.warning(error.code, error.message)
          return from([{ type: UserActions.EMPTY_ACTION }])
        }),
      )
    }),
  )
 */
  // tslint:disable-next-line: member-ordering
  // @Effect()
  // loadCurrentAccount: Observable<any> = this.actions.pipe(
  //   ofType(UserActions.LOAD_CURRENT_ACCOUNT),
  //   map(() => true),
  //   concatMap(action =>
  //     of(action).pipe(withLatestFrom(this.rxStore.pipe(select(Reducers.getSettings)))),
  //   ),
  //   switchMap(([, settings]) => {
  //     // jwt load current account
  //     if (localStorage.getItem('jwtToken')) {
  //       return from(this.mainService.getProfileByToken().pipe(
  //         map((data) => {
  //           const customerData = JSON.parse(localStorage.getItem('customerData'))
  //           const userData = {
  //             // id: data._id,
  //             // name: data.firstName + ' ' + data.lastName,
  //             // role: data._id === '6017d2e42d22202c63862683' ? 'superadmin': data.roles[0],
  //             avatar: '',
  //             email: data.email,
  //             //logo:customerData.logo,
  //             authorized: true,
  //             loading: false,
  //             userPermission: data.userPermission
  //           }
  //           if (customerData) {
  //             userData['customer'] = customerData
  //           }
  //           return new UserActions.LoadCurrentAccountSuccessful(userData)
  //         }),
  //         catchError((error: any) => {
  //           this.notification.warning(error.code, error.message)
  //           return from([{ type: UserActions.LOAD_CURRENT_ACCOUNT_UNSUCCESSFUL }])
  //         }),
  //       )
  //       )
  //     } else {
  //       return of(new UserActions.FlushUser())
  //     }
  //   }),
  // )

  // tslint:disable-next-line: member-ordering
  @Effect()
  logout: Observable<any> = this.actions.pipe(
    ofType(UserActions.LOGOUT),
    map((action: UserActions.Logout) => true),
    concatMap(action =>
      of(action).pipe(withLatestFrom(this.rxStore.pipe(select(Reducers.getSettings)))),
    ),
    switchMap(([, settings]) => {
      localStorage.clear();
      store.remove('accessToken')
      this.router.navigate(['front'])
      return of(new UserActions.FlushUser())
      // firebase logout
      // return from(this.firebaseAuthService.logout()).pipe(
      //   map(() => {
      //     store.remove('accessToken')
      //     this.router.navigate(['/auth/login'])
      //     return new UserActions.FlushUser()
      //   }),
      // )
    }),
  )
}
