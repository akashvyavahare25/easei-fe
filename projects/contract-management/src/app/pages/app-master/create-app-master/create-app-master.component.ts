import { Component, OnInit } from '@angular/core'
import { FormBuilder, Validators } from '@angular/forms'
import { NzNotificationService } from 'ng-zorro-antd'
import { NzModalService } from 'ng-zorro-antd/modal';
import { FormBuilderService } from '../../../../../src/app/services/form-builder.service'
import { FormRenderService } from '../../../../../src/app/services/form-render.service'
import { formioOptions } from './../../../constants/formiOptions'
import * as _ from 'lodash'
import { AppMasterService } from '../../../../../src/app/services/app-master.service'
import * as moment from 'moment'
import differenceInCalendarDays from 'date-fns/differenceInCalendarDays'
import { ActivatedRoute, Router } from '@angular/router'
import { MenuService } from '../../../../../src/app/services/menu';

@Component({
  selector: 'app-create-app-master',
  templateUrl: './create-app-master.component.html',
  styleUrls: ['./create-app-master.component.scss'],
})
export class CreateAppMasterComponent implements OnInit {
  appMasterForm: any
  appMasterId: any = null

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private formBuilder: FormBuilder,
    private appMasterService: AppMasterService,
    private notification: NzNotificationService,
    private menuService: MenuService
  ) {
    this.route.params.subscribe(params => {
      this.appMasterId = params['id']
    })
  }

  ngOnInit(): void {
    this.appMasterForm = this.formBuilder.group({
      name: ['', Validators.required],
      status: ['', Validators.required],
      description: ['', Validators.required],
    })

    if (this.appMasterId) {
      this.appMasterService.getDataById(this.appMasterId).subscribe(res => {
        this.appMasterForm.patchValue({
          name: res.name,
          status: res.status,
          description: res.description,
        })

      })
    }
  }

  submitForm() {
    this.markFormGroupDirty(this.appMasterForm)
    if (this.appMasterForm.valid) {
      if (this.appMasterId) {
        const data = {
          name: this.appMasterForm.value.name,
          status: this.appMasterForm.value.status,
          description: this.appMasterForm.value.description,
          _id: this.appMasterId
        }
        this.appMasterService.updateAppMasterData(data).subscribe(res => {
          this.notification.success('Successfully', 'You have successfully update Application Master!')
          this.appMasterForm.reset()
          this.menuService.getMenuData();
          setTimeout(() => { this.router.navigate(['/appmaster/all']) }, 700)
        })
      } else {
        const data = {
          name: this.appMasterForm.value.name,
          status: this.appMasterForm.value.status,
          description: this.appMasterForm.value.description,
        }
        this.appMasterService.saveAppMasterData(data).subscribe(res => {
          this.menuService.getMenuData();
          this.notification.success('Successfully', 'You have successfully save Application Master!')
          this.appMasterForm.reset()
        })
      }
    }
  }


  clearForm() {
    this.appMasterForm.reset()
  }

  cancelEdit() {
    this.router.navigate(['/appmaster/all'])
  }

  // onFirstDataRendered(params) {
  //   params.api.sizeColumnsToFit()
  // }

  markFormGroupDirty(form) {
    (<any>Object).values(form.controls).forEach(control => {
      control.markAsDirty()
      control.updateValueAndValidity()
      if (control.controls) {
        this.markFormGroupDirty(control)
      }
    })
  }
}
