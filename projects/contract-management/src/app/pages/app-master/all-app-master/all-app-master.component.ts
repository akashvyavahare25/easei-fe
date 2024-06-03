import { Component, OnInit } from '@angular/core'
import { Router } from '@angular/router'
import * as moment from 'moment'
import { NzNotificationService } from 'ng-zorro-antd'
import { AppMasterService } from '../../../../../src/app/services/app-master.service'
import { select, Store } from '@ngrx/store'
import * as Reducers from '../../../../../src/app/store/reducers'
import * as _ from 'lodash'
import { MenuService } from '../../../../../src/app/services/menu'
import { GridOptions } from 'ag-grid-community'
import { GridActionComponent } from '../../../../../src/app/constants/grid-action/grid-action.component'

@Component({
  selector: 'app-all-app-master',
  templateUrl: './all-app-master.component.html',
  styleUrls: ['./all-app-master.component.scss']
})
export class AllAppMasterComponent implements OnInit {
  appMasterName: any = ''
  appMastersData: any = []
  gridApi: any
  gridOptions: any;
  columnDefs = [
    { field: 'name', headerName: 'Name', sortable: true, filter: 'agTextColumnFilter', floatingFilter: true },
    { field: 'status', headerName: 'status', sortable: true, filter: 'agTextColumnFilter', floatingFilter: true },
    { field: 'description', headerName: 'Description', sortable: true, filter: 'agTextColumnFilter', floatingFilter: true },

    {
      field: 'action', headerName: 'Action', lockPinned: true, maxWidth: 100, pinned: 'right', cellRendererFramework: GridActionComponent,
      /* cellRenderer: (params) => {
        const eDiv = document.createElement('div')
        const eSpan = document.createElement('span')
        const eSpan2 = document.createElement('span')
        eSpan.innerHTML = '<i class="fa fa-trash" aria-hidden="true" title="Delete"  style="cursor: pointer;font-size: 18px; color: rgba(0,0,0,.69)"></i>'
        eSpan2.innerHTML = '<i class="fa fa-pencil-square-o" aria-hidden="true" title="Edit"  style="cursor: pointer;font-size: 18px; color: rgba(0,0,0,.69)"></i> &nbsp;&nbsp;'
        eDiv.appendChild(eSpan2)
        eDiv.appendChild(eSpan)
        eSpan2.addEventListener('click', (e) => {
          if (params.data) {
            this.editAppMaster(params.data)
          }
        })
        eSpan.addEventListener('click', (e) => {
          if (params.data) {
            this.appMasterService.deleteAppMasterData(params.data._id).subscribe(res => {
              this.menuService.getMenuData();
              this.notification.success('Successfully', 'You have successfully delete Application Master!')
              const data = _.remove(this.appMastersData, (data) => {
                return data._id !== params.data._id
              })
              this.appMastersData = data
            })
          }
        })
        return eDiv
      } */
    }
  ]
  constructor(
    private appMasterService: AppMasterService,
    private notification: NzNotificationService,
    private router: Router,
    private menuService: MenuService,
    private store: Store<any>
  ) {
    this.store.pipe(select(Reducers.getSettings)).subscribe(state => {
      this.onFirstDataRendered(this.gridApi);
    })
    this.gridOptions = <GridOptions>{
      pagination: true,
      context: {
        componentParent: this,
        tabName: 'app-master',
        editPermission: ['application master:edit', 'admin', 'superadmin'],
        deletePermission: ['application master:delete', 'admin', 'superadmin']
      }
    };
  }

  ngOnInit(): void {
    this.appMasterService.getAllAppMasterData().subscribe(res => {
      this.appMastersData = res
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

  editAppMaster(data) {
    this.router.navigate(['/appmaster/edit', data._id])
  }


}
