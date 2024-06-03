import { Component, OnInit } from '@angular/core';
import { ColDef, GridOptions } from 'ag-grid-community';
import { ActivatedRoute, Router } from '@angular/router'
import { APIService } from '../../../../../src/app/services/api.service';
import { DatePipe } from '@angular/common';
import { AppScreenService } from '../../../../../src/app/services/app-screen.service';
import FileSaver from 'file-saver';
import { NzNotificationService } from 'ng-zorro-antd';
import { GridActionComponent } from '../../../../../src/app/constants/grid-action/grid-action.component';
let self: any

@Component({
  selector: 'app-master-details',
  templateUrl: './master-details.component.html',
  styleUrls: ['./master-details.component.scss']
})
export class MasterDetailsComponent implements OnInit {
  columnDefs: ColDef[]
  rowData: any
  gridApi: any
  masterName: string
  masaterNameNew: string
  masterData: any
  appMasterId: any = null
  gridOptions: any
  createPermission: string[];
  overlayNoRowsTemplate:any
 encodedata:any
  constructor(
    private datePipe: DatePipe,
    private apiService: APIService,
    private route: ActivatedRoute,
    private router: Router,
    private appScreenService: AppScreenService,
    private notification: NzNotificationService
  ) {
    this.route.params.subscribe(params => {
      this.appMasterId = params['id']
      this.createPermission = [params['masterName'] + ':create', 'admin', 'superadmin']
      this.gridOptions = <GridOptions>{
        overlayLoadingTemplate: `
        <div class="ag-custom-loading-cell" >  
        <i style="font-size:18px" class="fas fa-spinner fa-pulse"></i> 
        <span style="font-size:16px; margin-left:3px">Loading ... </span>
        </div>`,
          overlayNoRowsTemplate:
          `<span style="font-size:16px">No Rows To Show</span>`,   
        pagination: true,
        context: {
          componentParent: this,
          tabName: 'master-details',
          editPermission: [params['masterName'] + ':edit', 'admin', 'superadmin'],
          deletePermission: [params['masterName'] + ':delete', 'admin', 'superadmin']
        }
      };
    })
    self = this
  }

  ngOnInit(): void {
    this.rowData = []
    if (this.route.snapshot.params['id']) {
      this.apiService.getMaster(this.route.snapshot.params['id']).subscribe(res => {
        if (res) {
          this.masaterNameNew = res.name
          this.masterName = res.code
          this.masterData = res
          const obj = {
            modelName: res.code,
            formConfig: res.configuration,
            uniqueKey: res.uniqueKey
          }
          this.apiService.checkCollectionExists(this.masterName).subscribe(resp => {
            if (resp) {
              this.getMasterList(this.masterName)
            } 
            // else {
              // this.apiService.registerSchema(obj).subscribe(response => {
              //   if (response) {
              //     this.getMasterList(this.masterName)
              //   }
              // })
            // }
          })
        }
      })
    }
  }

  getMasterList(masterName) {
    this.encodedata =encodeURIComponent("{}")
    masterName= masterName+ "?json=" +this.encodedata;
    this.apiService.getMasterDetailList(masterName,"false").subscribe(resp => {
      if (resp && resp.length > 0) {
        // this.apiService.getSchemaByCode(masterName).subscribe((schemaRes: any) => {
          // this.setColumns(schemaRes.schema_config);
          this.setColumns(resp[0])
          this.rowData = resp
          this.gridOptions.api!.setRowData(this.rowData);
        // });
        // this.setColumns(resp[0])
        // this.rowData = resp
      }else{
        this.gridOptions.api!.showNoRowsOverlay();
      }
    },err => {
      
      this.gridOptions.api!.showNoRowsOverlay();
    })
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
      if (key === 'eimUUId' || key === '__v') {
        definition = { headerName: self.camelToTitleCase(key), field: key, hide: true }
      } else {
        // tslint:disable-next-line: max-line-length
        definition = { headerName: self.camelToTitleCase(key), field: key, sortable: true, filter: 'agTextColumnFilter', resizable: true, floatingFilter: true, cellRenderer: self.getColoumnValue }
      }
      self.columnDefs.push(definition)
    })

    if (Object.keys(columns).length === self.columnDefs.length) {
      const action = {
        headerName: 'Actions',
        /*         cellRenderer: this.editOrUpdate, */
        cellRendererFramework: GridActionComponent,
        pinned: 'right',
        lockPinned: true,
        width: 100,
        maxWidth: 100
      }
      self.columnDefs.push(action)
    }
  }

  addMasterDetails() {
    this.router.navigate(['drone/masters/details/new/add', this.masterData._id])
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


  templateWithData() {
    this.appScreenService.generateTemplateWithData( this.masterData.code ).subscribe(resp => {
      const blob = new Blob([resp], { type: 'text/csv' });
      FileSaver.saveAs(blob, this.masterData.code + '.csv');
      this.notification.success('Successfully', 'File Download Successfully')
    }, err => {
      this.notification.error('Download Error', 'Please try after sometime or check your internet connection')
    })
  }


  /*  editOrUpdate(params) {
     const eDiv = document.createElement('div')
     const eSpan = document.createElement('span')
     const eSpan2 = document.createElement('span')
     eSpan.innerHTML = '<i class="fa fa-trash" aria-hidden="true" title="Delete"  style="cursor: pointer;font-size: 18px; color: rgba(0,0,0,.69)"></i>'
     eSpan2.innerHTML = '<i class="fa fa-pencil-square-o" aria-hidden="true" title="Edit"  style="cursor: pointer;font-size: 18px; color: rgba(0,0,0,.69)"></i> &nbsp;&nbsp;'
     eDiv.appendChild(eSpan2)
     eDiv.appendChild(eSpan)
     eSpan2.addEventListener('click', (e) => {
       if (params.data) {
         self.router.navigate(['/masters/details/update/' + self.masterName, params.data._id, self.route.snapshot.params['id']])
       }
     })
     eSpan.addEventListener('click', (e) => {
       if (params.data) {
         self.deleteMasterRecord(params.data)
       }
     })
     return eDiv
   } */

  /* deleteMasterRecord(data) {
    this.apiService.deleteSchemaRecord(self.masterName, data._id).subscribe(resp => {
      if (resp) {
        this.refreshGrid(self.masterName)
      }
    })
  } */

  onFirstDataRendered(params) {
    self = this
    this.gridApi = params;
   
    setTimeout(() => {
      if (this.gridApi && this.gridApi.api && this.columnDefs.length<8 ) {
        this.gridApi.api.sizeColumnsToFit()
      }
    }, 100)
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
    this.router.navigate(['/drone/masters/list'])
  }

}
