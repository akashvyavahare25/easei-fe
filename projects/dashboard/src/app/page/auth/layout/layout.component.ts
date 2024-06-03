import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { select, Store } from '@ngrx/store'
import { environment } from '../../../../../../../src/environments/environment';
import * as Reducers from '../../../../../src/app/store/reducers'
import { DataService } from '../../../data.service';
import {imgUrl} from '../../../../../../contract-management/src/app/services/api.service'
@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss']
})
export class LayoutComponent implements OnInit {
  isLogin = false;
  role:any 
  isHide:boolean=false
  year=new Date();
  cust_name:any ="Ease-i"
  logoImage:any= 'assets/images/logo1.png'
  roles:any=["admin","superadmin"]
  constructor(public service: DataService,private router: Router,private store: Store<any>,) {
    this.store.pipe(select(Reducers.getUser)).subscribe(state => {
      this.role = localStorage.getItem('role') ? localStorage.getItem('role') : state.role
      this.role= this.role.split(',')
      this.cust_name = state.customer
      if (state.logo) {
        this.logoImage = environment.baseUrl +imgUrl+ state.logo
        this.logoImage = this.logoImage.replace(/\\/g, "/")
      } else {
        this.logoImage = 'assets/images/logo1.png'
      }
    })
    if(this.isValid(this.role,this.roles)){
      this.isHide=true;
    }
   }
 
  ngOnInit(): void {
    if( localStorage.getItem('jwtToken')){
      this.isLogin=true
    }
  //  this.isLogin= this.service.isLogin
  //  this.cust_name = localStorage.getItem("user")
  }
  switchApplication(event:any){
    if(event.value=="drone"){
      // this.router.navigate(['', { outlets: { applicationOutlet: 'front' } }]);
      this.router.navigate(['drone/home'])
    }
 
  }

  isValid(arr1:any, arr2:any) {
    return arr1.some((item:any) => arr2.includes(item))
  }
}
