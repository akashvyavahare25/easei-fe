import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Validators } from '@angular/forms'
import { NzNotificationService } from 'ng-zorro-antd';
import { RoleService } from '../../../../../src/app/services/role.service'
import { GridOptions } from 'ag-grid-community'
import { GridActionComponent } from '../../../../../src/app/constants/grid-action/grid-action.component'
import { select, Store } from '@ngrx/store'
import * as Reducers from '../../../../../src/app/store/reducers'
@Component({
  selector: 'app-create-roles',
  templateUrl: './create-roles.component.html',
  styleUrls: ['./create-roles.component.scss']
})
export class CreateRolesComponent implements OnInit {
  roleForm: any;
  rolesData:any
  gridApi: any;
  gridOptions: any;
  columnDefs = [
    { field: 'name', headerName: 'Name', sortable: true, filter: 'agTextColumnFilter', floatingFilter: true }
  ]
  constructor(
    private formBuilder: FormBuilder,
    private roleService:RoleService,
    private notification: NzNotificationService,
    private store: Store<any>
  ) { 
    this.store.pipe(select(Reducers.getSettings)).subscribe(state => {
      this.onFirstDataRendered(this.gridApi);
    })
    this.gridOptions = <GridOptions>{
    context: {
      componentParent: this,
      tabName: 'all-roles',
      // editPermission: ['application master:edit', 'admin', 'superAdmin'],
      // deletePermission: ['application master:delete', 'admin', 'superAdmin']
    }
  }; }

  ngOnInit(): void {
    this.roleForm = this.formBuilder.group({
      name: ['', Validators.required]
    
    })
    this.roleService.getroless().subscribe(res=>{      
      this.rolesData=res
    })
  }
  submitForm() {
    this.markFormGroupDirty(this.roleForm)
    if (this.roleForm.valid) {
     let data = {
        name: this.roleForm.value.name       
      }
      this.roleService.saveroles(data).subscribe(res=>{
        this.notification.success('Successfully', 'You have successfully save the role!')
      })

    }
  }

  markFormGroupDirty(form) {
    (<any>Object).values(form.controls).forEach(control => {
      control.markAsDirty()
      control.updateValueAndValidity()
      if (control.controls) {
        this.markFormGroupDirty(control)
       
      }
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
