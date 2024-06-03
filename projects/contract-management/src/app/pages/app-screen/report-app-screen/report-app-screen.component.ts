import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ColDef, GridOptions } from 'ag-grid-community';
import { APIService } from '../../../../../src/app/services/api.service';
import { AppScreenService } from '../../../../../src/app/services/app-screen.service';
import * as _ from 'lodash'
import { ReportService } from '../../../../../src/app/services/report.service';
import { ActivatedRoute, Router } from '@angular/router';
import { select, Store } from '@ngrx/store'
import * as Reducers from '../../../../../src/app/store/reducers'

let _this: any;
declare var WebDataRocks: any;

@Component({
  selector: 'app-report-app-screen',
  templateUrl: './report-app-screen.component.html',
  styleUrls: ['./report-app-screen.component.scss']
})
export class ReportAppScreenComponent implements OnInit {
  tabs: any = []
  tempTabs: any = ['Contracts Expiring', 'Top Customers', 'Products Price Variance', 'Price Type Wise Contract Count']
  rowData: any;
  secondTabRowData: any = [];
  columnDefs: any = [];
  gridApi: any;
  gridOptions: any;
  days: any = '30';
  selectedIndex: number = 0;
  reportData: any;
  dynamicRowData: any = [];
  appScreenName: string;
  appScreenCode: string;
  pivot:any
  constructor(
    private appScreenService: AppScreenService,
    private apiService: APIService,
    private datePipe: DatePipe,
    private reportService: ReportService,
    private router: Router,
    private route: ActivatedRoute,
    private store: Store<any>,
  ) {
    _this = this;
    this.route.params.subscribe(params => {
      this.appScreenName = params['screenname']
      this.appScreenCode = params['code']
      this.getData();
    });
    this.store.pipe(select(Reducers.getSettings)).subscribe(state => {
      this.onFirstDataRendered(this.gridApi);
    })
    this.gridOptions = <GridOptions>{
      pagination: true,
    };
  }

  ngOnInit(): void {

  }

  getData() {
    this.tabs = [];
    this.selectedIndex = 0;
    if (this.appScreenCode === 'S_CONTRACT_2_Vf2e7k') {
      this.tabs = _.cloneDeep(this.tempTabs);
    }

    const data = {
      name: this.appScreenName,
      code: this.appScreenCode
    }
    this.appScreenService.getReportScreendata(data).subscribe((response) => {
      this.reportData = response;
      if (this.appScreenCode !== 'S_CONTRACT_2_Vf2e7k') {
        this.getReport(response[0])
      }
      
      _.each(response, (res) => {
        this.tabs.push(res.name)
      })
    });
    this.apiService.getSchemaByCode(this.appScreenCode).subscribe((schemaRes: any) => {
      this.setColumns(schemaRes.schema_config);
      this.appScreenService.getContractData(this.appScreenCode, this.days).subscribe(resp => {
        this.rowData = resp
      })
    });
  }

  download(data: any) {
    const blob = new Blob([data], { type: 'application/octet-stream' });
    const url = window.URL.createObjectURL(blob);
    window.open(url);
  }

  log(event) {
    if (event[0].tab.nzTitle === 'Top Customers') {
      this.appScreenService.getContractPriceVariance('S_CONTRACT_2_Vf2e7k').subscribe((res: any) => {
        new WebDataRocks({
          container: "#wdr-component-tab2",
          beforetoolbarcreated: this.customizeToolbar,
          toolbar: true,
          report: {
            dataSource: {
              data: res
            },
            options: {
              grid: {
                showHeaders: false
              }
            },
            "slice": {
              "rows": [
                {
                  "uniqueName": "custNameMsa"
                },
                {
                  "uniqueName": "prdName"
                }
              ],
              "columns": [
                {
                  "uniqueName": "Measures"
                }
              ],
              "measures": [
                {
                  "uniqueName": "prdName",
                  "aggregation": "count"
                }
              ],
              "sorting": {
                "column": {
                  "type": "desc",
                  "tuple": [],
                  "measure": "prdName"
                }
              }
            }
          }
        });
      });
    }

    if (event[0].tab.nzTitle === 'Products Price Variance') {
      this.appScreenService.getContractPriceVariance('S_CONTRACT_2_Vf2e7k').subscribe((res: any) => {
        new WebDataRocks({
          container: "#wdr-component",
          beforetoolbarcreated: this.customizeToolbar,
          toolbar: true,
          report: {
            dataSource: {
              data: res
            },
            grid: {
              showHeaders: false
            },
            "slice": {
              "rows": [
                {
                  "uniqueName": "prdName"
                },
                {
                  "uniqueName": "custNameMsa"
                }
              ],
              "columns": [
                {
                  "uniqueName": "Measures"
                }
              ],
              "measures": [
                {
                  "uniqueName": "Price",
                  "aggregation": "count",
                  "availableAggregations": [
                    "count",
                    "distinctcount"
                  ]
                },
                {
                  "uniqueName": "Duration",
                  "aggregation": "sum"
                }
              ]
            },
          }
        });
      });
    }

    if (event[0].tab.nzTitle === 'Price Type Wise Contract Count') {
      this.appScreenService.getContractCount('S_CONTRACT_2_Vf2e7k').subscribe((res: any) => {
        new WebDataRocks({
          container: "#wdr-component-count",
          beforetoolbarcreated: this.customizeToolbar,
          toolbar: true,
          report: {
            dataSource: {
              data: res
            },
            grid: {
              showHeaders: false
            },
            slice: {
              "rows": [
                {
                  "uniqueName": "prdName"
                }
              ],
              "columns": [
                {
                  "uniqueName": "indPriceType"
                },
                {
                  "uniqueName": "Measures"
                }
              ],
              "measures": [
                {
                  "uniqueName": "indPriceTypeCount",
                  "aggregation": "sum"
                }
              ]
            }
          }
        });
      });
    }

    if (event[0].tab.nzTitle !== 'Contracts Expiring' || event[0].tab.nzTitle !== 'Top Customers' || event[0].tab.nzTitle !== 'Products Price Variance' || event[0].tab.nzTitle !== 'Price Type Wise Contract Count') {
      const report = _.find(this.reportData, (o) => { return o.name === event[0].tab.nzTitle; });
      this.getReport(report)
    }
  }

  getReport(report) {
    if (report) {
      delete report._id;
      delete report.__v;
      delete report.updatedAt;
      delete report.createdAt;
      const data = {
        name: report.name,
        appName: report.appName,
        screenData: report.screenData,
        queryType: report.queryType,
        config: report.config,
        projectFields:report.projectFields,  
        groupFields:report.groupFields,    
        addFields:report.addFields,
        lookupFields:report.lookupFields
      }
      if (report.queryType === "find" || report.queryType === "aggregate") {
        data.config=JSON.parse(report.config)
        this.reportService.find(data).subscribe(res => { 
          if(_.isEmpty(report.pivotSlice)){           
            this.setColumns(res[0])
            this.dynamicRowData = res;
          } else{ 
            let dataSource={
              data: res
            }
            report.pivotSlice['dataSource']=dataSource
            this.pivot=new WebDataRocks({
              container: "#wdr-component-pivots",
              beforetoolbarcreated: this.customizeToolbar,
              toolbar: true,
              report: report.pivotSlice
            });
          }     
          
        });
      }
      else {
        if(!data.lookupFields){
          data.lookupFields={}
        }
        data.config={}       
          this.reportService.aggregate(data).subscribe(res => {
            if(_.isEmpty(res.pivotSlice)){
              this.setColumns(res[0])
              this.dynamicRowData = res;
            } else{
              let dataSource={
                data: res
              }
              report.pivotSlice['dataSource']=dataSource
              this.pivot=new WebDataRocks({
                container: "#wdr-component-pivots",
                beforetoolbarcreated: this.customizeToolbar,
                toolbar: true,
                report: report.pivotSlice
              });
            }  
          });
        }
    }
  }
  customizeToolbar(toolbar) {
    var tabs = toolbar.getTabs(); // get all tabs from the toolbar
    toolbar.getTabs = function () {
      delete tabs[0];
      delete tabs[1];
      delete tabs[2];
      delete tabs[4];
      // delete tabs[5];
      // delete tabs[6];
      // delete tabs[7]; // delete the first tab
      return tabs;
    }
  }

  changeDays() {
    setTimeout(() => {
      this.appScreenService.getContractData('S_CONTRACT_2_Vf2e7k', this.days).subscribe(resp => {
        this.rowData = resp
      })
    }, 500)
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
      .replace(/[A-Z][A-Z][^A-Z0-9]/g, match => `${match[0]} ${match[1]}${match[2]}`)
      .replace(/[ ]{2,}/g, match => ' ')
      .replace(/\s./g, match => match.toUpperCase())
      .replace(/^./, match => match.toUpperCase())
      .trim()
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

  onFirstDataRendered(params) {
    this.gridApi = params;
    setTimeout(() => {
      if (this.gridApi && this.gridApi.api) {
        this.gridApi.api.sizeColumnsToFit()
      }
    }, 100)
  }

  onBtnExport() {
    this.gridOptions.api.exportDataAsCsv();
  }
}
