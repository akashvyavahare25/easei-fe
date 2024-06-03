import { Component, OnInit,AfterViewInit  } from '@angular/core';
import { FormArray, FormBuilder, FormGroup } from '@angular/forms'
import { Validators } from '@angular/forms'
import { ActivatedRoute, Router } from '@angular/router'
import { Location, DatePipe } from '@angular/common';
import { NzNotificationService } from 'ng-zorro-antd'
import { FormBuilderService } from '../../../../../src/app/services/form-builder.service'
import { formioOptions } from './../../../constants/formiOptions'
import * as Reducers from '../../../../../src/app/store/reducers'
import { select, Store } from '@ngrx/store'
import { APIService } from '../../../../../src/app/services/api.service';
import { ScreenService } from '../../../../../src/app/services/screen.service'
import { AppMasterService } from '../../../../../src/app/services/app-master.service'
import { RulesService } from '../../../../../src/app/services/rules.service'
import { ReportService } from '../../../../../src/app/services/report.service'
import { ColDef, GridOptions } from 'ag-grid-community';
import * as moment from 'moment';
import {
  NgbCalendar,
  NgbDate,
  NgbDateStruct,
  NgbInputDatepickerConfig
} from '@ng-bootstrap/ng-bootstrap';
//import * as $ from 'jquery';
// import 'jQuery-QueryBuilder/dist/js/query-builder.standalone.js';
// import 'jQuery-QueryBuilder/dist/js/query-builder.js';
import * as _ from 'lodash'
declare var $: any;
@Component({
  selector: 'app-create-rules',
  templateUrl: './create-rules.component.html',
  styleUrls: ['./create-rules.component.scss']
})
export class CreateRulesComponent implements OnInit,AfterViewInit {
  rulesForm:any
  screensData:any=[]
  listOfApplicationMaste:any=[]
  screenArray:any=[]
  screenConfig:any=[]
  columnDefs: ColDef[]
  rowData: any = []
  gridApi: any;
  gridOptions: any;
  parameter:any
  fields:any={}
  show:Boolean=false
  isVisibleGrid:Boolean=false
  rulesId:Boolean=false
  isSubmit:any
  rules_basic = {
    condition: 'AND',
  rules: [
    {
    id: 'date',
    operator: 'equal',
    value: '1991/11/17'
   },
   {
    id: 'name',
    operator: 'equal',
    value: 'test'
  },
]
};
  
  
  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private formBuilder: FormBuilder,
    private store: Store<any>,
    private appMasterService: AppMasterService,
    private apiService: APIService,
    private screenService: ScreenService,
    private rulesService:RulesService,
    private formBuilderService: FormBuilderService,
    private notification: NzNotificationService,
    private config: NgbInputDatepickerConfig, 
    private reportService:ReportService,
    private datePipe: DatePipe,
    private calendar: NgbCalendar
  ) { 
    this.route.params.subscribe(params => {
      this.rulesId = params['id']
    })
    this.store.pipe(select(Reducers.getSettings)).subscribe(state => {
    this.onFirstDataRendered(this.gridApi);
  })
  this.gridOptions = <GridOptions>{
    context: {
      componentParent: this,
      tabName: 'all-report',
      editPermission: ['-', 'admin', 'superAdmin'],
      deletePermission: ['-', 'admin', 'superAdmin']
    }
  };}

  ngOnInit(): void {
    this.rulesForm = this.formBuilder.group({
      name: ['', Validators.required],
      application: ['', Validators.required],
      screen: ['', Validators.required],     
    })
    this.screenService.getAllScreenData().subscribe(res => {
      this.screensData = res;
      this.appMasterService.getAllAppMasterData().subscribe(res => {
        this.listOfApplicationMaste = res
        if(this.rulesId){            
          this.rulesService.getRulesID(this.rulesId).subscribe(res=>{
            const app = _.filter(this.listOfApplicationMaste, { name:res.appName })
            const  scrData=_.filter(this.screensData, {code:res.dataset})
            this.rulesForm.patchValue({
              name: res.name,
              application: app[0],
              screen: scrData[0]             
            })
            setTimeout(() => {
              $('#builder').queryBuilder('setRulesFromMongo', JSON.parse(res.mongoQuery));
            }, 1500);

          })
        }
      })
    })
    
    
  }
  ngAfterViewInit():void{
    this.getQueryBuilder()
  $('#builder').on('afterUpdateRuleValue.queryBuilder', function(e, rule) {
    if (rule.filter.plugin === 'datepicker') {
      rule.$el.find('.rule-value-container input').datepicker('update');
    }
  });
}
  getQueryBuilder() {
    $('#builder').queryBuilder({
       // plugins: ['bt-tooltip-errors'],
        filters: [{
            id: 'name',
            label: 'Name',
            type: 'string'
        }, 
         {
            id: 'date',
            label: 'Datepicker',
            type: 'date',
            validation: {
              format: 'YYYY/MM/DD'
            },
            plugin: 'datepicker',
            plugin_config: {
              format: 'yyyy/mm/dd',
              todayBtn: 'linked',
              todayHighlight: true,
              autoclose: true
            }
          },],

       // rules: this.rules_basic
    });
    
  }
  resetQuery(){
    $('#builder').queryBuilder('reset');
  }
  selectApps(item){
    this.screenArray=[]
    if (item) {
      this.screenArray = _.filter(this.screensData, { 'application_master': item._id })    
    }
  }
  addScreenConfig(value) {
    if (value) {
      $('#builder').queryBuilder('destroy');  
     let type:any
     let filter=[]
      this.apiService.getSchemaByCode(value.code).subscribe((res: any) => {
        this.screenConfig=res.schema_config
        _.each(res.form_config[0].columns, (sche) => {
          if(sche.components[0].type==="datetime"){
            filter.push({
              id:sche.components[0].key,
              label:sche.components[0].label,
              type: 'date',
            validation: {
              format: 'YYYY/MM/DD'
            },
            plugin: 'datepicker',
            plugin_config: {
              format: 'yyyy/mm/dd',
              todayBtn: 'linked',
              todayHighlight: true,
              autoclose: true
            }
            })
          }
          else if(sche.components[0].type==="number"){
            filter.push({
              id:sche.components[0].key,
              label:sche.components[0].label,
              type:'double'
            })

          }
          else{
            type='string'
            filter.push({
              id:sche.components[0].key,
              label:sche.components[0].label,
              type:type
            })
          }
          
          this.fields[sche.components[0].label] = { name: sche.components[0].label, type:type, }
        })
        $('#builder').on('afterUpdateRuleValue.queryBuilder', function(e, rule) {
          if (rule.filter.plugin === 'datepicker') {
            rule.$el.find('.rule-value-container input').datepicker('update');
          }
        });
        $('#builder').queryBuilder({
          plugins: [
            
          ],
          filters:filter,
        })
    })
  }
}
  testQuery(){
    // var result = $('#builder').queryBuilder('getMongo');  
    // if (!$.isEmptyObject(result)) {
    //   alert(JSON.stringify(result, null, 2));
    // }
    const data = {
      name: this.rulesForm.value.name,
      appName: this.rulesForm.value.application.name,
      screenData: { name: this.rulesForm.value.screen.name, code: this.rulesForm.value.screen.code },
      queryType: 'find',
      config: $('#builder').queryBuilder('getMongo'),
      projectFields:{},  
      groupFields:{},    
      addFields:{},
      lookupFields:{}
    }
    this.reportService.find(data).subscribe(res => {
      this.isVisibleGrid = true;
      if(res.length>0){
         // this.queryResult = JSON.stringify(res[0])
          this.setColumns(res[0])
          this.rowData = res;
      }
      else{
        this.notification.success('NOt Found', 'Record not available')
      }
    })
  }
  submitForm(){
    // this.show=true
    // this.isSubmit=JSON.stringify($('#builder').queryBuilder('getRules'))
    // var result = $('#builder').queryBuilder('getMongo');  
    // if (!$.isEmptyObject(result)) {
    //   alert(JSON.stringify(result, null, 2));
    // }
    const data ={
      name:this.rulesForm.value.name,
      appName:this.rulesForm.value.application.name,
      dataset:this.rulesForm.value.screen.code,
      configuration:JSON.stringify($('#builder').queryBuilder('getRules')),
      mongoQuery:JSON.stringify($('#builder').queryBuilder('getMongo'))
    }
    if(this.rulesId){
      data['_id'] = this.rulesId
      this.rulesService.updateRules(data).subscribe(res =>{
        this.notification.success('Successfully', 'You have successfully update rules!')
        this.router.navigate(['/rules/all'])
      })
    }
    else{
      this.rulesService.saveRules(data).subscribe(res =>{
        this.notification.success('Successfully', 'You have successfully save rules!')
            this.rulesForm.reset()
            this.rowData=[]
            this.isVisibleGrid=false
            $('#builder').queryBuilder('destroy')
            this.getQueryBuilder()
      })
    }
  }
  showQuery(){
    this.show=true
  }
  onFirstDataRendered(params) {
    this.gridApi = params;
    setTimeout(() => {
      if (this.gridApi && this.gridApi.api) {
        this.gridApi.api.sizeColumnsToFit()
      }
    }, 100)
  }

  setColumns(columns) {
    this.columnDefs = []
    const self = this
    Object.keys(columns).forEach(function (key) {
      let definition: ColDef = {}
      if (key === '_id' || key === '__v') {
        definition = { headerName: self.camelToTitleCase(key), field: key, hide: true }
      } else {
        definition = { headerName: self.camelToTitleCase(key), field: key, minWidth: 150, resizable: true, sortable: true, filter: 'agTextColumnFilter', floatingFilter: true, cellRenderer: self.getColoumnValue }
      }
      self.columnDefs.push(definition)
    })
  }

  camelToTitleCase(str) {
    return str
      .replace(/[0-9]{2,}/g, match => ` ${match} `)
      .replace(/[^A-Z0-9][A-Z]/g, match => `${match[0]} ${match[1]}`)
      //.camelTreplace(/[A-Z][A-Z][^A-Z0-9]/g, match => `${match[0]} ${match[1]}${match[2]}`)
      .replace(/[ ]{2,}/g, match => ' ')
      .replace(/\s./g, match => match.toUpperCase())
      .replace(/^./, match => match.toUpperCase())
      .trim()
  }

  isDate(dateStr) {
    if (isNaN(dateStr) && !isNaN(Date.parse(dateStr))) {
      return true
    } else {
      return false
    }
  }

  dateTranform(dateStr) {
    if (dateStr) {
      return this.datePipe.transform(dateStr, 'MM/dd/yyyy')
    } else {
      return null
    }
  }

  getColoumnValue = (params) => {
    if (params.value) {
      if (typeof params.value === 'object') {
        return JSON.stringify(params.value)
      } else {
        return this.isDate(params.value) ? this.dateTranform(params.value) : params.value
      }
    }
  }

}
