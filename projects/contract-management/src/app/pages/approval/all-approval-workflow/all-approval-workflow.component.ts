import { Component, OnInit } from '@angular/core'
import { Router } from '@angular/router'
import { FormBuilder, FormArray, Validators } from '@angular/forms'
import { formioOptions } from './../../../constants/formiOptions'
import { NzNotificationService } from 'ng-zorro-antd'
import { MasterService } from '../../../../../src/app/services/master.service'
import { APIService } from '../../../../../src/app/services/api.service'
import { ApprovalService } from '../../../../../src/app/services/approval-service'
import { select, Store } from '@ngrx/store'
import * as Reducers from '../../../../../src/app/store/reducers'
import * as _ from 'lodash'

@Component({
  selector: 'app-all-approval-workflow',
  templateUrl: './all-approval-workflow.component.html',
  styleUrls: ['./all-approval-workflow.component.scss']
})
export class AllApprovalWorkflowComponent implements OnInit {
  approvalWorkflowData: any
  gridApi: any
  columnDefs = [
    { field: 'name', headerName: 'Workflow Name', sortable: true, filter: 'agTextColumnFilter', floatingFilter: true },
    { field: 'targetType', headerName: 'Screen/Master/Parameter', sortable: true, filter: 'agTextColumnFilter', floatingFilter: true },
    {
      headerName: 'Trigger', sortable: true, filter: 'agTextColumnFilter', floatingFilter: true,
      valueGetter: (params) => {
        if (params.data.triggerOn && params.data.triggerOn.length > 0) {
          let value = '';
          _.each(params.data.triggerOn, (trigger, index) => {
            if (params.data.triggerOn.length - 1 === index) {
              value = value + trigger
            } else {
              value = value + trigger + ', ';
            }
          })
          return value
        }
      },
    },
    {
      field: 'action', headerName: 'Action', width: 60, maxWidth: 100, pinned: 'right', lockPinned: true,
      cellRenderer: (params) => {
        const eDiv = document.createElement('div')
        const eSpan = document.createElement('span')
        const eSpan2 = document.createElement('span')
        eSpan.innerHTML = '<i class="fa fa-trash" aria-hidden="true" title="Delete"  style="cursor: pointer;font-size: 18px; color: rgba(0,0,0,.69)"></i>'
        eSpan2.innerHTML = '<i class="fa fa-pencil-square-o" aria-hidden="true" title="Edit"  style="cursor: pointer;font-size: 18px; color: rgba(0,0,0,.69);margin-right: 20px;margin-left: 10px"></i> '
        eDiv.appendChild(eSpan2)
        eDiv.appendChild(eSpan)
        eSpan2.addEventListener('click', (e) => {
          if (params.data) {
            this.editWorkFlow(params.data)
          }
        })
        eSpan.addEventListener('click', (e) => {
          if (params.data) {
            this.approvalService.deleteApprovalWorkfow(params.data._id).subscribe(res => {
              this.notification.success('Successfully', 'You have successfully delete master!')
              const data = _.remove(this.approvalWorkflowData, (data) => {
                return data._id !== params.data._id
              })
              this.approvalWorkflowData = data
            })
          }
        })
        return eDiv
      }
    }
  ]

  constructor(
    private masterService: MasterService,
    private notification: NzNotificationService,
    private router: Router,
    private apiService: APIService,
    private formBuilder: FormBuilder,
    private approvalService: ApprovalService,
    private store: Store<any>
  ) {
    this.store.pipe(select(Reducers.getSettings)).subscribe(state => {
      this.onFirstDataRendered(this.gridApi);
    })
  }

  ngOnInit(): void {
    this.approvalService.getAllApprovalWorkfow().subscribe(res => {
      this.approvalWorkflowData = res;
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

  editWorkFlow(data) {
    this.router.navigate(['/approval/workflow', data._id])
  }



}
