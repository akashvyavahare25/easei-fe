import { Component, Inject, OnInit } from '@angular/core'; 
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AppComponent } from 'src/app/app.component';
import {FormControl, FormGroupDirective, NgForm} from '@angular/forms';
import {ErrorStateMatcher} from '@angular/material/core';
import { OtpVerificationComponent } from '../otp-verification/otp-verification.component';
import { ForgetPasswordService } from '../../services/forget-password/forget-password.service';
import { ToastrService } from 'ngx-toastr';
 
import { FormBuilder, Validators } from '@angular/forms';
export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}

@Component({
  selector: 'app-forget-password',
  templateUrl: './forget-password.component.html',
  styleUrls: ['./forget-password.component.scss']
})
export class ForgetPasswordComponent implements OnInit {
  email:any
  sendotpForm:any

  matcher = new MyErrorStateMatcher();
  constructor(public dialogRef: MatDialogRef<AppComponent>,public dialog: MatDialog,private fb:FormBuilder ,private forgetPasswordService :ForgetPasswordService,private toastr: ToastrService) { }


  ngOnInit(): void {
    this.sendotpForm=this.fb.group({
      email: ['', [Validators.required,Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$')]],
    })
  }

  onNoClick(): void {
    this.dialogRef.close();
    
  }

  sendVerfificationCode(){
    this.markFormGroupDirty(this.sendotpForm)
    if (this.sendotpForm.invalid ) {
      this.toastr.error('Please Enter valid  email!')
      return
    }
  let data:any
  let returnResponse:any
  data={ email:this.sendotpForm.value['email']} 
     this.forgetPasswordService.sendOTP(data.email).subscribe(res =>{
      returnResponse = res 
      if(returnResponse.status == "success"){
        this.toastr.success("OTP Send Successfully !!!")
        const dialogRef = this.dialog.open(OtpVerificationComponent, {
          width: '400px',
          height: '220px',
          data: {returnResponse}
        });
        this.dialogRef.close();
      }
      else{
        this.toastr.error(returnResponse.errorMessage)
        this.sendotpForm.reset()
      }
    },(error) => {
      this.toastr.error('OTP',error.error.errorMessage)
    })
  }  
     /*  dialogRef.afterClosed().subscribe(result => {
        this.animal = result;
      });
 */    
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

}
