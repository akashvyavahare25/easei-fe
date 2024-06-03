import { Component, OnInit } from '@angular/core'
import { Router } from '@angular/router'
import { NzNotificationService } from 'ng-zorro-antd'
import { ScreenService } from '../../../../../src/app/services/screen.service'
import { select, Store } from '@ngrx/store'
import * as Reducers from '../../../../../src/app/store/reducers'
import * as _ from 'lodash'
import { MenuService } from '../../../../../src/app/services/menu'
import { APIService } from '../../../../../src/app/services/api.service'
import { GridActionComponent } from '../../../../../src/app/constants/grid-action/grid-action.component'
import { GridOptions } from 'ag-grid-community'

@Component({
  selector: 'app-all-screen',
  templateUrl: './all-screen.component.html',
  styleUrls: ['./all-screen.component.scss']
})
export class AllScreenComponent implements OnInit {
  screenName: any = ''
  screensData: any = []
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
    { field: 'name', headerName: 'Screen Name', sortable: true, filter: 'agTextColumnFilter', floatingFilter: true },
    { field: 'externalCode', headerName: 'External Code', sortable: true, filter: 'agTextColumnFilter', floatingFilter: true },
    { field: 'description', headerName: 'Description', sortable: true, filter: 'agTextColumnFilter', floatingFilter: true },
    { field: 'screen_layout', headerName: 'Screen Layout', sortable: true, filter: 'agTextColumnFilter', floatingFilter: true, width: 120 },
    { field: 'type', headerName: 'Screen Type', sortable: true, filter: 'agTextColumnFilter', floatingFilter: true, width: 120 },
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
    private screenService: ScreenService,
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
        tabName: 'define-screen',
        editPermission: ['screen:edit', 'admin', 'superAdmin'],
        showPermission: ['screen:show', 'admin', 'superAdmin'],
        deletePermission: ['screen:delete', 'admin', 'superAdmin']
      },
    };
  }

  ngOnInit(): void {
    this.screenService.getAllScreenData().subscribe(res => {
      this.screensData = res
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
    this.router.navigate(['/screen/edit', data._id])
  }



  handleCancel() {
    this.isFormVisible = false
  }
  handleOk() {
    this.isFormVisible = false
  }
}
