import { Component, OnInit,AfterViewInit  } from '@angular/core';
import { FormArray, FormBuilder, FormGroup } from '@angular/forms'
import { Validators } from '@angular/forms'
import { ActivatedRoute, Router } from '@angular/router'
import { Location, DatePipe } from '@angular/common';
import { NzNotificationService } from 'ng-zorro-antd'
import { FormBuilderService } from '../../../../../src/app/services/form-builder.service'
import { NzUploadFile } from 'ng-zorro-antd/upload';
import * as Reducers from '../../../../../src/app/store/reducers'
import { select, Store } from '@ngrx/store'
import { AppMasterService } from '../../../../../src/app/services/app-master.service'
import { APIService } from '../../../../../src/app/services/api.service'
import {CustomerService} from '../../../../../src/app/services/customer.service'
import * as _ from 'lodash';
@Component({
  selector: 'app-create-customer',
  templateUrl: './create-customer.component.html',
  styleUrls: ['./create-customer.component.scss']
})
export class CreateCustomerComponent implements OnInit {
  customerForm:any
  fileList: NzUploadFile[] = [];
  fileUrl:any;
  customerId:any;
  constructor( 
    private router: Router,
    private route: ActivatedRoute,
    private formBuilder: FormBuilder,
    private store: Store<any>,
    private appMasterService: AppMasterService,
    private notification: NzNotificationService,
    private apiService:APIService,
    private customerService:CustomerService
  ) {this.route.params.subscribe(params => {
    this.customerId = params['id']
  }) }

  ngOnInit(): void {
    this.customerForm = this.formBuilder.group({
      name: ['', Validators.required],
      //user: ['', Validators.required],
      //logo: ['', Validators.required],
      tagLine: ['', Validators.required],
      welcomeMessage: ['', Validators.required]      
    })
    if(this.customerId){
      this.customerService.getCustomerByID(this.customerId).subscribe(res=>{
        this.customerForm.patchValue(res)
      })
    }
  }
  beforeUpload = (file: NzUploadFile): boolean => {
    if(file.type==="image/jpeg" || file.type==="image/png"){
      this.fileList=[]
      this.fileList = this.fileList.concat(file);
      return false;
    }else{
      this.notification.success('info', 'This format not supported');
      return false
    }
  };
  submitForm(){
    const data=this.customerForm.value
    const formData = new FormData();
    Object.keys(data).forEach(fieldName => {
      formData.append(fieldName, data[fieldName]);
    })
    _.each(this.fileList,(file)=>{    
      formData.append(
        'logo',
        file,
        file.name
      )
    })
    console.log(formData)
    if(this.customerId){
      formData.append('_id',this.customerId)
      this.customerService.updateCustomer(this.customerId,formData).subscribe(res=>{
        this.notification.success('Successfully', 'You have successfully update Customer!')
        this.router.navigate(['/customer/all'])
      })
    }else{
      this.customerService.saveLogo(formData).subscribe(res=>{
        this.notification.success('Successfully', 'You have successfully save Customer!')
        this.customerForm.reset()
        this.fileList=[]
      })
    }
  }

}
