import { Component, OnInit } from '@angular/core'
import { ActivatedRoute, NavigationStart, Router } from '@angular/router'
import { select, Store } from '@ngrx/store'
import * as Reducers from '../../../../../src/app/store/reducers'
import * as _ from 'lodash'
import { APIService } from '../../../../../src/app/services/api.service'
import { ColDef, GridOptions } from 'ag-grid-community'
import { ScreenService } from '../../../../../src/app/services/screen.service'
import { DatePipe } from '@angular/common'
import { AppScreenService } from '../../../../../src/app/services/app-screen.service'
import { NzNotificationService } from 'ng-zorro-antd'
import FileSaver from 'file-saver';
import { GridActionComponent } from '../../../../../src/app/constants/grid-action/grid-action.component'
import * as moment from 'moment'

let _this: any

@Component({
  selector: 'app-all-app-screen',
  templateUrl: './all-app-screen.component.html',
  styleUrls: ['./all-app-screen.component.scss']
})
export class AllAppScreenComponent implements OnInit {
  appScreenName: string;
  appScreensData: any = []
  columnDefs: ColDef[]
  rowData: any
  masterName: String
  appScreenId: any;
  screenData: any;
  isRefresh: boolean = true;
  gridApi: any;
  gridOptions: any;
  schemaConfig:any=[]
  constructor(
    private screenService: ScreenService,
    private router: Router,
    private apiService: APIService,
    private route: ActivatedRoute,
    private datePipe: DatePipe,
    private store: Store<any>,
    private appScreenService: AppScreenService,
    private notification: NzNotificationService,
  ) {
    _this = this
    this.route.params.subscribe(params => {
      this.appScreenName = params['screenname']
      this.appScreenId = params['screenId']
      this.getMasterList(this.masterName);
      this.gridOptions = <GridOptions>{
        pagination: true,
        onColumnMoved: function (params) {
          const disCols = []
          const allGridColumns = _.cloneDeep(params.columnApi.getAllGridColumns());
          _.each(allGridColumns, (col) => {
            disCols.push(col.colId);
          })

          const mainData = JSON.parse(localStorage.getItem('previousGridSchema'))
          let previousGridSchema: any = mainData ? mainData : [];
          _.remove(previousGridSchema, (n) => { return n.appScreenName === _this.appScreenName; });
          const data = {
            appScreenName: _this.appScreenName,
            disCols: disCols
          }
          previousGridSchema.push(data);
          localStorage.setItem('previousGridSchema', JSON.stringify(previousGridSchema));
        },
        context: {
          componentParent: this,
          tabName: 'app-screen',
          editPermission: [this.appScreenName + ':edit', 'admin', 'superadmin'],
          deletePermission: [this.appScreenName + ':delete', 'admin', 'superadmin']
        }
      };
    })

    this.store.pipe(select(Reducers.getSettings)).subscribe(state => {
      this.onFirstDataRendered(this.gridApi);
    })
  }

  ngOnInit(): void {
    // this.getMasterList(this.masterName);
  }

  getMasterList(data) {
    this.screenService.getDataById(this.appScreenId).subscribe(res => {
      if (res && res.code) {
        this.screenData = res
        this.apiService.getMasterDetailList(res.code,"false").subscribe(resp => {
          if (resp && resp.length > 0) {
            // this.setColumns(resp[0]);
            // this.rowData = resp;
            this.apiService.getSchemaByCode(res.code).subscribe((schemaRes: any) => {
              const previousGridSchema = JSON.parse(localStorage.getItem('previousGridSchema'));
              const avaiable = _.find(previousGridSchema, (o) => {
                return o.appScreenName === this.appScreenName;
              });
              if (avaiable) {
                this.setPreviousColumns(avaiable.disCols);
              } else {
                this.setColumns(schemaRes);
              }
              this.schemaConfig=schemaRes.schema_config
              this.rowData = resp
              this.onFirstDataRendered(this.gridApi);
            });
          } else {
            this.rowData = [];
            this.columnDefs = [];
          }
        }, err => {
          this.rowData = [];
          this.columnDefs = [];
        })
      }
    });
  }

  templateWithData() {
    this.appScreenService.generateTemplateWithData( this.screenData.code).subscribe(resp => {
      const blob = new Blob([resp], { type: 'text/csv' });
      FileSaver.saveAs(blob, this.screenData.code + '.csv');
      this.notification.success('Successfully', 'File Download Successfully')
    }, err => {
      this.notification.error('Download Error', 'Please try after sometime or check your internet connection')
    })
  }


  setColumns(column) {
    this.columnDefs = []
    const self = this
    const columns=column.schema_config
    Object.keys(columns).forEach(function (key,index) {      
      if (key !== 'status') {
        let definition: ColDef = {}
        if (key === '_id' || key === '__v') {
          definition = { headerName: self.camelToTitleCase(key), field: key, hide: true }
        } else {
          if (columns[key].type==='Date') {
            _.each(column.form_config[0].columns,(element)=>{
              if(element.components[0].key===key){              
                definition = { headerName: self.camelToTitleCase(key), field: key, minWidth: 150, resizable: true, sortable: true, filter: 'agTextColumnFilter',filterParams:element.components[0].format, floatingFilter: true, cellRenderer: (data) => {return _this.datePipe.transform(data.value,element.components[0].format.split(' ')[0])} }              
              }
            });            
        }
          else {
          definition = { headerName: self.camelToTitleCase(key), field: key, minWidth: 150, resizable: true, sortable: true, filter: 'agTextColumnFilter', floatingFilter: true, cellRenderer: self.getColoumnValue2 }
         }
        }
        self.columnDefs.push(definition)
      }
    })

    const list = _.remove(Object.keys(columns), (n) => {
      return n !== 'status';
    });
    if (list.length === self.columnDefs.length) {
      const action = {
        headerName: 'Actions',
        cellRendererFramework: GridActionComponent,
        pinned: 'right',
        lockPinned: true,
        maxWidth: 100,
        minWidth: 100
      }
      self.columnDefs.push(action)
    }
  }

  setPreviousColumns(data) {
    this.columnDefs = []
    const self = this
    _.each(data, (col) => {
      let definition: ColDef = {};
      if (data[col].type==='Date') {definition = { headerName: self.camelToTitleCase(col), field: col, minWidth: 150, resizable: true, sortable: true, filter: 'agTextColumnFilter', floatingFilter: true, cellRenderer: self.getColoumnValue}
        }else {
        definition = { headerName: self.camelToTitleCase(col), field: col, minWidth: 150, resizable: true, sortable: true, filter: 'agTextColumnFilter', floatingFilter: true, cellRenderer: self.getColoumnValue2 }
      }
      self.columnDefs.push(definition)
    });

    const action = {
      headerName: 'Actions',
      cellRendererFramework: GridActionComponent,
      pinned: 'right',
      lockPinned: true,
      maxWidth: 100,
      minWidth: 100
    }
    self.columnDefs.push(action)
  }

  camelSentence() {
    return (' ' + this.appScreenName).toLowerCase().replace(/[^a-zA-Z0-9]+(.)/g, (match, chr) => {
      return chr.toUpperCase();
    })
  }

  getColoumnValue(params) {
    if (params.value) {
      if (typeof params.value === 'object') {
        return JSON.stringify(params.value)
      } else {
        return _this.isDate(params.value) ? _this.dateTranform(params.value) : params.value
      }
    }
  }
  getColoumnValue2(params) {
    if (params.value) {
      if (typeof params.value === 'object') {
        return JSON.stringify(params.value)
      } else {
        return params.value
      }
    }
  }
  getColoumnValue3(params) {   
    return _this.isDate(params.value) ?_this.datePipe.transform(params.value,'yyyy'):params.value
  }

  dateTranform(dateStr) {
    if (dateStr) {
      return this.datePipe.transform(dateStr, 'MM/dd/yyyy')
    } else {
      return null
    }
  }

  isDate(dateStr) {
    if (isNaN(dateStr) && !isNaN(Date.parse(dateStr))) {      
      return true
    } else {
      return false
    }
  }

  camelToTitleCase(str) {
    return str
      .replace(/[0-9]{2,}/g, match => ` ${match} `)
      .replace(/[^A-Z0-9][A-Z]/g, match => `${match[0]} ${match[1]}`)
      .replace(/[A-Z][A-Z][^A-Z0-9]/g, match => `${match[0]} ${match[1]}${match[2]}`)
      .replace(/[ ]{2,}/g, match => ' ')
      .replace(/\s./g, match => match.toUpperCase())
      .replace(/^./, match => match.toUpperCase())
      .trim()
  }

  onFirstDataRendered(params) {
    this.gridApi = params;
    setTimeout(() => {
      if (this.gridApi && this.gridApi.api) {
        this.gridApi.api.sizeColumnsToFit()
      }
    }, 100)
  }

  editAppScreen(data) {
    this.router.navigate(['/appscreen/edit', data._id])
  }


}
