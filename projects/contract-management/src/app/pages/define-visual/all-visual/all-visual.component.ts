import { Component, OnInit } from '@angular/core';
import { NzNotificationService } from 'ng-zorro-antd'
import { select, Store } from '@ngrx/store'
import * as Reducers from '../../../../../src/app/store/reducers'
import * as _ from 'lodash'
import { MenuService } from '../../../../../src/app/services/menu'
import { GridOptions } from 'ag-grid-community'
import { GridActionComponent } from '../../../../../src/app/constants/grid-action/grid-action.component'
import { Router } from '@angular/router'
import {VisualService} from '../../../../../src/app/services/visual.service';
@Component({
  selector: 'app-all-visual',
  templateUrl: './all-visual.component.html',
  styleUrls: ['./all-visual.component.scss']
})
export class AllVisualComponent implements OnInit {

  visualData:any = [];
  gridApi: any;
  gridOptions: any;
  columnDefs = [
    { field: 'name', headerName: 'Name', sortable: true, filter: 'agTextColumnFilter', floatingFilter: true },
    { field: 'report', headerName: 'Report', sortable: true, filter: 'agTextColumnFilter', floatingFilter: true },
    // { field: 'screenData.name', headerName: 'Screen Name', sortable: true, filter: 'agTextColumnFilter', floatingFilter: true },
    // { field: 'queryType', headerName: 'Query Type', sortable: true, filter: 'agTextColumnFilter', floatingFilter: true },
    //{ field: 'description', headerName: 'Description', sortable: true, filter: 'agTextColumnFilter', floatingFilter: true },
    {
      field: 'action', headerName: 'Action', lockPinned: true, maxWidth: 100, pinned: 'right', cellRendererFramework: GridActionComponent,
      
    }
  ]
  constructor(
    private notification: NzNotificationService,
    private router: Router,
    private menuService: MenuService,
    private visualService:VisualService,
    private store: Store<any>
  ) {
    this.store.pipe(select(Reducers.getSettings)).subscribe(state => {
      this.onFirstDataRendered(this.gridApi);
    })
    this.gridOptions = <GridOptions>{
      context: {
        componentParent: this,
        tabName: 'all-visual',
        // editPermission: ['application master:edit', 'admin', 'superAdmin'],
        // deletePermission: ['application master:delete', 'admin', 'superAdmin']
      }
    };    
   }

   ngOnInit(): void {
    this.visualService.getGraphs().subscribe(res=>{
      this.visualData=res
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


}
