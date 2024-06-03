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

@Component({
  selector: 'app-create-master',
  templateUrl: './create-master.component.html',
  styleUrls: ['./create-master.component.scss'],
})
export class CreateMasterComponent implements OnInit {
  masterForm: any
  paramaterId: any = null
  rowData: any
  mastersData:any
  tabs: any = ['Basic', 'Unique Key']
  options: any
  item: any = []
  config: any = []
  gridApi: any
  modalTitle: any =''
  data:any
  tab_id:any
  radioValue:any
  startDate: any
  masterConfigForm:any
  masterConfig_data :any
  masterConfig:any 
  public form: any = { components: [] }
  ismodelvisible:boolean=false
  // data = [
  //   { label: 'tab_rp_enable', value: 'tab_rp_enable' },
  //   { label: 'tab_rp_disp_enable', value: 'tab_rp_disp_enable' },
  //    { label: 'tab_rp_dmp_enable', value: 'tab_rp_dmp_enable' }
  // ];
  columnDefs = [
    { field: 'name', headerName: 'Paramater Name', sortable: true, filter: 'agTextColumnFilter', floatingFilter: true, },
    { field: 'category', headerName: 'Category', filter: 'agTextColumnFilter', floatingFilter: true, },
    { field: 'type', headerName: 'Type', width: 125, filter: 'agTextColumnFilter', floatingFilter: true, },
    {
      field: 'action', headerName: 'Action', width: 60, lockPinned: true,
      cellRenderer: (params) => {
        const eDiv = document.createElement('div')
        const eSpan = document.createElement('span')
        eSpan.innerHTML = '<i class="fa fa-angle-right" aria-hidden="true" title="Add"  style="cursor: pointer;font-size: 18px; color: rgba(0,0,0,.69)"></i>'
        const eSpan1=document.createElement('span')
        eSpan1.innerHTML = '<i class="fa fa-plus" aria-hidden="true" title="Add"  style="cursor: pointer;font-size: 14px; color: rgba(0,0,0,.4); margin-left: 15px"></i>'
        eDiv.appendChild(eSpan)
        eDiv.appendChild(eSpan1)
        eSpan.addEventListener('click', (e) => {
          if (params.data) {
            this.openComponentsData(params.data)
          }
        })
        eSpan1.addEventListener('click', (e) => {
          if (params.data) {
             this.ismodelvisible=true
             this.masterConfig_data=params.data
          this.modalTitle=params.data.name
          }
         
        })
        return eDiv
      }
    }
  ]

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private formBuilder: FormBuilder,
    private formRenderService: FormRenderService,
    private formBuilderService: FormBuilderService,
    private masterService: MasterService,
    private notification: NzNotificationService,
    private store: Store<any>
  ) {
    this.route.params.subscribe(params => {
      this.paramaterId = params['id']
    })
    this.store.pipe(select(Reducers.getSettings)).subscribe(state => {
      this.onFirstDataRendered(this.gridApi);
    })
  }

  ngOnInit(): void {
    this.options = formioOptions
    this.masterConfigForm = this.formBuilder.group({
      eff_date: [''],
      end_date:['']  
    })
    this.masterForm = this.formBuilder.group({
      name: ['', Validators.required],
      code: ['', Validators.nullValidator],
      externalCode: ['', Validators.required],
    //  type: ['', Validators.required],
      description: ['', Validators.required],
      startDate: ['', Validators.required],
      endDate: ['', Validators.required],
     // version: ['', Validators.required],
      tab_rp_disp_enable:[false],
      tab_rp_enable:[false],
      tab_rp_dmp_enable:[false],
      status: ['', Validators.required],
      tableCategory:[''],
      labelName: ['', Validators.required],
      uniqueKey: [[], Validators.nullValidator],
      master:['']
    })

    this.formRenderService.getAllData().subscribe(res => {
      this.rowData = res
    })
    this.masterService.getAllMasterData().subscribe(res => {
      this.mastersData = res
    })

    if (this.paramaterId) {
      this.masterService.getDataById(this.paramaterId).subscribe(res => {
        this.tab_id=res.tab_id
        this.masterForm.patchValue({
          name: res.name,
          code: res.code,
          externalCode: res.externalCode,
          status: res.status,
          category: res.category,
        //  type: res.type,
          description: res.description,
          startDate: res.validity_start_date,
          endDate: res.validity_end_date,
         // version: res.version,
         tableCategory:res.tableCategory,
          tab_rp_disp_enable:res.tab_rp_disp_enable,
          tab_rp_enable:res.tab_rp_enable,
          tab_rp_dmp_enable:res.tab_rp_dmp_enable,
          labelName: res.labelName,
          uniqueKey: res.uniqueKey,
          tab_id:res.tab_id
        })
        _.each(res.configuration, (component) => {
          this.form.components.push(component)
        })

        this.item = this.form.components
      })
    }
  }
  clearScreenConfig(){
    this.form = { components: [] }
    this.item = []
    this.masterForm.get('master').reset()
  }
  addMasterConfig(item){
    if(item&&item.length>0){
      this.masterService.getDataById(item).subscribe(res => {
        _.each(res.configuration, (component) => {
          const cloneData = _.cloneDeep(component)
          const dataAvaiable = _.find(_.cloneDeep(this.form.components), (item) => { return item.key === component.key; });
            if (!dataAvaiable) {
              if (cloneData.type == "radio" || cloneData.type == "datamap" || cloneData.type == "checkbox" || cloneData.type == "file" || cloneData.type == "datagrid") {
              } else {
                this.item.push(cloneData)
                const item = {
                  components: this.item,
                }
                this.form = item
              }
            }
        })
        this.item = this.form.components
      })

    }
  }
  openComponentsData(data): void {    
    const cloneData = _.cloneDeep(data)
    const dataAvaiable = _.find(_.cloneDeep(this.form.components), (item) => { return item.key === data.configuration[0].key; })
    if (!dataAvaiable) {
      if (cloneData.type == "radio" || cloneData.type == "datamap" || cloneData.type == "checkbox" || cloneData.type == "file" || cloneData.type == "datagrid") {
        this.notification.warning('Warning', 'This parameter not allowed to define master')
      } else {
        cloneData.configuration.forEach(element => {
        if(this.masterConfig)  {
          element.masterConfig={
            "eff_date":this.masterConfig.eff_date,
            "end_date":this.masterConfig.end_date 
          }}
         
          this.item.push(element)
        })
        const item = {
          components: this.item,
          
        }
        this.form = item

      }
    }
    else {
      this.notification.info('Info', data.name + ' parameter is already added')
    }
  }
  submit (){
    this.masterConfig=
    {
      eff_date:this.masterConfigForm.value.eff_date,
    end_date:this.masterConfigForm.value.end_date 
  }
 
    this.masterConfigForm.reset();
       }
  submitForm() {
    this.markFormGroupDirty(this.masterForm)
    if (this.masterForm.valid) {
      if (this.form.components.length > 0) {
        if (this.paramaterId) {
          const data = {
            name: this.masterForm.value.name,
            code: this.masterForm.value.code,
            externalCode: this.masterForm.value.externalCode,
            // type: this.masterForm.value.type,
            description: this.masterForm.value.description,
            validity_start_date: this.masterForm.value.startDate,
            validity_end_date: this.masterForm.value.endDate,
            // version: this.masterForm.value.version,
            tab_rp_disp_enable:this.masterForm.value.tab_rp_disp_enable,
            tab_rp_enable:this.masterForm.value.tab_rp_enable,
            tab_rp_dmp_enable:this.masterForm.value.tab_rp_dmp_enable,
            tableCategory:this.masterForm.value.tableCategory,
            status: this.masterForm.value.status,
            configuration: this.form.components,
            labelName: this.masterForm.value.labelName,
            uniqueKey: this.masterForm.value.uniqueKey,
            _id: this.paramaterId,
            tab_id:this.tab_id


          }
          this.masterService.updateMasterData(data).subscribe(res => {
            this.notification.success('Successfully', 'You have successfully update master!')
            this.masterForm.reset()
            setTimeout(() => {
              this.form = { components: [] }
              this.item = []
            }, 300)
            setTimeout(() => { this.router.navigate(['/master/all']) }, 700)
          },err=>{
            this.notification.error('Error', err.error.errorMessage)
          })
        } else {
          const data = {
            name: this.masterForm.value.name,
            code: this.masterForm.value.code,
            externalCode: this.masterForm.value.externalCode,
            // type: this.masterForm.value.type,
            description: this.masterForm.value.description,
            validity_start_date: this.masterForm.value.startDate,
            validity_end_date: this.masterForm.value.endDate,
            // version: this.masterForm.value.version,
            tab_rp_disp_enable:this.masterForm.value.tab_rp_disp_enable,
            tab_rp_enable:this.masterForm.value.tab_rp_enable,
            tab_rp_dmp_enable:this.masterForm.value.tab_rp_dmp_enable,
            tableCategory:this.masterForm.value.tableCategory,
            status: this.masterForm.value.status,
            labelName: this.masterForm.value.labelName,
            uniqueKey: this.masterForm.value.uniqueKey,
            configuration: this.form.components,
          }
          this.masterService.saveMasterData(data).subscribe(res => {
            this.notification.success('Successfully', 'You have successfully save master!')
            this.masterForm.reset()
            setTimeout(() => {
              this.form = { components: [] }
              this.item = []
            }, 300)
          },err=>{
            this.notification.error('Error', err.error.errorMessage)
          })
        }
      } else {
        this.notification.warning('Warning', 'master configuration is empty')
      }
    }
  }

  clearForm() {
    this.form = { components: [] }
    this.item = []
    this.masterForm.reset()
  }
  cancelModal(){
    this.ismodelvisible=false
    }
   
  cancelEdit() {
    this.router.navigate(['drone/master/all'])
  }

  onFirstDataRendered(params) {
    this.gridApi = params;
    setTimeout(() => {
      if (this.gridApi && this.gridApi.api) {
        this.gridApi.api.sizeColumnsToFit()
      }
    }, 100)
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

  disabledStartDate = (startValue: Date): boolean => {
    if (!startValue || !this.masterForm.value.endDate) {
      return false;
    }
    return startValue.getTime() > this.masterForm.value.endDate.getTime();
  };

  disabledEndDate = (endValue: Date): boolean => {
    if (!endValue || !this.masterForm.value.startDate) {
      return false;
    }
    return endValue.getTime() <= this.masterForm.value.startDate.getTime()
  };
}
