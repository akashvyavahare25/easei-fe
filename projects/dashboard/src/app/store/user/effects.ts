//@ts-nocheck
import { DataService } from '../../data.service'
import { Injectable } from '@angular/core'
import { Router, ActivatedRoute } from '@angular/router'
import { Actions, Effect, ofType, OnInitEffects } from '@ngrx/effects'
import { Action, select, Store } from '@ngrx/store'
import { Observable, of, empty, from } from 'rxjs'
import { map, switchMap, catchError, withLatestFrom, concatMap } from 'rxjs/operators'
import store from 'store'
import * as Reducers from '../../../../src/app/store/reducers'
import * as UserActions from './actions'
import * as _ from 'lodash'
import * as moment from 'moment'
import { ToastrService } from 'ngx-toastr'

@Injectable()
export class UserEffects implements OnInitEffects {
  constructor(
    private actions: Actions,
    private mainService: DataService,
    private router: Router,
    private route: ActivatedRoute,
    private rxStore: Store<any>,
    private toastr: ToastrService
  ) { }

  ngrxOnInitEffects(): Action {
    return { type: UserActions.LOAD_CURRENT_ACCOUNT }
  }

  @Effect()
  login: Observable<any> = this.actions.pipe(
    ofType(UserActions.LOGIN),
    map((action: UserActions.Login) => action.payload),
    concatMap(action =>
      of(action).pipe(withLatestFrom(this.rxStore.pipe(select(Reducers.getSettings)))),
    ),
    switchMap(([payload, settings]) => {
      return from(
        this.mainService.login({ username: payload.email, password: payload.password }),
      ).pipe(
        map((data: any) => {
          localStorage.clear()
          this.toastr.success('You have successfully logged in!');

          let roles: any[] = data.userDTO.roleName
          if (roles.length > 0) {
            roles = roles.map(element => {
              return element.toLowerCase();
            });
          }
          const userData = {
            authorized: true,
            loading: false,
	          logo:data.logo,
            userName:data.userDTO.firstName+" "+data.userDTO.lastName,
            name:data.userDTO.ownername,
            lastlogin:data.lastlogin,
            currentlogin:data.currentlogin ,
            role:roles,
            plant:data.plant, 
            customer:data.userDTO.customername, 
            originalRole:data.userDTO.roleName,
            // plantName:data.userDTO.plantName[0]
          }
          localStorage.setItem('jwtToken', data.id_token)
          localStorage.setItem('login', data.userDTO.login);
          localStorage.setItem('user', data.userDTO.ownername);
          localStorage.setItem('customer', data.userDTO.customername);
          localStorage.setItem('plant', data.plant);
          localStorage.setItem('firstName', data.userDTO.firstName);
          localStorage.setItem('lastName', data.userDTO.lastName);
          localStorage.setItem('id', data.userDTO.id);
          localStorage.setItem('logo', data.logo);
          localStorage.setItem('originalRole',data.userDTO.roleName);
          if(data.userDTO.plantName){
            localStorage.setItem( "plantName",data.userDTO.plantName[0]);
          }
          localStorage.setItem("currentlogin",data.currentlogin);
          mainService.isLogin = true
          localStorage.setItem('role', roles)
          if (_.includes(roles, 'admin') || _.includes(roles, 'super user') || _.includes(roles, 'superadmin-it')) {
            this.router.navigate(['drone/home']);
          } else if (_.includes(roles, 'portfolio')) {
            this.router.navigate(['front/portfolio/home']);
          }
          else if (_.includes(roles, 'plant')) {
            this.router.navigate(['front/plant/plants']);
          }
          else if (_.includes(roles, 'oem')) {
            this.router.navigate(['front/oem/dashboard/new']);
          }

          if (this.route.snapshot.queryParams.returnUrl) {
            this.router.navigate([this.route.snapshot.queryParams.returnUrl])
          }
          return new UserActions.LoginSuccessful(userData)
        }),
        catchError((error: any) => {
          this.toastr.error('Cant log in: You entered the wrong credentials');
          return from([{ type: UserActions.LOGIN_UNSUCCESSFUL }])
        }),
      )
    }),
  )
  @Effect()
  loadCurrentAccount: Observable<any> = this.actions.pipe(
    ofType(UserActions.LOAD_CURRENT_ACCOUNT),
    map(() => true),
    concatMap(action =>
      of(action).pipe(withLatestFrom(this.rxStore.pipe(select(Reducers.getSettings)))),
    ),
    switchMap(([, settings]) => {
      // return from(this.mainService.logout()).pipe(
      //   map(() => {         
      //     this.mainService.isLogin = true;
      //     store.remove('accessToken')
      //     this.router.navigate(['/auth/login'])
      //      localStorage.clear()
      //     return new UserActions.FlushUser()
      //   }),s
      // )
      // jwt load current account
      if (localStorage.getItem('jwtToken')) {
        return from(
          this.mainService.getProfileByToken().pipe(
            map(data => {
              console.log('token api data',data)
              let roles: any[] = data.userDTO.roleName

          if (roles.length > 0) {
            roles = roles.map(element => {
              return element.toLowerCase();
            });
          }
              const plant=localStorage.getItem('plant')
              const logo = localStorage.getItem('logo')
              const userData = {
                authorized: true,
                loading: false,
                logo:data.logo,
                userName:data.userDTO.firstName+" "+data.userDTO.lastName,
                name:data.userDTO.ownername,
                lastlogin:data.lastlogin,
                currentlogin:data.currentlogin ,
                role:roles,
                plant:plant, 
                customer:data.userDTO.customername, 
                originalRole:data.userDTO.roleName,

                
              }
              console.log('************  TOken',localStorage.getItem('jwtToken'))
              localStorage.setItem('jwtToken', localStorage.getItem('jwtToken'))
              localStorage.setItem('login', data.userDTO.login);
              localStorage.setItem('user', data.userDTO.ownername);
              localStorage.setItem('customer', data.userDTO.customername);
            //  /localStorage.setItem('plant', data.plant);
              localStorage.setItem('firstName', data.userDTO.firstName);
              localStorage.setItem('lastName', data.userDTO.lastName);
              localStorage.setItem('id', data.userDTO.id);
              localStorage.setItem('logo', data.logo);
              localStorage.setItem('originalRole',data.userDTO.roleName);
              if(data.userDTO.plantName){
                localStorage.setItem( "plantName",data.userDTO.plantName[0]);
              }
              // localStorage.setItem("currentlogin",data.currentlogin);
              mainService.isLogin = true
              localStorage.setItem('role', roles)
              
              console.log('loaddddddd account ******',userData)
              return new UserActions.LoadCurrentAccountSuccessful(userData)
            }),
            catchError((error: any) => {
              this.notification.warning(error.code, error.message)
              return from([{ type: UserActions.LOAD_CURRENT_ACCOUNT_UNSUCCESSFUL }])
            }),
          ),
        )
      } else {
        console.log('refreshhhhhhh  flush user')
        return of(new UserActions.FlushUser())
      }
    }),
  )

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
  //       return from(
  //         this.mainService.getProfileByToken().pipe(
  //           map(data => {
  //             const customerData = JSON.parse(localStorage.getItem('customerData'))
  //             const userData = {
  //               id: data._id,
  //               name: data.firstName + ' ' + data.lastName,
  //               role: data.roles[0],
  //               avatar: '',
  //               email: data.email,
  //               // logo:customerData.logo,
  //               authorized: true,
  //               loading: false,
  //               userPermission: data.userPermission,
  //             }
  //             if (customerData) {
  //               userData['customer'] = customerData
  //             }
  //             return new UserActions.LoadCurrentAccountSuccessful(userData)
  //           }),
  //           catchError((error: any) => {
  //             this.notification.warning(error.code, error.message)
  //             return from([{ type: UserActions.LOAD_CURRENT_ACCOUNT_UNSUCCESSFUL }])
  //           }),
  //         ),
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
      // localStorage.clear()
      // this.mainService.isLogin = false;
      // store.remove('accessToken')
      // this.router.navigate(['front/auth/login'])
      // return of(new UserActions.FlushUser())
      // firebase logout
      return from(this.mainService.logout()).pipe(
        map(() => {         
          this.mainService.isLogin = false;
          store.remove('accessToken')
          this.router.navigate(['/auth/login'])
           localStorage.clear()
          return new UserActions.FlushUser()
        }),
      )
    }),
  )
}
