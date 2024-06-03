import { Component, HostListener, OnDestroy, OnInit, AfterViewInit, ChangeDetectorRef } from '@angular/core'
import { Location, DatePipe } from '@angular/common';
import { FormArray, FormBuilder, FormGroup } from '@angular/forms'
import { Validators } from '@angular/forms'
import { ActivatedRoute, Router } from '@angular/router'
import { NzNotificationService } from 'ng-zorro-antd'
import { FormBuilderService } from '../../../../../src/app/services/form-builder.service'
import { formioOptions } from './../../../constants/formiOptions'
import * as Reducers from '../../../../../src/app/store/reducers'
import { select, Store } from '@ngrx/store'
import { APIService } from '../../../../../src/app/services/api.service';
import { ScreenService } from '../../../../../src/app/services/screen.service'
import { AppMasterService } from '../../../../../src/app/services/app-master.service'
import { ReportService } from '../../../../../src/app/services/report.service'
import { ColDef, GridOptions } from 'ag-grid-community';
import * as _ from 'lodash'
import { FormControl } from '@angular/forms';
import { group } from '@angular/animations';
import { join } from '@angular/compiler-cli/src/ngtsc/file_system';
declare var WebDataRocks: any;
@Component({
  selector: 'app-create-report',
  templateUrl: './create-report.component.html',
  styleUrls: ['./create-report.component.scss']
})
export class CreateReportComponent implements OnInit {
  reportForm: any
  pivot: any
  pivoteDataArray:any=[]
  addFieldForm: any
  columnDefs: ColDef[]
  isPivote:any
  rowData: any = []
  gridApi: any;
  gridOptions: any;
  screensData: any = []
  screenArray: any = null
  listOfApplicationMaste: any = []
  paramaterId: any = null;
  paramData: any = null;
  editorOptions = { theme: 'vs-dark', language: 'javascript' };
  value: string = ' ';
  isVisible: boolean = false;
  isVisibleGrid: boolean = false;
  isVisibles: boolean = false;
  isVisibleProjection: boolean = false;
  isVisibleGrouping: boolean = false;
  val: any;
  schemaConfig: boolean = false
  queryResult: any;
  schemaData: any = [];
  draggableData: any = [];
  groupingData: any = []
  draggableList: any = [];
  groupingList: any = [];
  addField: any = [];
  loading: boolean = true;
  tempItem: any = [];
  dndListSettings: any = {
    horizontal: false
  }
  joinData: any = []
  parameters: any = []
  selectedParms: any
  pivotFlag: boolean = false;
  schema_config: any;
  selectedConfig: any;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private formBuilder: FormBuilder,
    private store: Store<any>,
    private appMasterService: AppMasterService,
    private apiService: APIService,
    private screenService: ScreenService,
    private formBuilderService: FormBuilderService,
    private notification: NzNotificationService,
    private reportService: ReportService,
    private datePipe: DatePipe,
  ) {
    this.route.params.subscribe(params => {
      this.paramaterId = params['id']
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
    };
  }

  ngOnInit(): void {
    this.reportForm = this.formBuilder.group({
      name: ['', Validators.required],
      application: ['', Validators.required],
      screen: [[], Validators.required],
      type: ['', Validators.required],
/*       editor: [[], Validators.required], */
      join: this.formBuilder.group({
        screen1: [''],
        screen2: ['']
      }),
    /*   groupField: this.formBuilder.array([]) */
    })
    this.screenService.getAllScreenData().subscribe(res => {
      this.screensData = res;
      this.appMasterService.getAllAppMasterData().subscribe(res => {
        this.listOfApplicationMaste = res
        this.loading = false;
        if (this.paramaterId) {
          let scrData = []
          this.reportService.getReports().subscribe(res => {
            this.paramData = _.filter(res, { _id: this.paramaterId })
            const app = _.filter(this.listOfApplicationMaste, { name: this.paramData[0].appName })
            scrData.push(_.filter(this.screensData, { name: this.paramData[0].screenData.name })[0])
            if (this.paramData[0].lookupFields) {
              scrData.push(_.filter(this.screensData, { code: this.paramData[0].lookupFields.from })[0])
            }
            this.reportForm.patchValue({
              name: this.paramData[0].name,
              application: app[0],
              screen: scrData,
              type: this.paramData[0].queryType,

            })

            if (this.paramData[0].lookupFields) {
              this.reportForm.get("join").patchValue({
                screen1: this.paramData[0].lookupFields.localField,
                screen2: this.paramData[0].lookupFields.foreignField
              })
            }
            if (this.paramData[0].projectFields && Object.keys(this.paramData[0].projectFields).length > 0) {
              const val = Object.keys(this.paramData[0].projectFields)
              _.each(val, (sche) => {
                if (sche != '_id') {
                 let splitedArray= sche.split('_')
                 if(splitedArray.length>1)
                 {
                  const obj = {
                    property: splitedArray[1],
                    type: splitedArray[0]
                  }
                  this.draggableList.push(obj)
                 }
                 else
                 {
                  const obj = {
                    property: sche
                    }
                  this.draggableList.push(obj)
                 }
                 
                }
              })
            }
            if (this.paramData[0].groupFields && Object.keys(this.paramData[0].groupFields).length > 0) {
              const val = Object.keys(this.paramData[0].groupFields._id)
              _.each(val, (sche) => {
                if (sche != '_id') {
                  const key = {
                    property: sche,
                    type: 'sum',
                  }
                  this.groupingList.push(key)
                }
              })
            }
            if (this.paramData[0].addFields && this.paramData[0].addFields.length > 0) {
              _.each(this.paramData[0].addFields, (field) => {
                _.each(field.function.arg, (arg, index) => {
                  field.function.arg[index] = arg.substring(1)
                })
                this.draggableList.push(field)
                this.addFieldForm = this.formBuilder.group({
                  property: ['', Validators.required],
                  function: this.formBuilder.group({
                    body: [''],
                    arg: [[], new FormControl('')]
                  })
                })
              })

            }
            setTimeout(() => {
              if (this.paramData[0].config && !_.isEmpty(this.paramData[0].config) && !(this.paramData[0].queryType == "aggregate+field")) {
                this.value = this.paramData[0].config
              }
            }, 500);
          });

        }
      })

    });


  }

  testQuery() {
    this.pivoteDataArray=[]
    this.pivotFlag = false
    this.isPivote=''
    let addField: any
    let lookupFields: any = {}
    /* const projectField: any = {} */
    let groupingField: any = {}
    const project = { _id: 0 };
    const group = { _id: {} };
    if (this.joinData.length > 1) {
      lookupFields = {
        from: this.joinData[1].code,
        localField: this.joinData[0].property[0],
        foreignField: this.joinData[1].property[0],
        as: this.joinData[0].name + '_' + this.joinData[1].name
      }
    }
    this.rowData = []
    const isAvaiable = _.find(this.draggableList, (list) => {
      return list.type === 'sum' || list.type === 'avg' || list.type === 'count';
    });

    if (this.isVisibleProjection) {
      if (isAvaiable) {
        _.each(this.draggableList, (list) => {
          if (list.type === 'sum') {
            group['sum_' + list.property] = { ___sum: '___' + list.property };
            project['sum_' + list.property] = 1;
          } else {
            if (list.type === 'avg') {
              group['avg_' + list.property] = { ___avg: '___' + list.property };
              project['avg_' + list.property] = 1;
            } else {
              if (list.type === 'count') {
                group['count'] = { ___sum: 1 };
                project['count'] = 1;
              } else {
                group._id[list.property] = '___' + list.property;
                project[list.property] = '____id.' + list.property;
              }
            }
          }
        });
      } else {
        _.each(this.draggableList, (list) => {
          project[list.property] = 1;
        });
      }

      /* 
            console.log('projecttttttttttt', data); */
      /*  addField = arr[0]
       if (this.draggableList.length > 0) {
         projectField['_id'] = 0;
       }
       _.each(arr[1], (sche) => {
         if (this.groupingList.length > 0) {
           projectField[sche.property] = '$_id.' + sche.property
         }
         else {
           projectField[sche.property] = '$' + sche.property
         }
         projectField['count'] = 1
       })
       _.each(arr[0], (sche) => {
         _.each(sche.function.arg, (args, index) => {
           sche.function.arg[index] = '$' + args
         })
       }) */

    }
    if (this.groupingList.length > 0) {
      _.each(this.groupingList, (sche) => {
        groupingField[sche.property] = '___' + sche.property
      })
      groupingField = { "____id": groupingField, "count": { "___sum": 1 } }
    }

    this.value = this.value.replace(/'/g, '"')
    
    const data = {
      name: this.reportForm.value.name,
      appName: this.reportForm.value.application.name,
      screenData: { name: this.reportForm.value.screen[0].name, code: this.reportForm.value.screen[0].code },
      queryType: this.reportForm.value.type,
      config: JSON.parse(this.value),
      projectFields: this.reportForm.value.type === "aggregate+field" ? project : {},
      groupFields: isAvaiable ? group : {},
      addFields: addField,
      lookupFields: lookupFields
    }

    if (this.reportForm.value.type === "find") {
      this.pivoteDataArray=[]
      this.reportService.find(data).subscribe(res => {
        if (res.length > 0) {
          this.isVisibleGrid = true;
         
          let  keyArray=[];
          let uniqueElement = _.uniqWith(res, _.isEqual);
          _.each(uniqueElement,(ele)=>{
             let unique=Object.keys(ele)
             _.each(unique,(o)=>{
              keyArray.push(o)
             })
          })
         
         let  uniqueArray = _.uniqWith(keyArray, _.isEqual);
            _.each(res,(ele)=>{
              let  column:any={}
              _.each(uniqueArray,(key)=>{
                if(ele[key]){
                  column[key]=ele[key]
                }
                else{
                  column[key]=" "
                }
              })
              this.pivoteDataArray.push(column)
              
            })
          //  console.log(this.pivoteDataArray)
          this.setColumns(this.pivoteDataArray[0])
          this.rowData = this.pivoteDataArray;
          this.queryResult =this.pivoteDataArray
        }
        else if (res.length === 0) {
          this.notification.success('NOt Found', 'Record not available')
        }
      });
    }
    else {
      this.reportService.aggregate(data).subscribe(res => {
        let  keyArray=[];
        this.pivoteDataArray=[]
          let uniqueElement = _.uniqWith(res, _.isEqual);
          _.each(uniqueElement,(ele)=>{
             let unique=Object.keys(ele)
             _.each(unique,(o)=>{
              keyArray.push(o)
             })
          })
         
         let  uniqueArray = _.uniqWith(keyArray, _.isEqual);
            _.each(res,(ele)=>{
              let  column:any={}
              _.each(uniqueArray,(key)=>{
                if(ele[key]){
                  column[key]=ele[key]
                }
                else{
                  column[key]=" "
                }
              })
              this.pivoteDataArray.push(column)
              
            })
        this.queryResult = this.pivoteDataArray

        this.isVisibleGrid = true;
        this.setColumns(this.pivoteDataArray[0])
        this.rowData =this.pivoteDataArray;
      });
    }
  }

  selectScreens(item) {
    this.screenArray = []
    if (item) {
      this.screenArray = _.filter(this.screensData, { 'application_master': item._id })
      // const screen = this.reportForm.get('screen');
      // screen.setValue('');
      // screen.updateValueAndValidity();
    }
  }

  removeChips(value, index: any) {
    value.function.arg.splice(index, 1)
    this.tempItem.splice(index, 1)
    value.function.body = 'function(' + value.function.arg + '){}'
    this.val = value
  }
  removeItem(item: any, list: any[]): void {
    list.splice(list.indexOf(item), 1);
  }

  addScreenConfig(value) {
    if (value && value.length > 0) {
      // let join=this.reportForm.get("join") as FormArray      
      // this.reportForm.updateValueAndValidity();      
      this.draggableData = [];
      this.groupingData = [];
      this.groupingList = []
      this.draggableList = [];
      this.addField = []
      this.schemaData = []
      this.parameters = []
      _.each(value, (val, index) => {
        this.apiService.getSchemaByCode(val.code).subscribe((res: any) => {
          if (res.schema_config) {
            // var ob = JSON.stringify(res.form_config[0].columns);
            this.schema_config = res.schema_config;
            _.each(this.schema_config, (data, key) => {
              data.key = key;
            });
            this.schemaConfig = true
            const schema = Object.keys(res.schema_config)
            _.each(schema, (sche) => {
              const obj = {
                /* label: sche, */
                property: sche
              }
              const key = {
                /* label: sche, */
                property: sche,
                type: 'sum',
              }
              if (!_.some(this.draggableList, obj)) {
                this.draggableData.push(obj)
              }
              if (!_.some(this.draggableList, key)) {
                this.groupingData.push(key)
              }


              // const formGroup = new FormGroup({});
              // formGroup.addControl('joins', new FormControl());
              // join.push(formGroup);
              //this.schemaData.push(sche)
              this.parameters.push(sche)


            })
            const screenconfig = {
              name: val.name,
              code: val.code,
              property: schema
            }
            this.schemaData.push(screenconfig)


          }
        });
      })
    }
  }
  selectJoinData(value) {
    //_.filter(res, { _id: this.paramaterId })
    _.each(_.cloneDeep(this.schemaData), (sche) => {
      if (_.includes(sche.property, value)) {
        sche.property = []
        sche.property.push(value)
        this.joinData.push(sche)
      }
    })
  }

  addTypeInEditor(type) {
    if (type === "find") {
      this.isVisibleProjection = false;
      //this.isVisibleGrouping=false
      this.value = '{}'
    }
    if (type === "aggregate") {
      this.isVisibleProjection = false;
      this.value = '[]'
    }
    if (type === "aggregate+field") {
      this.isVisibleProjection = true;
      this.value = '{}'
    }
  }
  submitForm() {
    let addField: any
    let lookupFields: any = {}
    const projectField: any = {}
    let groupingField: any = {}
    let pivotSlice: any = {}
    this.rowData = []
    const project = { _id: 0 };
    const group = { _id: {} };
    console.log('this.reportForm', this.reportForm)
    this.markFormGroupDirty(this.reportForm);
    if (this.reportForm.valid) {
      if (this.joinData.length > 1) {
        lookupFields = {
          from: this.joinData[1].code,
          localField: this.joinData[0].property[0],
          foreignField: this.joinData[1].property[0],
          as: this.joinData[0].name + '_' + this.joinData[1].name
        }
      }

      const isAvaiable = _.find(this.draggableList, (list) => {
        return list.type === 'sum' || list.type === 'avg' || list.type === 'count';
      });

      if (this.isVisibleProjection) {
        if (isAvaiable) {
          _.each(this.draggableList, (list) => {
            if (list.type === 'sum') {
              group['sum_' + list.property] = { ___sum: '___' + list.property };
              project['sum_' + list.property] = 1;
            } else {
              if (list.type === 'avg') {
                group['avg_' + list.property] = { ___avg: '___' + list.property };
                project['avg_' + list.property] = 1;
              } else {
                if (list.type === 'count') {
                  group['count'] = { ___sum: 1 };
                  project['count'] = 1;
                } else {
                  group._id[list.property] = '___' + list.property;
                  project[list.property] = '____id.' + list.property;
                }
              }
            }
          });
        } else {
          _.each(this.draggableList, (list) => {
            project[list.property] = 1;
          });
        }
      }
      /* const arr: any = _.partition(this.draggableList, (o) => { return o.function; })
      if (this.isVisibleProjection) {
        addField = arr[0]
        if (this.draggableList.length > 0) {
          projectField['_id'] = 0;
        }
        _.each(arr[1], (sche) => {
          if (this.groupingList.length > 0) {
            projectField[sche.property] = '$_id.' + sche.property
          }
          else {
            projectField[sche.property] = '$' + sche.property
          }
          projectField['count'] = 1
        })
        _.each(arr[0], (sche) => {
          _.each(sche.function.arg, (args, index) => {
            sche.function.arg[index] = '$' + args
          })
        })
      } */
      if (this.groupingList.length > 0) {
        _.each(this.groupingList, (sche) => {
          groupingField[sche.property] = '___' + sche.property
        })
        groupingField = { _id: groupingField, count: { ___sum: 1 } }
      }
      this.value = this.value.replace(/'/g, '"')
      if (this.pivot) {
        pivotSlice = this.pivot.getReport()
        delete pivotSlice.dataSource
      }
      const data = {
        name: this.reportForm.value.name,
        appName: this.reportForm.value.application.name,
        screenData: { name: this.reportForm.value.screen[0].name, code: this.reportForm.value.screen[0].code },
        queryType: this.reportForm.value.type,
        config: this.value,
        projectFields: this.reportForm.value.type === "aggregate+field" ? project : {},
        groupFields: isAvaiable ? group : {},
        addFields: addField,
        lookupFields: lookupFields,
        pivotSlice: pivotSlice ? pivotSlice : {}
      }
      if (this.paramaterId) {
        data['_id'] = this.paramData[0]._id
        this.reportService.updateReport(data).subscribe(res => {
          this.notification.success('Successfully', 'You have successfully Update Report!')
          this.router.navigate(['/report/all'])
        });
      }
      else {
        this.reportService.saveReport(data).subscribe(res => {
          this.notification.success('Successfully', 'You have successfully save report!')
          this.reportForm.reset()
          this.isVisibleProjection = false;
          this.schemaConfig = false
          this.value = ' '
          this.joinData = []
          this.isVisibleProjection = false
          this.parameters = []
        });
      }
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

  showModal(): void {
    this.addFieldForm = this.formBuilder.group({
      property: ['', Validators.required],
      // label: ['', Validators.required], 
      function: this.formBuilder.group({
        body: [''],
        arg: [[], new FormControl('')]
      })
    })
    this.isVisible = true;
  }

  handleOk(): void {
    this.markFormGroupDirty(this.addFieldForm)
    if (this.addFieldForm.valid) {
      this.draggableList.push(this.addFieldForm.value)
      this.isVisible = false;
    }

  }
  customizeToolbar(toolbar) {
    var tabs = toolbar.getTabs(); // get all tabs from the toolbar
    toolbar.getTabs = function () {
     delete tabs[0];
     delete tabs[1];
      delete tabs[2];
      //delete tabs[4];
      // delete tabs[5];
      // delete tabs[6];
      // delete tabs[7]; // delete the first tab
      return tabs;
    }
  }
  isradio(){
    if(this.isPivote==="pivote")
    {
      this.pivotData()
    }
    if(this.isPivote==="grid")
    {
      this.pivotFlag = false
      this.isVisibles=false
       this.pivot =null
    }
  }
  pivotData() {
    this.pivotFlag = true
    let keys = []
    let defineRow = []
    let pivotlist = _.cloneDeep(this.queryResult)
    _.each(pivotlist, (element) => {
      delete element._id
      delete element.status
      delete element.__v
    })
    keys = Object.keys(pivotlist[0])
    _.each(keys, (ele) => {
      defineRow.push({ "uniqueName": ele })
    })
    this.pivot = new WebDataRocks({
      container: "#wdr-pivot",
      beforetoolbarcreated: this.customizeToolbar,
      toolbar: true,
      report: {
        dataSource: {
          data: pivotlist
        },
        grid: {
          showHeaders: true,
          //type:"classic"
        },
      }
    });

  }

  handleCancel(): void {
    this.isVisible = false;
  }

  showProjectionModal(value): void {
    if (value.function.body.length === 0) {
      this.tempItem = _.cloneDeep(this.parameters)
      value.function.body = 'function(' + value.function.arg + '){}'
      this.val = value
    }
    else {
      this.addFieldForm.controls.function.controls.arg.setValue(value.function.arg)
      //this.tempItem= _.cloneDeep(value.function.arg) 
      this.val = value

    }
    this.isVisibles = true
    //this.addField.push(this
  }
  selectArg(value, argument) {
    value.function.arg = argument
    value.function.body = 'function(' + value.function.arg + '){}'
    this.val = value
  }
  handleProjectionOk(): void {
    this.isVisibles = false;
  }

  handleProjectionCancel(): void {
    this.isVisibles = false;
  }

  removeProjection(item, index) {
    if (item.function === '' || (item.function && item.function.length > 0)) {
      this.draggableList.splice(index, 1);
    } else {
      this.draggableData.push(item);
      setTimeout(() => {
        this.draggableList.splice(index, 1);
      }, 100)
    }
  }
  showGroupingModal(item) {
    this.isVisibleGrouping = true;
    this.selectedConfig = _.find(this.schema_config, (data) => { return data.key === item.property });
    this.selectedParms = item
  }
  cancelGroupingModal() {
    this.isVisibleGrouping = false
  }
  handleGroupingOk() {
    this.isVisibleGrouping = false
  }
  removeGrouping(item, index) {
    this.groupingData.push(item);
    setTimeout(() => {
      this.groupingList.splice(index, 1);
    }, 100)
  }

}


