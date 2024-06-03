import { Component, OnInit } from '@angular/core'
import { ActivatedRoute, Router } from '@angular/router'
import { FormBuilder, FormGroup, Validators } from '@angular/forms' 
import { NzNotificationService } from 'ng-zorro-antd' 
import { select, Store } from '@ngrx/store'
import { APIService } from '../../../services/api.service'
import { CustomerService } from '../../../services/customer.service'
import * as Reducers from 'projects/contract-management/src/app/store/reducers'
import * as _ from 'lodash'
// var require : any
import * as jsonata from 'jsonata'
// var jsonata = require('jsonata');

@Component({
  selector: 'app-add-help-person',
  templateUrl: './add-help-person.component.html',
  styleUrls: ['./add-help-person.component.scss']
})
export class AddHelpPersonComponent implements OnInit {

  ownerList: any = []
  helpForm: FormGroup 
  plantList: any = []
  plantsIdName:any=[]
  inchargeIdName:any=[]
  constructor(
      private fb: FormBuilder,
      private apiService: APIService,
      private route: ActivatedRoute,
      private notification: NzNotificationService,
      private router: Router,
      private customerService: CustomerService,
      private store: Store<any>){
    }
  
  
    ngOnInit(): void {
      this.apiService.getOwnerName().subscribe(res => {
        this.ownerList = res;
      })

      this.helpForm = this.fb.group({
        owner_name: [null, [Validators.required]],
        customer_Name: [null, [Validators.required]],
        support_person: [null, [Validators.required]],
        level_name: [null, [Validators.required]],
        email: [null, [Validators.email, Validators.required]],
        phone_no: [null,  [Validators.required, Validators.pattern("^((\\+91-?)|0)?[0-9]{10}$")]]  
      })
    }

    getPlantName(event:any){
       this.plantsIdName=[]
       this.apiService.getPlants(event).subscribe(res => {
         this.plantList = res;
         let arrayData:any = jsonata("data[*].countries[*].states[*].plants").evaluate(this.plantList)
         arrayData.forEach(id =>{
           this.plantsIdName.push({
             "uuid":id.uuid,
             "name":id.name
           })
         }) 
       })
     }

     getIncharge(event:any){ 
       let id= "name= '" +event + "'"
         let arrayData:any = jsonata("data[*].countries[*].states[*].plants["+id+"].incharges").evaluate(this.plantList)
         arrayData.forEach(id =>{
          this.inchargeIdName.push({
            "uuid":id.uuid,
            "name":id.name
          })
        })  
     }
  
    submitForm1(): void {
      for (const i in this.helpForm.controls) {
        if (this.helpForm.controls.hasOwnProperty(i)) {
          this.helpForm.controls[i].markAsDirty()
          this.helpForm.controls[i].updateValueAndValidity()
        }
      }
     let data : any
     data=  this.helpForm.value 
     if(this.helpForm.valid)
      this.apiService.addHelpPerson(JSON.stringify(data)).subscribe((res) => {
        this.router.navigate(['/drone/help/list'])
        this.notification.success("Add Help Person","Successfully")
      },
        (error) => {
          if (error.error) {
            this.notification.error('Add Help', error.error.message)
          }
        })
    }
  
    goBack() {
      this.router.navigate(['/drone/help/list'])
    }
  
  }
  