import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router'
import { ScreenService } from '../../../../../src/app/services/screen.service';
import { select, Store } from '@ngrx/store'
import * as Reducers from '../../../../../src/app/store/reducers'
import * as _ from 'lodash'
import { AppMasterService } from '../../../../../src/app/services/app-master.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  imageSrc: string = '/assets/images/experian_logo.png';
  userPermission: any;
  dataArray: any = [];
  userData: any;
  isShown: boolean = false;
  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private screenService: ScreenService,
    private store: Store<any>,
    private appMasterService: AppMasterService
  ) {/* this.router.navigate(['appscreen/dashboard']) */
    this.userPermission = JSON.parse(localStorage.getItem("permissionData"));
    this.store.pipe(select(Reducers.getUser)).subscribe(state => {
      this.userData = state;
    });
  }

  ngOnInit(): void {
    // this.appMasterService.getAllAppMasterData().subscribe(responseApp => {
    //   responseApp.forEach((element, index) => {
    //     this.screenService.getAllScreenData().subscribe(response => {
    //       setTimeout(() => { this.isShown = true; }, 1000);
    //       const data = {
    //         application: element,
    //         screen: []
    //       }
    //       let screenArray = _.filter(response, { 'application_master': element._id });
    //       _.each(screenArray, (res) => {
    //         if (_.includes(this.userPermission, res.name) || this.userData.role === 'admin' || this.userData.role === 'superadmin') {
    //           data.screen.push(res);
    //         }
    //       });
    //       this.dataArray.push(data);
    //     });

    //   });
    // });

  }

  openReport(data) {
    // this.router.navigate(['appscreen/report/' + data.name + '/' + data.code]);
  }

}
