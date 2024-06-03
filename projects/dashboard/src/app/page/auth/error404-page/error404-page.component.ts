import { Component, OnInit } from '@angular/core';
import {  Router } from '@angular/router'
import { select, Store } from '@ngrx/store'
//import * as Reducers from 'src/app/store/reducers'

@Component({
  selector: 'app-error404-page',
  templateUrl: './error404-page.component.html',
  styleUrls: ['./error404-page.component.scss']
})
export class Error404PageComponent  {
  authorized: boolean
  role: any

  constructor(  private store: Store<any>,
    public router: Router) {
      // this.store.pipe(select(Reducers.getUser)).subscribe(state => {
      //   this.authorized = state.authorized
      //   this.role = localStorage.getItem('role') ? localStorage.getItem('role') : state.role
      // })
    }

    navigate(){
      if (localStorage.getItem('jwtToken') ) { 
        if(this.role=='admin'){
          this.router.navigate(['/portfolio/home']);
        }
        else if(this.role=='plant'){
          this.router.navigate(['/plant/plants']);
        }
        else if(this.role=='oem'){
          this.router.navigate(['/oem/dashboard/new']);
        }
       }
       else{
        this.router.navigate(['/auth/login']);
       }
    }
     
}