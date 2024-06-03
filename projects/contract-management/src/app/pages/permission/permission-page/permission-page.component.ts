import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router'
import { FormBuilder, FormArray, Validators, FormGroup, FormControl } from '@angular/forms'
import { NzNotificationService } from 'ng-zorro-antd'
import { MasterService } from '../../../../../src/app/services/master.service'
import { AppMasterService } from '../../../../../src/app/services/app-master.service'
import { AppScreenService } from '../../../../../src/app/services/app-screen.service'
import { APIService } from '../../../../../src/app/services/api.service'
import { ScreenService } from '../../../../../src/app/services/screen.service'
import { ApprovalService } from '../../../../../src/app/services/approval-service'
import { select, Store } from '@ngrx/store'
import * as Reducers from '../../../../../src/app/store/reducers'
import * as _ from 'lodash'
import { PermissionService } from '../../../../../src/app/services/permission.service';

@Component({
  selector: 'app-permission-page',
  templateUrl: './permission-page.component.html',
  styleUrls: ['./permission-page.component.scss']
})
export class PermissionPageComponent implements OnInit {
  appMastersData: any = []
  screensData: any = []
  screenArray: any = []
  masterData: any = []
  permissonForm: any
  configurationList: any = ['parameter', 'define master', 'screen', 'application master']
  loading: boolean = true;
  permissionId: any;
  previousRole: any;
  constructor(
    private appMasterService: AppMasterService,
    private notification: NzNotificationService,
    private screenService: ScreenService,
    private formBuilder: FormBuilder,
    private permissionService: PermissionService,
    private apiService: APIService
  ) { }

  ngOnInit(): void {
    this.appMasterService.getAllAppMasterData().subscribe(res => {
      this.appMastersData = res;
      this.screenService.getAllScreenData().subscribe(res => {
        this.screensData = res;
        this.apiService.getAllMasters().subscribe(res => {
          this.masterData = res
          this.previousRole = 'user';
          this.permissonForm = this.formBuilder.group({
            role: ['user', Validators.required],
            configPermission: this.formBuilder.array(this.configPermission([])),
            mastersPermissoin: this.formBuilder.array(this.mastersPermission([])),
            appsPermissoin: this.formBuilder.array(this.appsPermissoin([]))
          });
        });
        this.permissionService.getPermissionByRole('user').subscribe(res => {
          if (res) {
            setTimeout(() => {
              this.loading = false;
              this.permissionId = res._id;
              this.permissonForm.patchValue(res);
              _.each(res.appsPermissoin, (list, index) => {
                if (list.value) {
                  const temp = _.find(this.appMastersData, (o) => { return o.name === list.name; });
                  if (temp) {
                    this.newAddApplicaton(list, index)
                  }
                }
              })
            }, 1000)
          } else  {
            this.loading = false;
          }
        }, err => {
          this.loading = false;
        });
      })
    })
  }

  changeRole() {
    if (this.permissonForm.get('role').value !== this.previousRole) {
      this.permissionService.getPermissionByRole(this.permissonForm.get('role').value).subscribe(res => {
        if (res) {
          this.previousRole = res.role;
          this.permissionId = res._id;
          this.loading = false
          this.permissonForm = this.formBuilder.group({
            role: [this.permissonForm.get('role').value, Validators.required],
            configPermission: this.formBuilder.array(this.configPermission([])),
            mastersPermissoin: this.formBuilder.array(this.mastersPermission([])),
            appsPermissoin: this.formBuilder.array(this.appsPermissoin([]))
          });
          setTimeout(() => {
            this.permissonForm.patchValue(res);
            _.each(res.appsPermissoin, (list, index) => {
              if (list.value) {
                const temp = _.find(this.appMastersData, (o) => { return o.name === list.name; });
                if (temp) {
                  this.newAddApplicaton(list, index)
                }
              }
            })
          }, 700)
        } else {
          this.loading = false
          this.previousRole = this.permissonForm.get('role').value;
          this.permissionId = null;
          this.permissonForm = this.formBuilder.group({
            role: [this.permissonForm.get('role').value, Validators.required],
            configPermission: this.formBuilder.array(this.configPermission([])),
            mastersPermissoin: this.formBuilder.array(this.mastersPermission([])),
            appsPermissoin: this.formBuilder.array(this.appsPermissoin([]))
          });
        }
      });
    }
  }

  configPermission(response) {
    const approvalArray = [];
    _.each(this.configurationList, (configuration) => {
      const formGroup = new FormGroup({});
      formGroup.addControl('name', new FormControl(configuration, Validators.required));
      formGroup.addControl('create', new FormControl(false, Validators.required));
      formGroup.addControl('edit', new FormControl(false, Validators.required));
      formGroup.addControl('delete', new FormControl(false, Validators.required));
      formGroup.addControl('list', new FormControl(false, Validators.required));
      formGroup.addControl('view', new FormControl(false, Validators.required));
      approvalArray.push(formGroup);
    })
    return approvalArray;
  }

  mastersPermission(response) {
    const approvalArray = [];
    _.each(this.masterData, (master) => {
      const formGroup = new FormGroup({});
      formGroup.addControl('name', new FormControl(master.name, Validators.required));
      formGroup.addControl('create', new FormControl(false, Validators.required));
      formGroup.addControl('edit', new FormControl(false, Validators.required));
      formGroup.addControl('delete', new FormControl(false, Validators.required));
      /* formGroup.addControl('list', new FormControl(false, Validators.required)); */
      formGroup.addControl('view', new FormControl(false, Validators.required));
      approvalArray.push(formGroup);
    })
    return approvalArray;
  }

  appsPermissoin(response) {
    const approvalArray = [];
    _.each(this.appMastersData, (appMaster) => {
      const formGroup = new FormGroup({});
      formGroup.addControl('_id', new FormControl(appMaster._id, Validators.required));
      formGroup.addControl('name', new FormControl(appMaster.name, Validators.required));
      formGroup.addControl('value', new FormControl(false, Validators.required));
      formGroup.addControl('screen', this.formBuilder.array([]));
      approvalArray.push(formGroup);
    })
    return approvalArray;
  }

  addApplicaton(item, index) {
    const screens = this.permissonForm.get('appsPermissoin').controls[index].get('screen');
    if (item.value) {
      const screenData = _.filter(this.screensData, { 'application_master': item._id });
      _.each(screenData, (screen) => {
        const formGroup = new FormGroup({});
        formGroup.addControl('name', new FormControl(screen.name, Validators.required));
        formGroup.addControl('_id', new FormControl(screen._id, Validators.required));
        formGroup.addControl('create', new FormControl(false, Validators.required));
        formGroup.addControl('edit', new FormControl(false, Validators.required));
        formGroup.addControl('delete', new FormControl(false, Validators.required));
        formGroup.addControl('list', new FormControl(false, Validators.required));
        formGroup.addControl('view', new FormControl(false, Validators.required));
        screens.push(formGroup);
      })
    } else {
      while (screens.length !== 0) {
        screens.removeAt(0)
      }
    }
  }


  newAddApplicaton(item, index) {
    const screenData = _.filter(this.screensData, { 'application_master': item._id });
    const screens = this.permissonForm.get('appsPermissoin').controls[index].get('screen');
    _.each(screenData, (screen, index) => {
      const formGroup = new FormGroup({});
      const temp = _.find(item.screen, (o) => { return o._id === screen._id; });
      formGroup.addControl('name', new FormControl(temp ? temp.name : screen.name, Validators.required));
      formGroup.addControl('_id', new FormControl(temp ? temp._id : screen._id, Validators.required));
      formGroup.addControl('create', new FormControl(temp ? temp.create : false, Validators.required));
      formGroup.addControl('edit', new FormControl(temp ? temp.edit : false, Validators.required));
      formGroup.addControl('delete', new FormControl(temp ? temp.delete : false, Validators.required));
      formGroup.addControl('list', new FormControl(temp ? temp.list : false, Validators.required));
      formGroup.addControl('view', new FormControl(temp ? temp.view : false, Validators.required));
      screens.push(formGroup);
    })
  }

  submitForm() {
    this.markFormGroupDirty(this.permissonForm);
    if (this.permissonForm.valid) {
      if (!this.permissionId) {
        this.permissionService.saveUserPermisson(this.permissonForm.value).subscribe(res => {
          this.notification.success('Successfully', 'You have successfully save permission!')
        });
      } else {
        const data = _.cloneDeep(this.permissonForm.value);
        data._id = this.permissionId
        this.permissionService.updateUserPermisson(data).subscribe(res => {
          this.notification.success('Successfully', 'You have successfully update permission!')
        });
      }
    }
  }

  clearForm() {
    this.permissonForm.reset()
  }

  markFormGroupDirty(form) {
    (<any>Object).values(form.controls).forEach(control => {
      control.markAsDirty()
      control.updateValueAndValidity()
      if (control.controls) {
        this.markFormGroupDirty(control)
      }
    })
  }

  getName(name) {
    return _.upperFirst(name);
  }
}
