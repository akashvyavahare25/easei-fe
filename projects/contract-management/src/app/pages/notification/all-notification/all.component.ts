import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { select, Store } from '@ngrx/store';
import { GridOptions } from 'ag-grid-community';
import { NzNotificationService } from 'ng-zorro-antd';
import * as Reducers from '../../../../../src/app/store/reducers';
import * as _ from 'lodash';
import * as moment from 'moment';
import { FormRenderService } from '../../../../../src/app/services/form-render.service';
import { NotificationService } from '../../../../../src/app/services/notification.service';

@Component({
  selector: 'app-all',
  templateUrl: './all.component.html',
  styleUrls: ['./all.component.scss']
})
export class AllComponent implements OnInit {
  gridApi: any
  gridOptions: any;
  rowData: any = [];
  columnDefs = [
    { field: 'description', headerName: 'Description', filter: 'agTextColumnFilter', floatingFilter: true, },
    {
      headerName: 'Owner', sortable: true, filter: 'agTextColumnFilter', floatingFilter: true,
      valueGetter: (params) => {
        if (params.data.ownerUser && params.data.ownerUser.length > 0) {
          return params.data.ownerUser[0].firstName + ' ' + params.data.ownerUser[0].lastName
        }
      },
    },
    {
      headerName: 'Created Time', filter: 'agTextColumnFilter', floatingFilter: true,
      valueGetter: (params) => {
        return moment(params.data.initiatedAt).format("YYYY-MM-DD, hh:mm A");
      },
    },
    { field: 'progress', headerName: 'Progress', filter: 'agTextColumnFilter', floatingFilter: true, },
    {
      headerName: 'Last Action By', filter: 'agTextColumnFilter', floatingFilter: true,
      valueGetter: (params) => {
        if (params.data.lastActionUser && params.data.lastActionUser.length > 0) {
          return params.data.lastActionUser[0].firstName + ' ' + params.data.lastActionUser[0].lastName
        }
      },
    },
    {
      headerName: 'Last Action On', filter: 'agTextColumnFilter', floatingFilter: true,
      valueGetter: (params) => {
        if (params.data.lastActionUser && params.data.lastActionUser.length > 0) {
          return moment(params.data.lastActionOn).format("YYYY-MM-DD, hh:mm A");
        }
      },
    },
    {
      headerName: 'Last Action', filter: 'agTextColumnFilter', floatingFilter: true,
      valueGetter: (params) => {
        if (params.data) {
          const splitObject = _.split(params.data.progress, '/')
          if (splitObject[0] == splitObject[1]) {
            return 'Finished';
          } else {
            return params.data.lastActionStatus
          }
        }
      },
    },

  ]

  constructor(
    private router: Router,
    private notification: NzNotificationService,
    private store: Store<any>,
    private formRenderService: FormRenderService,
    private notificationService: NotificationService
  ) {
    this.store.pipe(select(Reducers.getSettings)).subscribe(state => {
      this.onFirstDataRendered(this.gridApi);
    })
    this.gridOptions = <GridOptions>{
      pagination: true,
      getRowStyle(params) {
        return { 'cursor': 'pointer' }
      },

      context: {
        componentParent: this,
        editPermission: ['-', 'admin', 'superAdmin'],
        deletePermission: ['-', 'admin', 'superAdmin']
      }
    };
  }

  ngOnInit(): void {
    this.notificationService.getNoActionNotification().subscribe(res => {
      this.rowData = res;
    })
  }

  onRowClicked(event) {
    this.router.navigate(['/notification/action/', event.data.targetObject, event.data.wfRunObject, event.data.wfInstanceId, event.data._id])
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
