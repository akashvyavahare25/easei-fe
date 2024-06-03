import { Component, OnInit } from '@angular/core';
import { NzNotificationService } from 'ng-zorro-antd'
import { select, Store } from '@ngrx/store'
import * as Reducers from '../../../../../src/app/store/reducers'
import * as _ from 'lodash'
import { MenuService } from '../../../../../src/app/services/menu'
import { GridOptions } from 'ag-grid-community'
import { GridActionComponent } from '../../../../../src/app/constants/grid-action/grid-action.component'
import { Router } from '@angular/router'
import { CustomerService} from '../../../../../src/app/services/customer.service'
import { CustomerModule } from '../customer.module';
@Component({
  selector: 'app-all-customer',
  templateUrl: './all-customer.component.html',
  styleUrls: ['./all-customer.component.scss']
})
export class AllCustomerComponent implements OnInit {
  customerData:any=[]
  gridApi: any;
  gridOptions: any;
  columnDefs = [
    { field: 'name', headerName: 'Name', sortable: true, filter: 'agTextColumnFilter', floatingFilter: true },
    { field: 'tagLine', headerName: 'Tag Line', sortable: true, filter: 'agTextColumnFilter', floatingFilter: true },
    { field: 'welcomeMessage', headerName: 'Welcome Message', sortable: true, filter: 'agTextColumnFilter', floatingFilter: true },
    {
      field: 'action', headerName: 'Action', lockPinned: true, maxWidth: 100, pinned: 'right', cellRendererFramework: GridActionComponent,      
    }
  ]
  constructor(
    private customerService:CustomerService,
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
        tabName: 'all-customer',
        // editPermission: ['application master:edit', 'admin', 'superadmin'],
        // deletePermission: ['application master:delete', 'admin', 'superadmin']
      }
    };    
   }


  ngOnInit(): void {
    this.customerService.getAllCustomer().subscribe(res=>{
      this.customerData=res
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
