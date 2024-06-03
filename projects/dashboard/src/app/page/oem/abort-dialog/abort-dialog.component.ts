//@ts-nocheck
import { Component, Inject, OnInit, VERSION, ViewChild } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ConfirmAbortComponent } from '../confirm-abort/confirm-abort.component';
@Component({
  selector: 'app-abort-dialog',
  templateUrl: './abort-dialog.component.html',
  styleUrls: ['./abort-dialog.component.scss']
})
export class AbortDialogComponent implements OnInit {
  // abortreasonList =["Scheduled Cancellation","Emergency Button Abort","Communication Related Alarm","Wind Related Abort","Battery Temp/Current Related Abort","Battery Voltage/SoC Related Alarm","Sensor Related Alarm","PCB Related Alarm","Any Other, in order of time"]
  abortreasonList =["Maintenance Of Robots","Rain","Customer Request"]
  abortrequest =["Plant In-Charge","Site Engineer (client)","Site Engineer (OEM)","Other"]
  reqStatus=["Active","Inactive"]
  reasonList=["Yes","No"]
  resumerequest=["Plant In-Charge","Site Engineer (client)","Site Engineer (OEM)","Other"]
  abortpopupForm:any;
  resumepopupForm:any
  hide = true;
  showResume:boolean=false
  liftAbortData:any
  maxDate=new Date()
  applyAbortData:any
  constructor( @Inject(MAT_DIALOG_DATA) private data :any, private fb: FormBuilder,  public dialog: MatDialog) {
    if(data){
      this.applyAbortData =data
      console.log("message",this.applyAbortData)
      if(data.action==""){
        this.showResume = true;
        this.liftAbortData = data
      }
    }
   }

  ngOnInit(): void {
    this.abortpopupForm = this.fb.group({
        // abortRequestby: ['',Validators.required],
        requestPerson:['',Validators.required],
        abortReason:['',Validators.required],
        resumeDate:['',Validators.required],
        adminPassword:['',Validators.required],
     });
    this.resumepopupForm = this.fb.group({
      // requestStatus:['',Validators.required],
      // resumeRequestby:['',Validators.required],
      resumePerson:['',Validators.required],
      resumeAdminPassword:['',Validators.required],
      reasonAbort:['',Validators.required],
      reason:['',Validators.required]
  });
  }
  openConfirmabort(){
    console.log("confirmClicked",this.applyAbortData)
    this.markFormGroupDirty(this.abortpopupForm)
     if(this.abortpopupForm.valid){
      console.log("confirmClicked1",this.abortpopupForm)
      const dialogRef = this.dialog.open(ConfirmAbortComponent, {
        width: '500px',data:{
          header:"Confirm Abort",
          message:"Are you sure you want to abort the cleaning schedule?",
          formDataId:this.applyAbortData,  //OEM page Apply abort page data
          formData:this.abortpopupForm   //Apply abort dialog form data on proceed
        }
      });
    }else{}
    //  resumepopupForm 
  }
  openConfirmResume(){
    console.log("confirmClicked3",this.liftAbortData)
    this.markFormGroupDirty(this.resumepopupForm)
     if(this.resumepopupForm.valid){
      console.log("confirmClicked4",this.resumepopupForm)
      const dialogRef = this.dialog.open(ConfirmAbortComponent, {
        width: '500px',data:{
          header:"Lift Abort",
          message:"Are you sure you want to resume the cleaning schedule?",
          formDataId:this.liftAbortData, //OEM page lift abort page data
          formData:this.resumepopupForm //lift abort dialog form data on proceed
        }
      });
    }else{}
    //  resumepopupForm 
  }
  markFormGroupDirty(form) {
    (<any>Object).values(form.controls).forEach(control => {
      control.markAsDirty()
      control.markAsTouched()
      control.updateValueAndValidity()
      if (control.controls) {
        this.markFormGroupDirty(control)
      }
    })
  }
}
