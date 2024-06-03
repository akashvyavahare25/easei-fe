import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AppComponent } from 'src/app/app.component';
import { ForgetPasswordService } from '../../services/forget-password/forget-password.service';
import { ForgetPasswordComponent, MyErrorStateMatcher } from '../forget-password/forget-password.component';

@Component({
  selector: 'app-otp-verification',
  templateUrl: './otp-verification.component.html',
  styleUrls: ['./otp-verification.component.scss']
})
export class OtpVerificationComponent implements OnInit {
  otpForm:any
  email:any
  matcher = new MyErrorStateMatcher();
  constructor(@Inject(MAT_DIALOG_DATA) private data :any,private router: Router,public dialogRef: MatDialogRef<AppComponent>,private toastr: ToastrService,public dialog: MatDialog,private fb:FormBuilder ,private forgetPasswordService: ForgetPasswordService) { 
    this.email = data['returnResponse'].email
    // console.log( this.email)
  }
  
  ngOnInit(): void {
    this.otpForm=this.fb.group({
      otp: ['', [Validators.required]],
      
    })
  }

  virifyCode(){
    
    let data :any ={}
    data['email']= this.email
    data['code'] = this.otpForm.value['otp']
    let returnResponse :any
      this.forgetPasswordService.verifyOTP(data).subscribe(res=>{
      returnResponse = res  
      if(returnResponse.status == "success"){
      this.toastr.success("OTP Verified Successfully !!!")
        this.router.navigate(['/auth/reset-password/'+returnResponse.email]);
        this.dialogRef.close();
       }
        else{
        this.toastr.error(returnResponse.errorMessage)
        this.otpForm.reset();
      } 
    },(error) => {
      this.toastr.error('OTP',error.error.errorMessage)
    }
    )   
  }

  onNoClick(): void {
    this.dialogRef.close();
    const dialogRef = this.dialog.open(ForgetPasswordComponent, {
      width: '400px',
      height: '220px',
      data: {}
    });
  }
  

 

}
