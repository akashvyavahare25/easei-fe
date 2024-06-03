
  import { Component, OnInit } from '@angular/core'
  import { ActivatedRoute, Router } from '@angular/router'
  import { FormBuilder, FormGroup, Validators } from '@angular/forms' 
  import { NzNotificationService } from 'ng-zorro-antd' 
  import { select, Store } from '@ngrx/store'
import { APIService } from '../../../services/api.service'
import { CustomerService } from '../../../services/customer.service'
  import * as Reducers from 'projects/contract-management/src/app/store/reducers'
  import * as _ from 'lodash'
@Component({
  selector: 'app-role',
  templateUrl: './role.component.html',
  styleUrls: ['./role.component.scss']
})
export class RoleComponent implements OnInit {
    roleForm: FormGroup 
    constructor(
      private fb: FormBuilder,
      private apiService: APIService,
      private route: ActivatedRoute,
      private notification: NzNotificationService,
      private router: Router,
      private customerService: CustomerService,
      private store: Store<any>,
    ) {
      
    }
  
  
    ngOnInit(): void {
      this.roleForm = this.fb.group({
        roleName: [null, [Validators.required]],
      })
    }
   
  
    submitForm1(): void {
     
    }
  
    goBack() {
      this.router.navigate(['/drone/role/list'])
    }
  
  }
  