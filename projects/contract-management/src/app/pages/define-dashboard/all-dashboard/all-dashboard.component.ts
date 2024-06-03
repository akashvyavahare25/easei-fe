import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NzNotificationService } from 'ng-zorro-antd';
import { GridActionComponent } from '../../../../../src/app/constants/grid-action/grid-action.component';
import { DashboardService } from '../../../../../src/app/services/dashboard.service';
import { select, Store } from '@ngrx/store'
import * as Reducers from '../../../../../src/app/store/reducers'
import * as _ from 'lodash'
import { GridOptions } from 'ag-grid-community';

@Component({
  selector: 'app-all-dashboard',
  templateUrl: './all-dashboard.component.html',
  styleUrls: ['./all-dashboard.component.scss']
})
export class AllDashboardComponent implements OnInit {
  rowData: any = []
  gridApi: any
  gridOptions: any;
  columnDefs = [
    { field: 'name', headerName: 'Dashboard Name', sortable: true, filter: 'agTextColumnFilter', floatingFilter: true, },
    {
      field: 'action',
      headerName: 'Action',
      lockPinned: true,
      pinned: 'right',
      maxWidth: 100,
      cellRendererFramework: GridActionComponent,
    }
  ]

  constructor(
    private dashboardService: DashboardService,
    private router: Router,
    private route: ActivatedRoute,
    private store: Store<any>,
    private notification: NzNotificationService
  ) {
    this.store.pipe(select(Reducers.getSettings)).subscribe(state => {
      this.onFirstDataRendered(this.gridApi);
    })
    this.gridOptions = <GridOptions>{
      pagination: true,
      context: {
        componentParent: this,
        tabName: 'dashboard',
        editPermission: ['-', 'admin', 'superadmin'],
        deletePermission: ['-', 'admin', 'superadmin']
      }
    };
  }

  ngOnInit(): void {
    this.dashboardService.getAllDasbhoard().subscribe((response) => {
      this.rowData = response;
    });
  }

  onFirstDataRendered(params) {
    this.gridApi = params;
    setTimeout(() => {
      if (this.gridApi && this.gridApi.api) {
        this.gridApi.api.sizeColumnsToFit()
      }
    }, 100)
  }

}
