import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { ToastrService } from 'ngx-toastr';
import { DataService } from '../../../data.service';
import { ForgetPasswordComponent } from '../../forget-password/forget-password.component';
import * as Reducers from '../../../../../src/app/store/reducers'
import * as UserActions from '../../../../../src/app/store/user/actions'
interface Food {
  value: string;
  viewValue: string;
}

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  title = 'admin-template';
  email: any='';
  pswd: any='';
  isLogin = false;
  animal: string;
  newPassword:any;
  confirmPassword:any;
  loginFlag=!true;
  loginForm:any;
  newPasswordForm:any;
  name: string;
  childCompData = "child"
  constructor(private router: Router, public service: DataService,public dialog: MatDialog,private toastr: ToastrService,private fb: FormBuilder,private store: Store<any>) { }

  ngOnInit() {
        
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.minLength(4)]],
      password: ['', [Validators.required, Validators.pattern('(?=.*[0-9])(?=.*[a-zA-Z ])(?=.*[$@$!%*?&.]).{8,}')]],
    })
  }
  public onEnterPassword(event:any): void {
    if (event.which === 13) {
       this.checklogin()
    }
  }
  foods: Food[] = [
    { value: 'steak-0', viewValue: 'Steak' },
    { value: 'pizza-1', viewValue: 'Pizza' },
    { value: 'tacos-2', viewValue: 'Tacos' },
  ];

  checklogin() {
    const payload = {
      email: this.loginForm.value.email,
      password: this.loginForm.value.password,
    }
    this.store.dispatch(new UserActions.Login(payload))    
  }
  
  changePassword(){
    this.markFormGroupDirty(this.newPasswordForm)
  }

  markFormGroupDirty(form:any) {
    (<any>Object).values(form.controls).forEach((control:any) => {
      control.markAsDirty()
      control.markAsTouched()
      control.updateValueAndValidity()
      if (control.controls) {
        this.markFormGroupDirty(control)
      }
    })
  }
  
  openDialog(): void {
   /*  const dialogRef = this.dialog.open(ForgetPasswordComponent, {
      width: '400px',
      height: '220px',
      data: {}
    });

    dialogRef.afterClosed().subscribe(result => {
      this.animal = result;
    });
 */ 
    this.router.navigate(['/auth/sendotp/']);
  }
}
