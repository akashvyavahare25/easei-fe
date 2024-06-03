import { Component, OnInit } from '@angular/core'
import { FormBuilder, Validators, FormGroup } from '@angular/forms'
import { NzNotificationService } from 'ng-zorro-antd'
import { NzModalService } from 'ng-zorro-antd/modal';
import { FormRenderService } from '../../../../../src/app/services/form-render.service'
import { formioOptions } from './../../../constants/formiOptions'
import { ScreenService } from '../../../../../src/app/services/screen.service'
import { ActivatedRoute, Router } from '@angular/router'
import { AppMasterService } from '../../../../../src/app/services/app-master.service'
import { select, Store } from '@ngrx/store'
import * as Reducers from '../../../../../src/app/store/reducers'
import * as _ from 'lodash'
import { MenuService } from '../../../../../src/app/services/menu';
import { NzTagModule } from 'ng-zorro-antd/tag';

@Component({
  selector: 'app-create-screen',
  templateUrl: './create-screen.component.html',
  styleUrls: ['./create-screen.component.scss'],
})
export class CreateScreenComponent implements OnInit {
  screenForm: any
  screensData: any
  screenId: any = null
  tabs: any = ['Basic', 'Unique Key']
  rowData: any
  isFormVisible: any = false
  listOfApplicationMaste: any = []
  screenArray: any = []
  options: any
  gridApi: any
  item: any = [
    {
      "label": "Columns",
      "columns": [],
      "key": "columns",
      "type": "columns",
      "input": false,
      "tableView": false
    }
  ]
  startDate: any
  public form: any = { components: [] }
  public previewForm: any = { components: [] }
  tempItem: any = []
  columnDefs = [
    { field: 'name', headerName: 'Paramater Name', sortable: true, filter: 'agTextColumnFilter', floatingFilter: true, },
    { field: 'category', headerName: 'Category', filter: 'agTextColumnFilter', floatingFilter: true, },
    { field: 'type', headerName: 'Type', filter: 'agTextColumnFilter', floatingFilter: true, },
    // { field: 'application_master', headerName: 'Application Master', width: 125, filter: 'agTextColumnFilter', floatingFilter: true, },

    {
      field: 'action', headerName: 'Action', width: 70, maxWidth: 70, lockPinned: true,
      cellStyle: { 'text-align': 'center' },
      cellRenderer: (params) => {
        const eDiv = document.createElement('div')
        const eSpan = document.createElement('span')
        eSpan.innerHTML = '<i class="fa fa-angle-right" aria-hidden="true" title="Add"  style="cursor: pointer;font-size: 18px; color: rgba(0,0,0,.69)"></i>'
        eDiv.appendChild(eSpan)
        eSpan.addEventListener('click', (e) => {
          if (params.data) {
            this.openComponentsData(params.data, params.rowIndex)
          }
        })
        return eDiv
        /* const eDiv = document.createElement('div')
        eDiv.innerHTML = '<span class="my-css-class"><button class="btn-simple add">add</button></span>'
        const addButton = eDiv.querySelectorAll('.add')[0]
        addButton.addEventListener('click', () => {
          this.openComponentsData(params.data, params.rowIndex)
        })
        return eDiv */
      }
    }
  ];
  draggableList: any = [];
  
  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private formBuilder: FormBuilder,
    private formRenderService: FormRenderService,
    private appMasterService: AppMasterService,
    private screenService: ScreenService,
    private notification: NzNotificationService,
    private modal: NzModalService,
    private menuService: MenuService,
    private store: Store<any>

  ) {
    this.route.params.subscribe(params => {
      this.screenId = params['id']
    })
    this.store.pipe(select(Reducers.getSettings)).subscribe(state => {
      this.onFirstDataRendered(this.gridApi);
    })
  }

  ngOnInit(): void {
    this.options = formioOptions
    this.screenForm = this.formBuilder.group({
      name: ['', Validators.required],
      code: ['', Validators.nullValidator],
      externalCode: ['', Validators.required],
      description: ['', Validators.required],
      screenLayout: ['2', Validators.required],
      applicationMaster: ['', Validators.required],
      screen: [''],
      type: ['', Validators.required],
      uniqueKey: [[], Validators.nullValidator]
    })

    this.appMasterService.getAllAppMasterData().subscribe(res => {
      this.listOfApplicationMaste = res
    })

    this.formRenderService.getAllData().subscribe(res => {
      this.rowData = res
    })
    this.screenService.getAllScreenData().subscribe(res => {
      this.screensData = res
    })

    if (this.screenId) {
      this.screenService.getDataById(this.screenId).subscribe(res => {
        this.screenForm.patchValue({
          name: res.name,
          code: res.code,
          externalCode: res.externalCode,
          description: res.description,
          screenLayout: res.screen_layout,
          applicationMaster: res.application_master,
          uniqueKey: res.uniqueKey,
          type: res.type
        })

        _.each(res.configuration, (component) => {
          this.form.components.push(component)
        })
        this.item = this.form.components;
        if(this.item.length > 0){
          this.draggableList = this.item[0].columns
        }else{
          this.draggableList = [];
        }
      })
    }else{
      if(this.item.length > 0){
        this.draggableList = this.item[0].columns
      }else{
        this.draggableList = [];
      }
    }
  }

  screenLayoutChange(layoutValue) {
    this.item[0].columns.forEach(element => {
      element.width = 12 / parseInt(layoutValue);
    });
  }

  selectScreen(item) {
    this.screenArray = _.filter(this.screensData, { 'application_master': item })
  }

  getScreenData(item) {
    if (item && item.length > 0) {
      this.screenService.getDataById(item).subscribe(res => {
        _.each(res.configuration[0].columns, (component) => {
          const dataAvaiable = _.find(_.cloneDeep(this.item[0].columns), (item) => { return item.components[0].key === component.components[0].key; });
          if (!dataAvaiable) {
            let columnValue = {
              "components": [
              ],
              "offset": 0,
              "push": 0,
              "pull": 0,
              "size": "md",
              "width": 12 / parseInt(this.screenForm.value.screenLayout)
            }
            const cloneData = _.cloneDeep(component.components[0])
            this.tempItem.push(cloneData);
            columnValue.components.push(cloneData);
            this.item[0].columns.push(columnValue);
          }
          if(this.item.length > 0){
            this.draggableList = this.item[0].columns
          }else{
            this.draggableList = [];
          }
        });
      })
    }
  }

  clearScreenConfig() {
    this.form = { components: [] };
    this.item = [
      {
        "label": "Columns",
        "columns": [],
        "key": "columns",
        "type": "columns",
        "input": false,
        "tableView": false
      }
    ];
    if(this.item.length > 0){
      this.draggableList = this.item[0].columns
    }else{
      this.draggableList = [];
    }
    this.tempItem = [];
    this.screenForm.get('screen').reset();

  }
  deleteItem(index: any) {
    this.tempItem.splice(index, 1)
    this.item[0].columns.splice(index, 1)
  }
  public removeItem(item: any, list: any[]): void {
    list.splice(list.indexOf(item), 1);
    if(this.item.length > 0){
      this.item[0].columns = list;
    }
  }  

  openComponentsData(data, index): void {
    const dataAvaiable = _.find(_.cloneDeep(this.item[0].columns), (item) => { return item.components[0].key === data.configuration[0].key; });
    if (!dataAvaiable) {
      let columnValue = {
        "components": [
        ],
        "offset": 0,
        "push": 0,
        "pull": 0,
        "size": "md",
        "width": 12 / parseInt(this.screenForm.value.screenLayout)
      }
      const cloneData = _.cloneDeep(data)
      this.tempItem.push(cloneData);
      columnValue.components.push(cloneData.configuration[0]);
      this.item[0].columns.push(columnValue);
    } else {
      this.notification.info('Info', data.name + ' parameter is already added')
    }
    if(this.item.length > 0){
      this.draggableList = this.item[0].columns
    }else{
      this.draggableList = [];
    }
  }

  info(): void {
    this.notification.info('Info', 'Please add atleast one fields in the screen configuration.')
    // this.modal.info({
    //   nzTitle: 'This is an alert message',
    //   nzContent: 'Please add atleast two field in the screen configuration.'
    // });
  }

  screenPreview() {
    if (this.item[0].columns.length > 1) {
      this.form = { components: [] }
      this.previewForm = { components: [] }
      const item = {
        components: this.item,
      }
      this.previewForm = _.cloneDeep(item)
      this.form = _.cloneDeep(item)
      this.isFormVisible = true
    } else {
      if (this.item[0].columns.length === 1) {
        this.form = { components: [] }
        const item = {
          components: this.item[0].columns,
        }
        const formItem = {
          components: this.item,
        }
        this.previewForm = _.cloneDeep(item)
        this.form = _.cloneDeep(formItem)
        this.isFormVisible = true
      } else {
        this.info()
      }
    }
  }

  handleCancel() {
    const tempData = [];
    _.each(this.previewForm.components[0].columns, (item) => {
      tempData.push(item);
    })
    if (tempData.length > 1) {
      this.form = { components: [] }
      this.item[0].columns = [];
      this.item[0].columns = tempData;
      const componentData = {
        columns: tempData,
        input: false,
        key: "columns",
        label: "Columns",
        tableView: false,
        type: "columns"
      }
      const item = {
        components: [componentData],
      }
      this.form = _.cloneDeep(item)
    }
    if(this.item.length > 0){
      this.draggableList = this.item[0].columns
    }else{
      this.draggableList = [];
    }
    this.isFormVisible = false
  }

  /*  handleOk() {
     this.isFormVisible = false
   } */

  submitForm() {
    this.markFormGroupDirty(this.screenForm)
    if (this.screenForm.valid) {
      if (this.form.components.length > 0) {
        if (this.screenId) {
          const data = {
            name: this.screenForm.value.name,
            code: this.screenForm.value.code,
            externalCode: this.screenForm.value.externalCode,
            description: this.screenForm.value.description,
            screen_layout: this.screenForm.value.screenLayout,
            configuration: this.form.components,
            application_master: this.screenForm.value.applicationMaster,
            uniqueKey: this.screenForm.value.uniqueKey,
            type: this.screenForm.value.type,
            _id: this.screenId
          }
          this.screenService.updateScreenData(data).subscribe(res => {
            this.notification.success('Successfully', 'You have successfully update screen!')
            this.screenForm.reset()
            setTimeout(() => {
              this.form = { components: [] }
              this.item = [{
                "label": "Columns",
                "columns": [],
                "key": "columns",
                "type": "columns",
                "input": false,
                "tableView": false
              }];
              if(this.item.length > 0){
                this.draggableList = this.item[0].columns
              }else{
                this.draggableList = [];
              }
            }, 300);
            this.menuService.getMenuData();
            setTimeout(() => { this.router.navigate(['/screen/all']) }, 700)
          })
        } else {
          const data = {
            name: this.screenForm.value.name,
            code: this.screenForm.value.code,
            externalCode: this.screenForm.value.externalCode,
            description: this.screenForm.value.description,
            screen_layout: this.screenForm.value.screenLayout,
            application_master: this.screenForm.value.applicationMaster,
            uniqueKey: this.screenForm.value.uniqueKey,
            type: this.screenForm.value.type,
            configuration: this.form.components,
          }
          this.screenService.saveScreenData(data).subscribe(res => {
            this.notification.success('Successfully', 'You have successfully save screen!')
            this.screenForm.reset()
            setTimeout(() => {
              this.form = { components: [] }
              this.item = [{
                "label": "Columns",
                "columns": [],
                "key": "columns",
                "type": "columns",
                "input": false,
                "tableView": false
              }];
              if(this.item.length > 0){
                this.draggableList = this.item[0].columns
              }else{
                this.draggableList = [];
              }
            }, 300)
            this.menuService.getMenuData();
          })
        }
      } else {
        this.notification.info('Info', 'Please check screen preview before submit')
      }
    }
  }


  clearForm() {
    this.form = { components: [] }
    this.item = [
      {
        "label": "Columns",
        "columns": [],
        "key": "columns",
        "type": "columns",
        "input": false,
        "tableView": false
      }
    ];
    if(this.item.length > 0){
      this.draggableList = this.item[0].columns
    }else{
      this.draggableList = [];
    }
    this.tempItem = []
    this.screenForm.reset()
  }

  cancelEdit() {
    this.router.navigate(['/screen/all'])
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
}
