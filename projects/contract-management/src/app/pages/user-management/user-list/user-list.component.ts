import { Component, OnInit } from '@angular/core'
import { Router } from '@angular/router'
import { FormBuilder } from '@angular/forms'
import { APIService } from '../../../../../src/app/services/api.service'
import { select, Store } from '@ngrx/store'
import * as Reducers from '../../../../../src/app/store/reducers'
import * as _ from 'lodash'
import { NzNotificationService } from 'ng-zorro-antd'
import { GridOptions } from 'ag-grid-community'
import { GridActionComponent } from '../../../../../src/app/constants/grid-action/grid-action.component'

let self: any
@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss'],
})
export class UserListComponent implements OnInit {
  frameworkComponents: any
  gridApi: any
  pagination:boolean=true
  paginationPageSize=20
  rowData:any= []
  gridOptions:any
  columnDefs: any = []
 
  constructor(
    private apiService: APIService,
    private router: Router,
    private store: Store<any>,
    private notification: NzNotificationService) {
    self = this
    this.store.pipe(select(Reducers.getSettings)).subscribe(state => {
      this.onFirstDataRendered(this.gridApi);
    })
    this.gridOptions = <GridOptions>{
      columnDefs:[
        { field: 'id', hide: true },
        { field: 'firstName', sortable: true, filter: true },
        { field: 'lastName', sortable: true, filter: true },
        { field: 'email', sortable: true, filter: true },
        { field: 'ownername', sortable: true, filter: true },
        {
          field: 'plantName',
          sortable: true,
          filter: true,
          valueFormatter: this.arrayToString,
        },
        {
          field: 'roleName',
          sortable: true,
          filter: true,
          valueFormatter: this.arrayToString,
        },
        // { field: 'designation', headerName: 'Responsibility ', sortable: true, filter: true },
        // { field: 'department', sortable: true, filter: true },
        // { field: 'address', sortable: true, filter: true },
       {
          field: 'action', headerName: 'Action', lockPinned: true, maxWidth: 100, pinned: 'right', cellRendererFramework: GridActionComponent,
    
        }
      ],
      overlayLoadingTemplate: `
      <div class="ag-custom-loading-cell" >  
      <i style="font-size:18px" class="fas fa-spinner fa-pulse"></i> 
      <span style="font-size:16px; margin-left:3px">Loading ... </span>
      </div>`,
      overlayNoRowsTemplate:
      `<span style="font-size:16px">No Rows To Show</span>`,   
      context: {
        componentParent: this,
        tabName: 'all-user',
         editPermission: ['admin', 'superadmin'],
         deletePermission: ['admin', 'superadmin']
      }
    };
  }

  ngOnInit(): void {
    this.apiService.getAllUsers().subscribe(res => {
      this.rowData = res
      this.gridOptions.api!.setRowData(this.rowData);
    })
  }
  arrayToString(params) {
    if(params.value){
    return params.value.toString()
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

  addUser() {
    this.router.navigate(['/drone/user/create'])
  }
}
