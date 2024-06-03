import { OnInit, ViewChild } from '@angular/core'
import { FormBuilder, Validators } from '@angular/forms'
import { NzNotificationService } from 'ng-zorro-antd'
import { NzDatePickerComponent } from 'ng-zorro-antd/date-picker';
import { FormBuilderService } from '../../../../../src/app/services/form-builder.service'
import { FormRenderService } from '../../../../../src/app/services/form-render.service'
import { formioOptions } from './../../../constants/formiOptions'
import { MasterService } from '../../../../../src/app/services/master.service'
import { ActivatedRoute, Router } from '@angular/router'
import { select, Store } from '@ngrx/store'
import * as Reducers from '../../../../../src/app/store/reducers'
import * as _ from 'lodash'
import { Component } from '@angular/core';
import { APIService } from '../../../services/api.service';

@Component({
  selector: 'app-master-permission',
  templateUrl: './master-permission.component.html',
  styleUrls: ['./master-permission.component.scss']
})
export class MasterPermissionComponent implements OnInit {
  paramaterId: any = null
  plantLayoutForm: any
  userList:any 
  masterList;
  options: any
  constructor(
    private route: ActivatedRoute,
    private formBuilder: FormBuilder,
    private apiService: APIService,
  ) {
    this.route.params.subscribe(params => {
      this.paramaterId = params['id']
    })
   }

  ngOnInit(): void {
    this.options = formioOptions 
    this.plantLayoutForm = this.formBuilder.group({ 
      user:[''],
    })
    this.apiService.getAllUsers().subscribe(res =>{
      this.userList = res;
    })
    this.getMasters();
  }

  getMasters(){
    this.apiService.getAllMasters().subscribe(res =>{
      this.masterList = res;
      console.log(this.masterList)
    })
  }
}
