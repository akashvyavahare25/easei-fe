import { Injectable } from '@angular/core'
import { Observable, of, BehaviorSubject } from 'rxjs'
import { getMenuData } from './config'
import { AppMasterService } from '../../../../src/app/services/app-master.service'
import { ScreenService } from '../../../../src/app/services/screen.service'
import * as _ from 'lodash'
import { AuthGuard } from '../../../../src/app/components/cleanui/system/Guard/auth.guard'
import { DashboardService } from '../dashboard.service'
import { select, Store } from '@ngrx/store'
import * as Reducers from '../../../app/store/reducers'

@Injectable({
  providedIn: 'root',
})
export class MenuService {
  appMastersData: any = [];
  screensData: any = [];
  preMenuData: any = [];
  dashboardData: any = [];
  role: any
  userData: any
  public currentArrSubject: BehaviorSubject<[]> = new BehaviorSubject<[]>([]);

  constructor(
    private appMasterService: AppMasterService,
    private screenService: ScreenService,
    private dashboardService: DashboardService,
    private store: Store<any>,
  ) {

    this.store.pipe(select(Reducers.getUser)).subscribe(state => {
      this.userData = state;
      this.role = localStorage.getItem('role') ? localStorage.getItem('role') : state.role
    });
  }

  getMenuData(): BehaviorSubject<any[]> {
    if (this.role == 'admin') {
       this.preMenuData =_.filter(getMenuData,(o) =>{
         if(o.title  != 'Define Parameter' && o.title != 'Define Master'){
           return o;
         }
       })
    }else if(this.role == 'superadmin-it'){
       this.preMenuData=_.filter(getMenuData,(o)=>{
         if(o.title != 'Masters' &&  o.title != 'Hierarchy' && o.title != 'Customer'){
         return o;
         }
       })
    }
    else if(this.role == 'super user'){
      this.preMenuData=_.filter(getMenuData,(o)=>{
        if(o.title  != 'Define Parameter' && o.title  != 'Hierarchy' && o.title != 'Define Master'){
        return o;
        }
      })
   } else {
      this.preMenuData = _.filter(getMenuData, (o) => {
        return o;
      });
    }
    
    // this.appMasterService.getAllAppMasterData().subscribe(res => {
    //   this.appMastersData = res
    //   this.screenService.getAllScreenData().subscribe(res => {
    //     this.screensData = res
    //     this.dashboardService.getAllDasbhoard().subscribe((response) => {
    //       this.dashboardData = response
    // if (this.appMastersData.length > 0) {
    //   this.appMastersData.forEach((element, index) => {
    //     let screenArray = _.filter(this.screensData, { 'application_master': element._id });
    //     let dashboardArray = _.filter(this.dashboardData, { 'appName': element._id })
    //     let obj = {
    //       title: element.name,
    //       key: 'icons',
    //       icon: 'fe fe-star',
    //       children: [
    //         {
    //           title: 'Dashboard',
    //           key: 'dashboard',
    //           permission: ['-', 'admin', 'superadmin'],
    //           children: [],
    //           url: `/appscreen/dashboard`,
    //         },
    //         {
    //           title: 'Dataset',
    //           key: 'dataset',
    //           permission: ['-', 'admin', 'superadmin'],
    //           children: [],
    //           url: `/appscreen/dataset`,
    //         },
    //         {
    //           title: 'Report',
    //           key: 'report',
    //           permission: ['-', 'admin', 'superadmin'],
    //           children: [],
    //           url: `/appscreen/report`,
    //         }
    //       ],
    //       isCustomAdd: true,
    //       permission: [element.name, 'admin', 'superadmin'],
    //     }
    //     this.getDashboard(dashboardArray, element, obj.children[0])
    //     this.getDataSet(screenArray, element, obj.children[1]);
    //     // this.getReport(screenArray, element, obj.children[2]);
    //     this.preMenuData.push(obj)
    //   });
    // }
    this.currentArrSubject.next(this.preMenuData);

    return this.currentArrSubject
  }


  // getDataSet(screenArray, element, obj) {
  //   if (element._id === "6050605b1ad41034c109b1bf") {
  //     const name = "gamma"
  //     let screenObj = {
  //       title: "Dashboards",
  //       key: 'iconsFeatherIcons',
  //       permission: ['-', 'admin', 'superadmin'],
  //       url: '/contract/create-contract',
  //       children: [
  //         {
  //           title: 'Dashobaord',
  //           key: 'dashboard',
  //           permission: ['-', 'admin', 'superadmin'],
  //           url: `/appscreen/dashboard`,
  //         }],
  //     }
  //     obj.children.push(screenObj)
  //   }
  //   screenArray.forEach((screenElement, index) => {
  //     if (screenElement.type !== 'search' && screenElement._id !== '6053073f21ed7a40a1a3edcf') {
  //       let permissions = []
  //       if (element._id === "6050605b1ad41034c109b1bf") {
  //         permissions = ['-', '-']
  //       } else { permissions = [screenElement.name + ':all', 'admin', 'superadmin'] }
  //       let screenObj = {
  //         title: screenElement.name,
  //         key: 'iconsFeatherIcons',
  //         permission: [screenElement.name, 'admin', 'superadmin'],
  //         url: '/contract/create-contract',
  //         children: [
  //           {
  //             title: 'Create',
  //             key: 'create',
  //             permission: [screenElement.name + ':create', 'admin', 'superadmin'],
  //             url: `/appscreen/create/${screenElement.name}/${screenElement._id}`,
  //           },
  //           {
  //             title: 'All',
  //             key: 'all',
  //             permission: [screenElement.name + ':all', 'admin', 'superadmin'],
  //             url: `/appscreen/all/${screenElement.name}/${screenElement._id}`,
  //           },
  //           {
  //             title: 'Report',
  //             key: 'report',
  //             permission: permissions,
  //             url: `/appscreen/report/${screenElement.name}/${screenElement.code}`,
  //           },
  //         ],
  //       }
  //       obj.children.push(screenObj)
  //     } else if (screenElement._id === '6053073f21ed7a40a1a3edcf') {
  //       let screenObj = {
  //         title: screenElement.name,
  //         key: 'iconsFeatherIcons',
  //         permission: [screenElement.name, 'admin', 'superadmin'],
  //         url: '/contract/create-contract',
  //         children: [
  //           {
  //             title: 'Contact',
  //             key: 'Contact',
  //             permission: [screenElement.name + ':create', 'admin', 'superadmin'],
  //             url: `/appscreen/create/${screenElement.name}/${screenElement._id}`,
  //           },
  //         ],
  //       }
  //       obj.children.push(screenObj)
  //     } else {
  //       let screenObj = {
  //         title: screenElement.name,
  //         key: 'iconsFeatherIcons',
  //         permission: [screenElement.name, 'admin', 'superadmin'],
  //         url: '/contract/create-contract',
  //         children: [
  //           {
  //             title: 'Search',
  //             key: 'create',
  //             permission: [screenElement.name + ':create', 'admin', 'superadmin'],
  //             url: `/appscreen/create/${screenElement.name}/${screenElement._id}`,
  //           },
  //         ],
  //       }
  //       obj.children.push(screenObj)
  //     }

  //   })
  // }

  // getDashboard(dashboardArray, element, obj) {
  //   dashboardArray.forEach((dashboard) => {
  //     let dashboardObj = {
  //       title: dashboard.name,
  //       key: 'iconsFeatherIcons',
  //       permission: [dashboard.name, 'admin', 'superadmin'],
  //       url: `/appscreen/dashboard/${dashboard._id}`,
  //     }
  //     obj.children.push(dashboardObj);
  //   });
  // }

  /*   getReport(screenArray, element, obj) {
      let dashboardObj = {
        title: 'Report',
        key: 'report',
        permission: [screenElement.name + ':all', 'admin'],
        url: `/appscreen/report/${screenElement.name}/${screenElement.code}`,
      }
      obj.children.push(dashboardObj);
    } */


}
