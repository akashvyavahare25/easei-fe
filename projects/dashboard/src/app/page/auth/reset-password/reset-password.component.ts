import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { DataService } from '../../../data.service';
import { ForgetPasswordService } from '../../../services/forget-password/forget-password.service';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.scss']
})
export class ResetPasswordComponent implements OnInit {
  newPasswordForm:any;
  newPassword:any;
  confirmPassword:any;
  email:any
  constructor(private router: Router, private route: ActivatedRoute, public service: ForgetPasswordService,public dialog: MatDialog,private toastr: ToastrService,private fb: FormBuilder) {
    this.route.paramMap.subscribe(param =>{
      this.email = param.get('email')
    })

   }

  ngOnInit(): void {
    this.newPasswordForm = this.fb.group({
      newPassword: ['', [Validators.required,Validators.pattern('(?=.*[0-9])(?=.*[a-zA-Z ])(?=.*[$@$!%*?&.]).{8,}')]],
      confirmPassword: ['', [Validators.required,Validators.pattern('(?=.*[0-9])(?=.*[a-zA-Z ])(?=.*[$@$!%*?&.]).{8,}')]],
    })
  }
  changePassword(){
    this.markFormGroupDirty(this.newPasswordForm)
    if (this.newPasswordForm.invalid ) {
      this.toastr.error('Please Enter valid  password!')
      return
    }
    if(this.newPasswordForm.value.newPassword===this.newPasswordForm.value.confirmPassword)
      { 
        let data :any={}
        data['key']=this.email 
        data['newPassword']=this.newPasswordForm.value.newPassword 
        let returnResponse:any
        this.service.changePassword(data).subscribe(res=>{
          returnResponse =res
          if(returnResponse.status == "success"){
            this.toastr.success('Your password has been changed successfully')
            this.newPasswordForm.reset();
            this.router.navigate(['auth/login'])
             }
              else{
              this.toastr.error(returnResponse.message)
              this.newPasswordForm.reset();
            } 
          },
          (error) => {
            this.toastr.error(error.error.errorMessage)
          })
      }
      else{
        this.toastr.error('Please check new password and confirm password value must be same!')
      }
    
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
  onNoClick(){
    this.router.navigate(['auth/login'])
  }
}
