import { Component, OnInit } from '@angular/core'
import { Router } from '@angular/router'
import * as moment from 'moment'
import { NzNotificationService } from 'ng-zorro-antd'
import { MasterService } from '../../../../../src/app/services/master.service'
import * as Reducers from '../../../../../src/app/store/reducers'
import { select, Store } from '@ngrx/store'
import * as _ from 'lodash'
import { APIService } from '../../../../../src/app/services/api.service'
import {
  GridOptions, IServerSideDatasource,
  IServerSideGetRowsRequest,
  ILoadingCellRendererParams,
} from 'ag-grid-community'
import { GridActionComponent } from '../../../../../src/app/constants/grid-action/grid-action.component'
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

@Component({
  selector: 'app-all-masters',
  templateUrl: './all-masters.component.html',
  styleUrls: ['./all-masters.component.scss']
})
export class AllMastersComponent implements OnInit {
  mastersData: any = []
  gridApi: any
  gridOptions: any;
  loadingTemplate: any
  noRowsTemplate: any
  // columnDefs = [
  //   { field: 'name', headerName: 'Master Name', sortable: true, filter: 'agTextColumnFilter', floatingFilter: true },
  //   { field: 'externalCode', headerName: 'External Code', sortable: true, filter: 'agTextColumnFilter', floatingFilter: true },
  //   { field: 'description', headerName: 'Description', sortable: true, filter: 'agTextColumnFilter', floatingFilter: true },
  //   { field: 'status', headerName: 'Status', sortable: true, filter: 'agTextColumnFilter', floatingFilter: true },
  //   // { field: 'type', headerName: 'Type', sortable: true, filter: 'agTextColumnFilter', floatingFilter: true },
  //   { field: 'modiStartDate', headerName: 'Start Date', sortable: true, filter: 'agTextColumnFilter', floatingFilter: true },
  //   { field: 'modiEndDate', headerName: 'End Date', sortable: true, filter: 'agTextColumnFilter', floatingFilter: true },
  //   { field: 'updatedBy', headerName: 'Updated_by', sortable: true, filter: 'agTextColumnFilter', floatingFilter: true },
  //   // { field: 'version', headerName: 'Version', sortable: true, filter: 'agTextColumnFilter', floatingFilter: true },
  //   {
  //     field: 'updatedAt', headerName: 'Updated_ts', maxWidth: 180,
  //     // cellRenderer: (params) => {
  //     //   const eDiv = document.createElement('div')
  //     //   const eSpan3 = document.createElement('span')
  //     //   eSpan3.innerHTML = this.apiService.getDataDiff(new Date(params.data.updatedAt), new Date(params.data.createdAt), new Date())
  //     //   eDiv.appendChild(eSpan3)
  //     //   return eDiv
  //     // }
  //   },
  //   {
  //     field: 'action', headerName: 'Action', lockPinned: true, maxWidth: 100, pinned: 'right', cellRendererFramework: GridActionComponent,
  //   }
  // ]
  constructor(
    private masterService: MasterService,
    private notification: NzNotificationService,
    private router: Router,
    private store: Store<any>,
    private apiService: APIService
  ) {
    this.store.pipe(select(Reducers.getSettings)).subscribe(state => {
      this.onFirstDataRendered(this.gridApi);
    })
    //   this.loadingTemplate =
    //     `
    //     <div class="ag-custom-loading-cell" style="padding-left: 10px; line-height: 25px;">  
    //         <i class="fas fa-spinner fa-pulse"></i> 
    //         <span>Loading ... </span>
    //     </div>
    // `;
    //   this.noRowsTemplate =
    //     `"<span">no rows to show</span>"`;

    this.gridOptions = <GridOptions>{
      columnDefs: [
        { field: 'name', headerName: 'Master Name', sortable: true, filter: 'agTextColumnFilter', floatingFilter: true },
        { field: 'externalCode', headerName: 'External Code', sortable: true, filter: 'agTextColumnFilter', floatingFilter: true },
        { field: 'description', headerName: 'Description', sortable: true, filter: 'agTextColumnFilter', floatingFilter: true },
        { field: 'status', headerName: 'Status', sortable: true, filter: 'agTextColumnFilter', floatingFilter: true },
        // { field: 'type', headerName: 'Type', sortable: true, filter: 'agTextColumnFilter', floatingFilter: true },
        { field: 'modiStartDate', headerName: 'Start Date', sortable: true, filter: 'agTextColumnFilter', floatingFilter: true },
        { field: 'modiEndDate', headerName: 'End Date', sortable: true, filter: 'agTextColumnFilter', floatingFilter: true },
        { field: 'updatedBy', headerName: 'Updated_by', sortable: true, filter: 'agTextColumnFilter', floatingFilter: true },
        // { field: 'version', headerName: 'Version', sortable: true, filter: 'agTextColumnFilter', floatingFilter: true },
        {
          field: 'updatedAt', headerName: 'Updated_ts', maxWidth: 180,
          // cellRenderer: (params) => {
          //   const eDiv = document.createElement('div')
          //   const eSpan3 = document.createElement('span')
          //   eSpan3.innerHTML = this.apiService.getDataDiff(new Date(params.data.updatedAt), new Date(params.data.createdAt), new Date())
          //   eDiv.appendChild(eSpan3)
          //   return eDiv
          // }
        },
        {
          field: 'action', headerName: 'Action', lockPinned: true, maxWidth: 100, pinned: 'right', cellRendererFramework: GridActionComponent,
        }
      ],

      // <ng-template #indicatorTemplate><i nz-icon nzType="loading"></i></ng-template>
      // <nz-spin nzSimple [nzIndicator]="indicatorTemplate"></nz-spin>
      pagination: true,
      overlayLoadingTemplate: `
      <div class="ag-custom-loading-cell" >  
      <i style="font-size:18px" class="fas fa-spinner fa-pulse"></i> 
      <span style="font-size:16px; margin-left:3px">Loading ... </span>
      </div>`,
      overlayNoRowsTemplate:
      `<span style="font-size:16px">No Rows To Show</span>`,   
      context: {
        componentParent: this,
        tabName: 'define-master',
        editPermission: ['define master:edit', 'admin', 'superadmin'],
        deletePermission: ['define master:delete', 'admin', 'superadmin']
      }
    };
  }
  // moment.utc(state.lastlogin).local().format("DD-MM-yyyy HH:mm:ss");
  ngOnInit(): void {
    this.masterService.getAllMasterData().subscribe(res => {
      this.mastersData = res
      this.mastersData.forEach(element => {
        element.modiStartDate = moment(element.validity_start_date).format('YYYY-MM-DD')
        element.modiEndDate = moment(element.validity_end_date).format('YYYY-MM-DD')
        element.updatedAt = moment.utc(element.updated_ts).local().format("DD-MM-yyyy HH:mm:ss");
      })
      this.gridOptions.api!.setRowData(this.mastersData);

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
  // onGridReady(params) {
  //   console.log('onGridReady',params)
  //   this.gridApi = params.api;
  //   setTimeout(() => {
  //     if (this.gridApi && this.gridApi.api) {
  //       this.gridApi.api.sizeColumnsToFit()
  //     }
  //   }, 100)


  // }

  /*  editMaster(data) {
     this.router.navigate(['/master/edit', data._id])
   } */

}
