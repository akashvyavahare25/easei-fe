import { Component, OnInit } from '@angular/core';
import { APIService } from '../../../../../src/app/services/api.service';
import { Router } from '@angular/router'
import { select, Store } from '@ngrx/store'
import * as Reducers from '../../../../../src/app/store/reducers'
import * as _ from 'lodash'
import * as moment from 'moment'
import { GridOptions } from 'ag-grid-community';
let self: any

@Component({
  selector: 'app-master-list',
  templateUrl: './master-list.component.html',
  styleUrls: ['./master-list.component.scss']
})
export class MasterListComponent implements OnInit {
  frameworkComponents: any
  gridApi: any
  rowData = [];
  gridOptions: any;
  userPermission: any;
  userData:any
  role:any
  columnDefs:any

  constructor(
    private apiService: APIService,
    private router: Router,
    private store: Store<any>
  ) {
    this.store.pipe(select(Reducers.getSettings)).subscribe(state => {
      this.onFirstDataRendered(this.gridApi);
    })
    this.userPermission = JSON.parse(localStorage.getItem("permissionData"));
    this.gridOptions = <GridOptions>{
      columnDefs: [
        { field: '_id', hide: true },
        { field: 'name', sortable: true, filter: 'agTextColumnFilter', floatingFilter: true },
        { field: 'status', sortable: true, filter: 'agTextColumnFilter', floatingFilter: true },
        // { field: 'type', sortable: true, filter: 'agTextColumnFilter', floatingFilter: true },
        { field: 'description', sortable: true, filter: 'agTextColumnFilter', floatingFilter: true },
        // { field: 'version', sortable: true, filter: 'agTextColumnFilter', floatingFilter: true },
        // { field: 'validity_start_date', sortable: true, filter: 'agTextColumnFilter', floatingFilter: true },
        // { field: 'validity_end_date', sortable: true, filter: 'agTextColumnFilter', floatingFilter: true },
        { field: 'modiStartDate', headerName: 'Start Date', sortable: true, filter: 'agTextColumnFilter', floatingFilter: true },
        { field: 'modiEndDate', headerName: 'End Date', sortable: true, filter: 'agTextColumnFilter', floatingFilter: true },
        { field: 'updatedBy', headerName: 'Updated_by', sortable: true, filter: 'agTextColumnFilter', floatingFilter: true },
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
          headerName: 'Actions',
          cellRenderer: this.editOrUpdate,
          pinned: 'right',
          lockPinned: true,
          width: 90,
          maxWidth: 90
        },
      ],
      overlayLoadingTemplate: `
      <div class="ag-custom-loading-cell" >  
      <i style="font-size:18px" class="fas fa-spinner fa-pulse"></i> 
      <span style="font-size:16px; margin-left:3px">Loading ... </span>
      </div>`,
        overlayNoRowsTemplate:
        `<span style="font-size:16px">No Rows To Show</span>`,   
      pagination: true,
    };
    this.store.pipe(select(Reducers.getUser)).subscribe(state => {
      this.userData = state;
      this.role = localStorage.getItem('role') ? localStorage.getItem('role') : state.role
    });
  }

  ngOnInit(): void {
    this.apiService.getAllMasters().subscribe(res => {
      if(this.role == 'super user'){
         this.rowData= _.filter(res,(o) =>{
           if(o.name == 'region' || o.name == 'city' || o.name == 'state' || o.name == 'country' || o.name == 'customer'){
             return o;
           }
         })
         this.rowData.forEach(element => {
          element.modiStartDate = moment(element.validity_start_date).format('YYYY-MM-DD')
          element.modiEndDate = moment(element.validity_end_date).format('YYYY-MM-DD')
          element.updatedAt= moment.utc(element.updated_ts).local().format("DD-MM-yyyy HH:mm:ss");
        })
      }
     else{
      this.rowData = res
       if(this.role == 'admin'){
        this.rowData= _.filter(res,(o) =>{
          if(o.name !== 'region' && o.name !== 'city' && o.name !== 'state' && o.name !== 'country'){
            return o;
          }
        })
      }
      this.rowData.forEach(element => {
        element.modiStartDate = moment(element.validity_start_date).format('YYYY-MM-DD')
        element.modiEndDate = moment(element.validity_end_date).format('YYYY-MM-DD')
        element.updatedAt= moment.utc(element.updated_ts).local().format("DD-MM-yyyy HH:mm:ss");
      })
      }
      this.gridOptions.api!.setRowData(this.rowData);
    })
  }

  onFirstDataRendered(params) {
    self = this
    this.gridApi = params;
    setTimeout(() => {
      if (this.gridApi && this.gridApi.api) {
        this.gridApi.api.sizeColumnsToFit()
      }
    }, 100)
  }

  editOrUpdate(params) {
    // if (_.includes(self.userPermission, params.data.name + ':view') || _.includes(self.userPermission, 'admin') || _.includes(self.userPermission, 'superadmin')) {
      const eDiv = document.createElement('div')
      const eSpan2 = document.createElement('span')
      eSpan2.innerHTML = '<i class="fa fa-eye" aria-hidden="true" title="View"  style="padding-left: 10px;cursor: pointer;font-size: 18px; color: rgba(0,0,0,.69)"></i>'
      eDiv.appendChild(eSpan2)
      eSpan2.addEventListener('click', (e) => {
        if (params.data) {
          self.router.navigate(['drone/masters/details', params.data.name, params.data._id])
        }
      })
      return eDiv
    }
  // }

}
