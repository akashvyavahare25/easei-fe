import { Component, OnInit, Input } from '@angular/core'
import { Router, NavigationStart } from '@angular/router'
import { filter } from 'rxjs/operators'
import * as _ from 'lodash'
import { select, Store } from '@ngrx/store'
import { MenuService } from '../../../../../../src/app/services/menu'
import * as SettingsActions from '../../../../../../src/app/store/settings/actions'
import * as Reducers from '../../../../../../src/app/store/reducers'
//import { environment } from 'ng-zorro-antd'
import { environment } from 'src/environments/environment'
import { FormBuilder } from '@angular/forms'
@Component({
  selector: 'cui-topbar',
  templateUrl: './topbar.component.html',
  styleUrls: ['./topbar.component.scss'],
})
export class TopbarComponent implements OnInit {
  companyName: any
  application: any
  tagLine: any
  role: any
  isAdmin:boolean=false;
  ownerName: any
  customerName: any
  constructor(private menuService: MenuService,
    private store: Store<any>,
    private router: Router, private formBuilder: FormBuilder) {
    this.role = localStorage.getItem('role')
    this.ownerName = localStorage.getItem('user')
    this.customerName =  localStorage.getItem('customer')
    this.store.pipe(select(Reducers.getUser)).subscribe(state => {
      if (_.includes(state.role, 'superadmin-it')) {
        this.companyName = "Ease-i"
        this.isAdmin=false
      } 
      else if(_.includes(state.role, 'admin')){
        this.companyName = state.name
        // this.customerName =state.customername
        this.isAdmin=false
      }
      else if (_.includes(this.role, 'superadmin-it')) {
        this.isAdmin=false
        this.companyName = "Ease-i"
      } else if (state.name != '') {
        this.companyName = state.name
      } else {
        this.companyName = state.name
      }
      if (state.name) {
        this.companyName = state.name
        this.tagLine = state.customer.tagLine
      }
    })
  }
  ngOnInit(): void {
    this.application = this.formBuilder.group({
      app: ['']
    })
  }
  switchApplication(event: any) {
    if (event == "dashboard") {
      this.router.navigate(['front/portfolio/home'])
    }

  }
}
