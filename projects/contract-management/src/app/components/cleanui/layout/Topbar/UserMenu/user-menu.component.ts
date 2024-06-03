import { Component } from '@angular/core'
import { select, Store } from '@ngrx/store'
import * as UserActions from '../../../../../../../src/app/store/user/actions'
import * as Reducers from '../../../../../../../src/app/store/reducers'
import { Router } from '@angular/router'
@Component({
  selector: 'cui-topbar-user-menu',
  templateUrl: './user-menu.component.html',
  styleUrls: ['./user-menu.component.scss'],
})
export class TopbarUserMenuComponent {
  badgeCount: number = 7
  name: string = ''
  role: string = ''
  email: string = ''
  phone: string = ''

  constructor(private store: Store<any>, private router: Router) {
    this.store.pipe(select(Reducers.getUser)).subscribe(state => {
      this.name = localStorage.getItem('firstName')+' '+localStorage.getItem('lastName')
      this.role = localStorage.getItem('originalRole')
    })
  }

  badgeCountIncrease() {
    // this.badgeCount = this.badgeCount + 1
  }
  viewProfile(){
    this.router.navigate([`/drone/user/view/`+localStorage.getItem('id')])
  }
  logout() {
    this.store.dispatch(new UserActions.Logout())
  }
}
