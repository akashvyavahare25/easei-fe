import { Component, OnInit } from '@angular/core'
import { FormBuilder, Validators } from '@angular/forms'
import { Router } from '@angular/router'
import { NzNotificationService } from 'ng-zorro-antd'
import { FormBuilderService } from '../../../../../src/app/services/form-builder.service'
import { FormRenderService } from '../../../../../src/app/services/form-render.service'
import { select, Store } from '@ngrx/store'
import * as Reducers from '../../../../../src/app/store/reducers'
import * as _ from 'lodash'
import { APIService } from '../../../../../src/app/services/api.service'
import { GridOptions } from 'ag-grid-community'
import { GridActionComponent } from '../../../../../src/app/constants/grid-action/grid-action.component'
import * as moment from 'moment'
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-alpine.css';

@Component({
  selector: 'app-form-render',
  templateUrl: './form-render.component.html',
  styleUrls: ['./form-render.component.scss']
})
export class FormRenderComponent implements OnInit {
  selectedData: any = { components: [] }
  rowData: any = []
  item: any = []
  gridApi: any
  gridOptions: any;

  constructor(
    private router: Router,
    private formRenderService: FormRenderService,
    private formBuilder: FormBuilder,
    private formBuilderService: FormBuilderService,
    private notification: NzNotificationService,
    private store: Store<any>,
    private apiService: APIService
  ) {
    this.store.pipe(select(Reducers.getSettings)).subscribe(state => {
      this.onFirstDataRendered(this.gridApi);
    })
    this.gridOptions = <GridOptions>{
      columnDefs: [
        { field: 'name', headerName: 'Paramater Name', sortable: true, filter: 'agTextColumnFilter', floatingFilter: true, },
        { field: 'externalCode', headerName: 'External Code', filter: 'agTextColumnFilter', floatingFilter: true, },
        { field: 'status', headerName: 'Status', filter: 'agTextColumnFilter', floatingFilter: true, },
        { field: 'category', headerName: 'Category', filter: 'agTextColumnFilter', floatingFilter: true, },
        { field: 'type', headerName: 'Type', filter: 'agTextColumnFilter', floatingFilter: true, },
        { field: 'updated_by', headerName: 'Updated_by', sortable: true, filter: 'agTextColumnFilter', floatingFilter: true },

        {
          field: 'updatedAt', headerName: 'Updated_ts', maxWidth: 175,
          // cellRenderer: (params) => {
          //   const eDiv = document.createElement('div')
          //   const eSpan3 = document.createElement('span')
          //   eSpan3.innerHTML = this.apiService.getDataDiff(new Date(params.data.updatedAt), new Date(params.data.createdAt), new Date())
          //   eDiv.appendChild(eSpan3)
          //   return eDiv
          // }
        },
        {
          field: 'action',
          headerName: 'Action',
          lockPinned: true,
          pinned: 'right',
          maxWidth: 100,
          cellRendererFramework: GridActionComponent,
        }
      ],
  
      overlayLoadingTemplate: `
      <div class="ag-custom-loading-cell" >  
      <i style="font-size:18px" class="fas fa-spinner fa-pulse"></i> 
      <span style="font-size:16px; margin-left:3px">Loading ... </span>
      </div>`,
      overlayNoRowsTemplate:
      `<span style="font-size:16px">No Rows To Show</span>`,  
      pagination: true,
      context: {
        componentParent: this,
        tabName: 'parameter',
        editPermission: ['parameter:edit', 'admin', 'superadmin'],
        deletePermission: ['parameter:delete', 'admin', 'superadmin']
      }
    };
  }

  ngOnInit(): void {
    setTimeout(() => {
      this.formRenderService.getAllData().subscribe(res => {
        this.rowData = res
        this.rowData.forEach(element => {
          element.updatedAt = moment.utc(element.updated_ts).local().format("DD-MM-yyyy HH:mm:ss");
        })
        this.gridOptions.api!.setRowData(this.rowData);
      })
    }, 500);

    /* this.renderForm = this.formBuilder.group({
      name: ['', Validators.required],
      code: ['', Validators.required],
      status: ['', Validators.required]
    }) */
  }

  onFirstDataRendered(params) {
    this.gridApi = params;
    setTimeout(() => {
      if (this.gridApi && this.gridApi.api) {
        this.gridApi.api.sizeColumnsToFit()
      }
    }, 100)
  }

  /*  editOrUpdate(params) {
 
   }
  */

  /* openComponentsData(data): void {
    data.configuration.forEach(element => {
      this.item.push(element)
    })
    const item = {
      'components': this.item
    }
    this.selectedData = item
  }

  submitForm() {
    this.markFormGroupDirty(this.renderForm)
    if (this.renderForm.valid) {
      const data = {
        name: this.renderForm.value.name,
        code: this.renderForm.value.code,
        stauts: this.renderForm.value.stauts,
      }
      this.formBuilderService.saveFormBuilder(data).subscribe(res => {
        this.notification.success('Successfully', 'You have successfully save Form!')
        this.renderForm.reset()
      })
    }
  }

  clearForm() {
    this.renderForm.reset()
  }

  markFormGroupDirty(form) {
    (<any>Object).values(form.controls).forEach(control => {
      control.markAsDirty()
      control.updateValueAndValidity()
      if (control.controls) {
        this.markFormGroupDirty(control)
      }
    })
  } */

  /* editParamater(data) {
    this.router.navigate(['/parameter/edit', data._id]);
  } */
}
