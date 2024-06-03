import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-management',
  templateUrl: './user-management.component.html',
  styleUrls: ['./user-management.component.scss']
})
export class UserManagementComponent implements OnInit {
  userForm: any;

  constructor(public dialog: MatDialog,private formBuilder: FormBuilder,private router: Router) { }

  ngOnInit(): void {
    this.userForm = this.formBuilder.group({
      firstName:[null,[Validators.required]],
      lastName:[null,[Validators.required]],
      role:[null,[Validators.required]],
      email:[null, [Validators.email, Validators.required]],
      password:[null,[Validators.required,Validators.pattern('(?=.*[0-9])(?=.*[a-zA-Z ])(?=.*[$@$!%*?&.]).{8,}')]],
      // address:['']
  });
  }
  submit(){
    console.log(this.userForm.value)
  }
  userList(){
    this.router.navigate(['/user/list'])
  }

}
