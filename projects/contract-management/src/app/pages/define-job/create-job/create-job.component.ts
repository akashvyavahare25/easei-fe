import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core'
import { FormBuilder, Validators, FormArray, FormGroup, FormControl } from '@angular/forms'
import { NzModalService } from 'ng-zorro-antd/modal';
import { NzNotificationService } from 'ng-zorro-antd';
import { FormRenderService } from '../../../../../src/app/services/form-render.service';
import { formioOptions } from '../../../constants/formiOptions'
import { InterfaceService } from '../../../../../src/app/services/interface.service'
import { JobService } from '../../../../../src/app/services/job.service'
import { ActivatedRoute, Router } from '@angular/router'
import { select, Store } from '@ngrx/store'
// import * as _ from 'src/app/pages/define-job/all-job/node_modules/lodash'
import * as Reducers from '../../../../../src/app/store/reducers'
import { CronOptions } from 'cron-editor/lib/CronOptions';
@Component({
  selector: 'app-create-job',
  templateUrl: './create-job.component.html',
  styleUrls: ['./create-job.component.scss'],
})
export class CreateJobComponent implements OnInit {
  jobId: any;
  value: any;
  iForm: any;
  options: any;
  gridApi: any;
  responseData: any;
  responseError: any;
  requestBody: any;
  dynamicInterface: boolean = false;
  interfaceColumnArray: any = [];
  interfaceData: any;
  listOfInterface: any = []
  // formBuilder: any;
  cronExpression = '4 3 2 12 1/1 *';
  isCronDisabled = false;
  cronOptions: CronOptions = {
    formInputClass: 'form-control cron-editor-input',
    formSelectClass: 'form-control cron-editor-select',
    formRadioClass: 'cron-editor-radio',
    formCheckboxClass: 'cron-editor-checkbox',
    defaultTime: '10:00:00',
    use24HourTime: true,
    hideMinutesTab: false,
    hideHourlyTab: false,
    hideDailyTab: false,
    hideWeeklyTab: false,
    hideMonthlyTab: false,
    hideYearlyTab: false,
    hideAdvancedTab: false,
    hideSeconds: false,
    removeSeconds: false,
    removeYears: true
  };


  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private formBuilder: FormBuilder,
    private formRenderService: FormRenderService,
    private notification: NzNotificationService,
    private modal: NzModalService,
    private interfaceService: InterfaceService,
    private jobService: JobService,
    private store: Store<any>

  ) {
    this.route.params.subscribe(params => {
      this.jobId = params['id']
    })
    this.store.pipe(select(Reducers.getSettings)).subscribe(state => {
      this.onFirstDataRendered(this.gridApi);
    })
  }
  
  onFirstDataRendered(params) {
    this.gridApi = params;
    // setTimeout(() => {
    //   if (this.gridApi && this.gridApi.api) {
    //     this.gridApi.api.sizeColumnsToFit()
    //   }
    // }, 100)
  }

  

  ngOnInit(): void {
    this.options = formioOptions
    this.iForm = this.formBuilder.group({
      iname: [''],
      name: ['', Validators.required],
      itype: [''],
      type: ['', Validators.required],
      itable: ['', Validators.required],
      interfaces: ['', Validators.required],
      iColm:['']
    })

    this.interfaceService.getAllInterfaceData().subscribe(res => {
      this.listOfInterface = res
    })
   
  }

  addTypeInEditor(type) {
    console.log('type', type)
    if (type === "Interface") {
      this.dynamicInterface = true
    }
  }


  selectInterface(item) {
    if (item) {
      this.iForm.patchValue({
        itype: item.interfaceType,
      }); 
    }
  }

  submitForm(){
    this.markFormGroupDirty(this.iForm)
    if (this.iForm.valid) {
          const data = {
            name: this.iForm.value.name,
            cron_exp: this.cronExpression.toString().replace('?','*'),
            type: this.iForm.value.type,
            process: { interfacename: this.iForm.value.interfaces.name, table: this.iForm.value.itable},
          }

          this.jobService.saveJobData(data).subscribe(res => {
            this.notification.success('Successfully', 'You have successfully Job data!')
            this.iForm.reset()
            this.responseData = '';
            this.responseError = '';
          })
      } 

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

}