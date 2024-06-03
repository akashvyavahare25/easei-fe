import { Component, OnInit } from '@angular/core';
import { ColDef, GridOptions } from 'ag-grid-community';
import { ActivatedRoute, Router } from '@angular/router'
import { APIService } from '../../../../../src/app/services/api.service';
import { DatePipe } from '@angular/common';
import { AppScreenService } from '../../../../../src/app/services/app-screen.service';
import { JobService } from '../../../../../src/app/services/job.service';
// import FileSaver from 'file-saver';
import { NzNotificationService } from 'ng-zorro-antd';
import { GridActionComponent } from '../../../../../src/app/constants/grid-action/grid-action.component';
let self: any

@Component({
  selector: 'app-job-details',
  templateUrl: './job-details.component.html',
  styleUrls: ['./job-details.component.scss']
})
export class JobDetailsComponent implements OnInit {
  columnDefs: ColDef[]
  rowData: any
  jobName: string 
  masterName: string
  masaterNameNew: string
  masterData: any
  appMasterId: any = null
  // gridOptions: any
  createPermission: string[];

  constructor(
    private datePipe: DatePipe,
    private apiService: APIService,
    private route: ActivatedRoute,
    private router: Router,
    private appScreenService: AppScreenService,
    private notification: NzNotificationService,
    private jobService: JobService
  ) {
    this.route.params.subscribe(params => {
      this.jobName = params['jobName']
    })
    self = this
  }

  ngOnInit(): void {
    this.rowData = []
    if (this.route.snapshot.params['jobName']) {
      this.jobService.getJobDataByName(this.route.snapshot.params['jobName']).subscribe(res => {
        if(res.length > 0){
          // this.getJobList(res)
          this.setColumns(res[0])
          this.rowData = res

        }
        
      })
     
    }
  }

  /* 
    refreshGrid(masterName) {
      this.apiService.getMasterDetailList(masterName).subscribe(resp => {
        if (resp) {
          this.rowData = resp
        }
      })
    } */

  setColumns(columns) {
    this.columnDefs = []
    const self = this
    Object.keys(columns).forEach(function (key) {
      let definition: ColDef = {}
      if (key === '_id' || key === '__v') {
        definition = { headerName: self.camelToTitleCase(key), field: key, hide: true }
      } else {
        // tslint:disable-next-line: max-line-length
        definition = { headerName: self.camelToTitleCase(key), field: key, pinned: 'left', sortable: true, filter: 'agTextColumnFilter', floatingFilter: true, cellRenderer: self.getColoumnValue }
      }
      self.columnDefs.push(definition)
    })

    // if (Object.keys(columns).length === self.columnDefs.length) {
    //   const action = {
    //     headerName: 'Actions',
    //     // cellRenderer: this.editOrUpdate,
    //     cellRendererFramework: GridActionComponent,
    //     pinned: 'right',
    //     lockPinned: true,
    //     width: 100,
    //     maxWidth: 100
    //   }
    //   self.columnDefs.push(action)
    // }
  }

  getColoumnValue(params) {
    if (params.value) {
      if (typeof params.value === 'object') {
        return JSON.stringify(params.value)
      } else {
        return self.isDate(params.value) ? self.dateTranform(params.value) : params.value
      }
    }
  }

  dateTranform(dateStr) {
    return self.datePipe.transform(dateStr, 'MM/dd/yyyy')
  }

  isDate(dateStr) {
    if (isNaN(dateStr) && !isNaN(Date.parse(dateStr))) {
      return true
    } else {
      return false
    }
  }

  onFirstDataRendered(params) {
    params.api.sizeColumnsToFit()
  }

  camelSentence() {
    return (' ' + self.masaterNameNew).toLowerCase().replace(/[^a-zA-Z0-9]+(.)/g, function (match, chr) {
      return chr.toUpperCase();
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

  goToBack() {
    this.router.navigate(['/job/all'])
  }

}
