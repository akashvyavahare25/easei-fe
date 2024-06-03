import { Component, OnInit } from '@angular/core'
import { Router } from '@angular/router'
import { NzNotificationService } from 'ng-zorro-antd'
import { JobService } from '../../../../../src/app/services/job.service'
import { select, Store } from '@ngrx/store'
import * as Reducers from '../../../../../src/app/store/reducers'
import * as _ from 'lodash'
import { MenuService } from '../../../../../src/app/services/menu'
import { APIService } from '../../../../../src/app/services/api.service'
import { GridActionComponent } from '../../../../../src/app/constants/grid-action/grid-action.component'
// import { GridOptions } from 'ag-grid-community'
import { ColDef, GridOptions } from 'ag-grid-community'
// import { DatePipe } from '@angular/common';
// let self: any

@Component({
  selector: 'app-all-job',
  templateUrl: './all-job.component.html',
  styleUrls: ['./all-job.component.scss']
})
export class AllJobComponent implements OnInit {
  jobName: any = ''
  jobData: any = []
  gridApi: any
  gridOptions: any
  gridOptionsN: any
  isFormVisible: any = false
  rowData: any = []
  public form: any = {
    components: [{
      "type": "button",
      "label": "Submit",
      "key": "submit",
      "disableOnInvalid": true,
      "input": true,
      "tableView": true
    }]
  }
  columnDefs = [
    { field: 'name', headerName: 'Job Name', sortable: true, filter: 'agTextColumnFilter', floatingFilter: true },
    { field: 'process.interfacename', headerName: 'Interface Name', sortable: true, filter: 'agTextColumnFilter', floatingFilter: true },
    { field: 'process.table', headerName: 'Table Name', sortable: true, filter: 'agTextColumnFilter', floatingFilter: true },
    {
      field: 'updatedAt', headerName: '', maxWidth: 125,
      cellRenderer: (params) => {
        const eDiv = document.createElement('div')
        const eSpan3 = document.createElement('span')
        eSpan3.innerHTML = this.apiService.getDataDiff(new Date(params.data.updatedAt), new Date(params.data.createdAt), new Date())
        eDiv.appendChild(eSpan3)
        return eDiv
      }
    },
    {
      field: 'action', headerName: 'Action', lockPinned: true, maxWidth: 110, pinned: 'right', cellRendererFramework: GridActionComponent
    }
  ]

  columnDefs1: ColDef[]

  constructor(
    // private datePipe: DatePipe,
    private jobService: JobService,
    private notification: NzNotificationService,
    private router: Router,
    private menuService: MenuService,
    private store: Store<any>,
    private apiService: APIService
  ) {
    this.store.pipe(select(Reducers.getSettings)).subscribe(state => {
      this.onFirstDataRendered(this.gridApi);
    })

    this.gridOptions = <GridOptions>{
      pagination: true,
      context: {
        componentParent: this,
        tabName: 'all-job',
        editPermission: ['job:edit', 'admin', 'superAdmin'],
        showPermission: ['job:show', 'admin', 'superAdmin'],
        deletePermission: ['job:delete', 'admin', 'superAdmin']
      },
    };

    // this.gridOptionsN = <GridOptions>{
    //   pagination: true,
    //   context: {
    //     componentParent: this,
    //     tabName: 'all-job1'
    //   },
    // };
  }

  ngOnInit(): void {
    this.rowData = []
    this.jobService.getAllJobData().subscribe(res => {
      this.jobData = res
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


  editJob(data) {
    this.router.navigate(['/job/edit', data._id])
  }

 


  handleCancel() {
    this.isFormVisible = false
  }
  handleOk() {
    this.isFormVisible = false
  }

  // camelToTitleCase(str) {
  //   return str
  //     .replace(/[0-9]{2,}/g, match => ` ${match} `)
  //     .replace(/[^A-Z0-9][A-Z]/g, match => `${match[0]} ${match[1]}`)
  //     .replace(/[A-Z][A-Z][^A-Z0-9]/g, match => `${match[0]} ${match[1]}${match[2]}`)
  //     .replace(/[ ]{2,}/g, match => ' ')
  //     .replace(/\s./g, match => match.toUpperCase())
  //     .replace(/^./, match => match.toUpperCase())
  //     .trim()
  // }

  // getColoumnValue(params) {
  //   if (params.value) {
  //     if (typeof params.value === 'object') {
  //       return JSON.stringify(params.value)
  //     } else {
  //       return self.isDate(params.value) ? self.dateTranform(params.value) : params.value
  //     }
  //   }
  // }

  // dateTranform(dateStr) {
  //   return self.datePipe.transform(dateStr, 'MM/dd/yyyy')
  // }

  // isDate(dateStr) {
  //   if (isNaN(dateStr) && !isNaN(Date.parse(dateStr))) {
  //     return true
  //   } else {
  //     return false
  //   }
  // }

  // setColumns(columns) {
  //   this.columnDefs1 = []
  //   const self = this
  //   Object.keys(columns).forEach(function (key) {
  //     let definition: ColDef = {}
  //     if (key === '_id' || key === '__v') {
  //       definition = { headerName: self.camelToTitleCase(key), field: key, hide: true }
  //     } else {
  //       // tslint:disable-next-line: max-line-length
  //       definition = { headerName: self.camelToTitleCase(key), field: key, pinned: 'left', sortable: true, filter: 'agTextColumnFilter', floatingFilter: true, cellRenderer: self.getColoumnValue }
  //     }
  //     self.columnDefs1.push(definition)
  //   })

  //   if (Object.keys(columns).length === self.columnDefs1.length) {
  //     const action = {
  //       headerName: 'Actions',
  //       // cellRenderer: this.editOrUpdate, 
  //       cellRendererFramework: GridActionComponent,
  //       pinned: 'right',
  //       lockPinned: true,
  //       width: 100,
  //       maxWidth: 100
  //     }
  //     self.columnDefs1.push(action)
  //   }
  // }

  // editOrUpdate(params) {
  //    const eDiv = document.createElement('div')
  //    const eSpan = document.createElement('span')
  //    const eSpan2 = document.createElement('span')
  //    eSpan.innerHTML = '<i class="fa fa-trash" aria-hidden="true" title="Delete"  style="cursor: pointer;font-size: 18px; color: rgba(0,0,0,.69)"></i>'
  //    eSpan2.innerHTML = '<i class="fa fa-pencil-square-o" aria-hidden="true" title="Edit"  style="cursor: pointer;font-size: 18px; color: rgba(0,0,0,.69)"></i> &nbsp;&nbsp;'
  //    eDiv.appendChild(eSpan2)
  //    eDiv.appendChild(eSpan)
  //   //  eSpan2.addEventListener('click', (e) => {
  //   //    if (params.data) {
  //   //      self.router.navigate(['/masters/details/update/' + self.masterName, params.data._id, self.route.snapshot.params['id']])
  //   //    }
  //   //  })
  //   //  eSpan.addEventListener('click', (e) => {
  //   //    if (params.data) {
  //   //      self.deleteMasterRecord(params.data)
  //   //    }
  //   //  })
  //    return eDiv
  //  }

}
