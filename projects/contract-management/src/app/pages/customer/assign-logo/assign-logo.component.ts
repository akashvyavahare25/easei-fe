import { Component, OnInit } from '@angular/core';
import { APIService } from '../../../services/api.service';
import { NzUploadFile } from 'ng-zorro-antd/upload';
import { NzNotificationService } from 'ng-zorro-antd';
import * as _ from 'lodash';
import { FormArray, FormBuilder, FormGroup } from '@angular/forms'
import { Validators } from '@angular/forms';
import { CustomerService } from '../../../services/customer.service';
import { select, Store } from '@ngrx/store'
import * as Reducers from '../../../../../src/app/store/reducers'

@Component({
  selector: 'app-assign-logo',
  templateUrl: './assign-logo.component.html',
  styleUrls: ['./assign-logo.component.scss']
})
export class AssignLogoComponent implements OnInit {
  ownerList:any =[]
  fileList: NzUploadFile[] = [];
  customerForm:any
  ownerName:any
  customerList:any=[]
  role: any
  constructor( private apiService: APIService, private store: Store<any>,private formBuilder: FormBuilder, private notification: NzNotificationService,private customerService:CustomerService) {
    this.store.pipe(select(Reducers.getUser)).subscribe(state => {
      this.role = localStorage.getItem('role') ? localStorage.getItem('role') : state.role
      this.ownerName=localStorage.getItem('user') ? localStorage.getItem('user') : state.name
    });
   }

  ngOnInit(): void {
    this.apiService.getOwnerName().subscribe(res => {
      this.customerList=res.Customer_List
      if(this.role == 'admin'){
        res.data.forEach(element =>{
          if(element.toLowerCase() == this.ownerName.toLowerCase()){
           this.ownerList.push(element)
          }
        })
        }else{
        this.ownerList = res.data;
        }
    })
    this.customerForm = this.formBuilder.group({
      ownerName: ['', Validators.required],
    })
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
    const formData = new FormData();
    this.markFormGroupDirty(this.customerForm)
    if(this.customerForm.valid)
    {
      _.each(this.fileList,(file)=>{    
        formData.append('logo',file)
      })
      formData.append('owner',this.customerForm.value.ownerName)

      this.customerService.logoUpload(formData).subscribe(res=>{
        this.notification.success('Successfully', 'You have successfully save logo!')
        this.customerForm.reset()
        this.fileList=[]
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
}
