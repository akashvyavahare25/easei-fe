import { Component, OnInit } from '@angular/core'
import { Router } from '@angular/router'
import { FormBuilder } from '@angular/forms'
import { APIService } from 'projects/contract-management/src/app/services/api.service'
import { select, Store } from '@ngrx/store'
import * as Reducers from 'projects/contract-management/src/app/store/reducers'
import * as _ from 'lodash'

let self: any 
@Component({
  selector: 'app-help-person-list',
  templateUrl: './help-person-list.component.html',
  styleUrls: ['./help-person-list.component.scss']
})
export class HelpPersonListComponent implements OnInit {
  
  
      frameworkComponents: any
      gridApi: any
      columnDefs: any = [
        { field: '_id', hide: true },
        { field: 'Owner Name', sortable: true, filter: true },
        { field: 'Customer Name', sortable: true, filter: true },
        { field: 'Name of the support person', sortable: true, filter: true },
        { field: 'Level 1', sortable: true, filter: true },
        { field: 'Email', sortable: true, filter: true },
        { field: 'Phone', sortable: true, filter: true },
        /* {
          field: 'roles',
          sortable: true,
          filter: true,
          valueFormatter: this.arrayToString,
        },
        { field: 'designation', headerName: 'Responsibility ', sortable: true, filter: true },
        { field: 'department', sortable: true, filter: true },
        { field: 'address', sortable: true, filter: true },  */
        {
          headerName: 'Actions',
          cellRenderer: this.renderActions,
          pinned: 'right',
          lockPinned: true,
          maxWidth: 100
        },
      ]
      rowData = []
      constructor(
        private apiService: APIService,
        private router: Router,
        private store: Store<any>) {
        self = this
       /*  this.store.pipe(select(Reducers.getSettings)).subscribe(state => {
          this.onFirstDataRendered(this.gridApi);
        }) */
      }
    
      ngOnInit(): void {
       /*  this.apiService.getAllUsers().subscribe(res => {
          this.rowData = res
        }) */
      }
    
    
      renderActions(params) {
        const eDiv = document.createElement('div')
        const eSpan = document.createElement('span')
        const eSpan2 = document.createElement('span')
        eSpan.innerHTML = '<i class="fa fa-pencil-square-o" title="Edit" aria-hidden="true" style="cursor: pointer;font-size: 18px; color: rgba(0,0,0,.69)"></i>'
        eDiv.appendChild(eSpan)
        eSpan.addEventListener('click', (e) => {
          if (params.data) {
            self.router.navigate(['/user/update', params.data._id])
          }
        })
        return eDiv
      }
    
      arrayToString(params) {
        return params.value.toString()
      }
    
      onFirstDataRendered(params) {
       /*  this.gridApi = params;
        setTimeout(() => {
          if (this.gridApi && this.gridApi.api) {
            this.gridApi.api.sizeColumnsToFit()
          }
        }, 100) */
      }
    
      addRole() {
        this.router.navigate(['/drone/help/create'])
      }
    }
    