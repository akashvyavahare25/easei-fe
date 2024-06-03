import { Component, OnInit } from '@angular/core';
import { NzNotificationService } from 'ng-zorro-antd'
import { AppMasterService } from '../../../../../src/app/services/app-master.service'
import { select, Store } from '@ngrx/store'
import * as Reducers from '../../../../../src/app/store/reducers'
import * as _ from 'lodash'
import { MenuService } from '../../../../../src/app/services/menu'
import { GridOptions } from 'ag-grid-community'
import { GridActionComponent } from '../../../../../src/app/constants/grid-action/grid-action.component'
import { Router } from '@angular/router'
import { HierarcyService} from '../../../../../src/app/services/hierarcy.service'
@Component({
  selector: 'app-all-hierarcy',
  templateUrl: './all-hierarcy.component.html',
  styleUrls: ['./all-hierarcy.component.scss']
})
export class AllHierarcyComponent implements OnInit {
  reportData:any = [];
  gridApi: any;
  gridOptions: any;
  columnDefs = [
    { field: 'name', headerName: 'Name', sortable: true, filter: 'agTextColumnFilter', floatingFilter: true },
    { field: 'masterName', headerName: 'Application', sortable: true, filter: 'agTextColumnFilter', floatingFilter: true },    
    //{ field: 'description', headerName: 'Description', sortable: true, filter: 'agTextColumnFilter', floatingFilter: true },
    {
      field: 'action', headerName: 'Action', lockPinned: true, maxWidth: 100, pinned: 'right', cellRendererFramework: GridActionComponent,
      
    }
  ]
  constructor(
    private hierarcyService:HierarcyService,
    private notification: NzNotificationService,
    private router: Router,
    private menuService: MenuService,
    private store: Store<any>
  ) {
    this.store.pipe(select(Reducers.getSettings)).subscribe(state => {
      this.onFirstDataRendered(this.gridApi);
    })
    this.gridOptions = <GridOptions>{
      context: {
        componentParent: this,
        tabName: 'all-hierarcy',
        // editPermission: ['application master:edit', 'admin', 'superadmin'],
        // deletePermission: ['application master:delete', 'admin', 'superadmin']
      }
    };    
   }

   ngOnInit(): void {
    this.hierarcyService.getAllHierarcy().subscribe(res=>{      
      this.reportData=res
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

