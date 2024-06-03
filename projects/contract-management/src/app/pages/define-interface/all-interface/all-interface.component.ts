import { Component, OnInit } from '@angular/core'
import { Router } from '@angular/router'
import { NzNotificationService } from 'ng-zorro-antd'
import { InterfaceService } from '../../../../../src/app/services/interface.service'
import { select, Store } from '@ngrx/store'
import * as Reducers from '../../../../../src/app/store/reducers'
import * as _ from 'lodash'
import { MenuService } from '../../../../../src/app/services/menu'
import { APIService } from '../../../../../src/app/services/api.service'
import { GridActionComponent } from '../../../../../src/app/constants/grid-action/grid-action.component'
import { GridOptions } from 'ag-grid-community'

@Component({
  selector: 'app-all-interface',
  templateUrl: './all-interface.component.html',
  styleUrls: ['./all-interface.component.scss']
})
export class AllInterfaceComponent implements OnInit {
  interfaceName: any = ''
  interfaceData: any = []
  gridApi: any
  gridOptions: any
  isFormVisible: any = false
  public form: any = {
    components: [{
      "type": "button",
      "label": "Submit",
      "key": "submit",
      "disableOnInvalid": true,
      "input": true,
      "tableView": false
    }]
  }
  columnDefs = [
    { field: 'name', headerName: 'Interface Name', sortable: true, filter: 'agTextColumnFilter', floatingFilter: true },
    { field: 'interfaceType', headerName: 'Interface Type', sortable: true, filter: 'agTextColumnFilter', floatingFilter: true },
    { field: 'apiinterface_data', headerName: 'Api Interface Data', sortable: true, filter: 'agTextColumnFilter', floatingFilter: true },
    {
      field: 'updatedAt', headerName: '', maxWidth: 125,
      cellRenderer: (params) => {
        const eDiv = document.createElement('div')
        const eSpan3 = document.createElement('span')
        eSpan3.innerHTML = this.apiService.getDataDiff(new Date(params.data.updatedAt), new Date(params.data.createdAt), new Date())
        eDiv.appendChild(eSpan3)
        return eDiv
      }
    },
    {
      field: 'action', headerName: 'Action', lockPinned: true, maxWidth: 110, pinned: 'right', cellRendererFramework: GridActionComponent
    }
  ]
  constructor(
    private interfaceService: InterfaceService,
    private notification: NzNotificationService,
    private router: Router,
    private menuService: MenuService,
    private store: Store<any>,
    private apiService: APIService
  ) {
    this.store.pipe(select(Reducers.getSettings)).subscribe(state => {
      this.onFirstDataRendered(this.gridApi);
    })

    this.gridOptions = <GridOptions>{
      pagination: true,
      context: {
        componentParent: this,
        tabName: 'all-interface',
        editPermission: ['apiinterface:edit', 'admin', 'superadmin'],
        showPermission: ['apiinterface:show', 'admin', 'superadmin'],
        deletePermission: ['apiinterface:delete', 'admin', 'superadmin']
      },
    };
  }

  ngOnInit(): void {
    this.interfaceService.getAllInterfaceData().subscribe(res => {
      this.interfaceData = res
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
  editScreen(data) {
    this.router.navigate(['/apiinterface/edit', data._id])
  }

  handleCancel() {
    this.isFormVisible = false
  }
  handleOk() {
    this.isFormVisible = false
  }
}
