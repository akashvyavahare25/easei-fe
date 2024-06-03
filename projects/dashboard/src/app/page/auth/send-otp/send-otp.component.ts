
  import { Component, OnInit } from '@angular/core';
  import { FormBuilder, Validators } from '@angular/forms';
  import { MatDialog } from '@angular/material/dialog';
  import { ActivatedRoute, Router } from '@angular/router';
  import { ToastrService } from 'ngx-toastr';
  import { DataService } from '../../../data.service';
  import { ForgetPasswordService } from '../../../services/forget-password/forget-password.service';
@Component({
  selector: 'app-send-otp',
  templateUrl: './send-otp.component.html',
  styleUrls: ['./send-otp.component.scss']
})
export class SendOTPComponent implements OnInit {

  email:any
  sendotpForm:any;
  newPassword:any;
  confirmPassword:any;
  otpVerificationForm:any
  isVerifyOtp:boolean=false
  constructor(private router: Router, private route: ActivatedRoute, public service: ForgetPasswordService,public dialog: MatDialog,private toastr: ToastrService,private fb: FormBuilder) {
    /* this.route.paramMap.subscribe(param =>{
      this.email = param.get('email')
    }) */

   }

  ngOnInit(): void {
    this.sendotpForm=this.fb.group({
      email: ['', [Validators.required,Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$')]],
    })
    this.otpVerificationForm=this.fb.group({
      // email: ['', [Validators.required,Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$')]],
      otp: ['', [Validators.required]],
      
    })
    // this.otpVerificationForm.controls['email'].disable()
  }
  sendOTP(){
    this.markFormGroupDirty(this.sendotpForm)
    if (this.sendotpForm.invalid ) {
      this.toastr.error('Please Enter valid  Email!') 
      return
    }
      let data:any
      let returnResponse:any
      data={ email:this.sendotpForm.value['email']} 
      // this.otpVerificationForm.controls['email'].setValue(this.sendotpForm.value['email'])
        this.service.sendOTP(data.email).subscribe(res =>{
          returnResponse = res 
          if(returnResponse.status == "success"){
            this.toastr.success("OTP Send Successfully !!!")
            this.isVerifyOtp = true
            // this.otpVerificationForm.controls['email'].setValue(returnResponse.email)
            this.email = returnResponse.email
          }
          else{
            this.toastr.error(returnResponse.errorMessage)
            this.sendotpForm.reset()
          }
        },(error) => {
          if(error.status == 500){
            this.toastr.error(error.error.detail)
          }else{
            this.toastr.error('OTP',error.error.errorMessage)
          }
        })  
  }

  verifyOTP(){
    this.markFormGroupDirty(this.otpVerificationForm)
    if (this.otpVerificationForm.invalid ) {
      this.toastr.error('Please Enter valid  OTP!')
      return
    }

    let data :any ={}
    data['email']= this.email 
    data['code'] = this.otpVerificationForm.value['otp']
    let returnResponse :any
      this.service.verifyOTP(data).subscribe(res=>{
      returnResponse = res  
      if(returnResponse.status == "success"){
      this.toastr.success("OTP Verified Successfully !!!")
        this.router.navigate(['/auth/reset-password/'+returnResponse.email]);
       }
        else{
        this.toastr.error(returnResponse.errorMessage)
        this.otpVerificationForm.reset();
      } 
    },(error) => {
      this.toastr.error('OTP',error.error.errorMessage)
    }
    )   
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
  
  onNoClick(): void {
    // this.dialogRef.close();
    this.router.navigate(['/front/auth/login']);
  }
  onNoClick1(): void {
    // this.dialogRef.close(); 
    this.isVerifyOtp=false
    this.router.navigate(['/auth/sendotp/']);
  }
}
