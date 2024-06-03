import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import {MatDialogRef,MatDialog, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { OemService } from '../../../services/oem/oem-service.service';
import * as moment from 'moment';

@Component({
  selector: 'app-confirm-abort',
  templateUrl: './confirm-abort.component.html',
  styleUrls: ['./confirm-abort.component.scss']
})
export class ConfirmAbortComponent implements OnInit {
header:any
message:any
formDataId:any
formData:any
  constructor(@Inject(MAT_DIALOG_DATA) private data :any, private fb: FormBuilder,private service:OemService,private toastr: ToastrService,
    private dialog: MatDialog,private dialogRef: MatDialogRef<ConfirmAbortComponent>) {
                    this.header=data.header
                    this.message=data.message
                    this.formDataId = data.formDataId
                    this.formData = data.formData
                  } // Closing dialog window
    
    public cancel(): void { // To cancel the dialog window
    this.dialogRef.close();
    }
    
    public cancelN(): void { 
        this.dialog.closeAll();
    }
    ngOnInit(): void {
/*       console.log("qqqq",this.formDataId)
      console.log("qqqq",this.formData) */
      // Abort Bot - http://10.1.1.59:5115/api/abortbot?user=ABCD&plant=<Plant ID>&knu=<NCU ID>&bcu=<BCU ID>&action=stop&requestStatus= "Inactive"
    }
    postabortData(){
      let abortReason = this.formData.value['abortReason']
      // let abortRequestby = this.formData.value['abortRequestby']
      let adminPassword = this.formData.value['adminPassword']
      let requestPerson = this.formData.value['requestPerson']
      let resumeDate = moment(this.formData.value['resumeDate']).format("DD-MM-YYYY") 
      // let ncu = this.formDataId.value['ncuid'] 
      let bcu = this.formDataId.value['bcuid'] /* ncu */
      this.service.getApplyAbort(bcu,requestPerson,adminPassword,abortReason,resumeDate).subscribe(res=>{
        console.log("Response",res)
        if(res.Data=="Ok"){
          this.toastr.success("The selected cleaning schedule is successfully aborted.")
          this.dialog.closeAll();
        }else{
          this.toastr.success(res.Data)
        }
      })
    }
}