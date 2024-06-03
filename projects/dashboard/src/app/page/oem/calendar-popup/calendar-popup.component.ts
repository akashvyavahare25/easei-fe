//@ts-nocheck
import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import {MatDialogRef,MatDialog, MAT_DIALOG_DATA} from '@angular/material/dialog';
import {OembcuService } from '../../../services/oem/oem-bcu.serivce'
var moment = require('moment');

@Component({
  selector: 'app-calendar-popup',
  templateUrl: './calendar-popup.component.html',
  styleUrls: ['./calendar-popup.component.scss']
})
export class CalendarPopupComponent implements OnInit {
header:any=""
message:any =""
cleaningForm:any
checked = false;
name:any='Schedule'
visible:boolean=true
updateBtnShow:boolean=true
visibleMultipleDays:boolean=false
scheduletype:any
startDate:any
endDate:any
maxDate=new Date()
  constructor(@Inject(MAT_DIALOG_DATA) private data :any, private fb: FormBuilder, private dialog: MatDialog,private dialogRef: MatDialogRef<CalendarPopupComponent>,private service :OembcuService){
                this.header=data
                console.log("Data",data)
                let date1 = moment().format("YYYY-MM-DD")
                this.visibleMultipleDays=data.visibleMultipleDays
                if(date1 >  this.header.dateStr){
                  console.log("Date outdated",date1)
                  this.updateBtnShow =false
                }else{
                  console.log("Dated",this.header.dateStr)
                  this.updateBtnShow =true 
                }
                }  
  
  ngOnInit(): void { 
    this.cleaningForm = this.fb.group({
      cleaning: ['',Validators.required],
      cleaningStartTime: ['',Validators.required],
      cleaningMode: ['',Validators.required],
   });
   if(this.updateBtnShow == false){
    this.cleaningForm.controls['cleaning'].value="Yes"
    this.cleaningForm.controls['cleaningStartTime'].value="10:20:30"
    this.cleaningForm.controls['cleaningMode'].value="Normal" 
    this.cleaningForm.controls['cleaning'].disable()
    this.cleaningForm.controls['cleaningMode'].disable()
    this.cleaningForm.controls['cleaningStartTime'].disable()
   }
  } 


  changed(){
    this.name="Other"
    this.visible=false
    if(this.checked != true){
      this.name='Schedule'
      this.visible=true
    }
  }
  selectedCustomDateStart(days){ 
    this.startDate=moment(days.value).format("YYYY-MM-DD")
       console.log("startdate", this.startDate ) 
   
    }
  selectedCustomDateEnd(days){
    this.endDate=moment(days.value).format("YYYY-MM-DD") 
    console.log("endate", this.endDate ) 

    }
  submitform(){
    console.log('type',this.scheduletype,this.checked)

    let data ={
      schedule:{
            cleaning: this.checked ?'': this.cleaningForm.value.cleaning,
            cleaningStartTime:this.checked ?'': this.cleaningForm.value.cleaningStartTime,
            cleaningMode:this.checked ?'': this.cleaningForm.value.cleaningMode,
            currentcleaningStartTime: this.visibleMultipleDays ===true?this.startDate: this.header.dateStr,
            currentcleaningEndDate: this.visibleMultipleDays ===true?this.endDate: '' 

         },
       
      other:this.checked ? this.scheduletype:'NA'
      } 
   
      console.log('form value',data)
       this.service.saveScheudleData(data,this.header.ncureqid,this.header.bcureqid).subscribe(res=>{
       })
    
  }
  public cancel(): void { // To cancel the dialog window
    this.dialogRef.close();
    }
    
    public cancelN(): void { 
        this.dialog.closeAll();
    }
    markFormGroupDirty(form:any) {
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
