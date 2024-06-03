//@ts-nocheck
import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import {MatDialogRef,MatDialog, MAT_DIALOG_DATA} from '@angular/material/dialog';
var moment = require('moment');

@Component({
  selector: 'app-helppopup',
  templateUrl: './helppopup.component.html',
  styleUrls: ['./helppopup.component.scss']
})
export class HelppopupComponent implements OnInit {

  header:any=""
  message:any =""
  cleaningForm:any
  checked = false;
  name:any='Schedule'
  visible:boolean=true
  updateBtnShow:boolean=true
    constructor(@Inject(MAT_DIALOG_DATA) private data :any, private fb: FormBuilder, private dialog: MatDialog,private dialogRef: MatDialogRef<HelppopupComponent>){
                 this.header=data
                  console.log("Data",data)
                  }  
    
    ngOnInit(): void { 
    } 
  
  
     public cancel(): void { // To cancel the dialog window
      this.dialogRef.close();
      }
      
      public cancelN(): void { 
          this.dialog.closeAll();
      }
   }
  