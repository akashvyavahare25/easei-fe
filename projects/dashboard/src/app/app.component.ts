import { Component, HostListener, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DataService } from './data.service';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ForgetPasswordComponent } from './page/forget-password/forget-password.component';
import { ToastrService } from 'ngx-toastr';
import { FormBuilder, Validators } from '@angular/forms';
interface Food {
  value: string;
  viewValue: string;
}

@Component({
  selector: 'app-root',
  // templateUrl: './app.component.html',
  template: `<router-outlet></router-outlet>`,
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = '';
  email: any;
  pswd: any;
  isLogin = false;
  animal: string;
  newPassword:any;
  confirmPassword:any;
  loginFlag=!true;
  loginForm:any;
  newPasswordForm:any;
  name: string;
  childCompData = "child"
  constructor(private router: Router, public service: DataService,public dialog: MatDialog,private toastr: ToastrService,private fb: FormBuilder) { }

  ngOnInit() {
  }

}
