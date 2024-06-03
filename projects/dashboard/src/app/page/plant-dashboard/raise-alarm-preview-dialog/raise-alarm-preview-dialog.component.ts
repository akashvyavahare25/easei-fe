import { LiveAnnouncer } from '@angular/cdk/a11y';
import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl } from '@angular/forms';
import {MatDialogRef,MatDialog, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort, Sort } from '@angular/material/sort';
import { ToastrService } from 'ngx-toastr';
import { OemService } from '../../../services/oem/oem-service.service'; 
import { PlantServiceService } from '../../../services/plants/plant-service.service'; 
@Component({
  selector: 'app-raise-alarm-preview-dialog',
  templateUrl: './raise-alarm-preview-dialog.component.html',
  styleUrls: ['./raise-alarm-preview-dialog.component.scss']
})
export class RaiseAlarmPreviewDialogComponent implements OnInit {
  file: any;
  fileName = false   
  count: any = 250  
  maxlength: number = 250 
  formDataId:any
  formData:any
  updateAlarm:any
  priorityList:any=['Normal High',"Severity Low"]
  allStatusList = ['Resolved','Open','New','Reopen']; 
  assigneeList=['Test1','Test2','Test3','Test4']
  isView:Boolean=false
  isViewComments:Boolean=false
  dataSource1:any
  selectedRowIndex:any;
  rowdata:any
  comment = new FormControl();

  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;
    constructor(@Inject(MAT_DIALOG_DATA) private data :any,private _liveAnnouncer: LiveAnnouncer, private fb: FormBuilder,private service:OemService,private toastr: ToastrService,
      private dialog: MatDialog,private plantService: PlantServiceService,private dialogRef: MatDialogRef<RaiseAlarmPreviewDialogComponent>) {
                      this.formData = data.formData 
                      console.log(this.formData)
                    }  
     
      displayedColumns: string[] = ['priority','assignee','status','updated_by','updated_date'];

     
      ngOnInit(): void {
        this.dataSource1=[
          { 'updated_by':"Test","updated_date":'10/12/2022',  'comment':[{
            comment:"Front end team has been given the inputs",
            comment_by:"Test1",
            comment_date:"20/11/2022"
          },{
            comment:"Front end team has been given the inputs",
            comment_by:"Test11",
            comment_date:"20/10/2022"
          },{
            comment:"Front end team has been given the inputs",
            comment_by:"Test111",
            comment_date:"20/09/2022"
          },{
            comment:"Front end team has been given the inputs",
            comment_by:"Test111",
            comment_date:"20/09/2022"
          },{
            comment:"Front end team has been given the inputs",
            comment_by:"Test111",
            comment_date:"20/09/2022"
          },{
            comment:"Front end team has been given the inputs",
            comment_by:"Test111",
            comment_date:"20/09/2022"
          },{
            comment:"Front end team has been given the inputs",
            comment_by:"Test111",
            comment_date:"20/09/2022"
          },{
            comment:"Front end team has been given the inputs",
            comment_by:"Test111",
            comment_date:"20/09/2022"
          },{
            comment:"Front end team has been given the inputs",
            comment_by:"Test111",
            comment_date:"20/09/2022"
          },{
            comment:"Front end team has been given the inputs",
            comment_by:"Test111",
            comment_date:"20/09/2022"
          },{
            comment:"Front end team has been given the inputs",
            comment_by:"Test111",
            comment_date:"20/09/2022"
          },{
            comment:"Front end team has been given the inputs",
            comment_by:"Test111",
            comment_date:"20/09/2022"
          },{
            comment:"Front end team has been given the inputs",
            comment_by:"Test111",
            comment_date:"20/09/2022"
          },{
            comment:"Front end team has been given the inputs",
            comment_by:"Test111",
            comment_date:"20/09/2022"
          },{
            comment:"Front end team has been given the inputs",
            comment_by:"Test111",
            comment_date:"20/09/2022"
          },{
            comment:"Front end team has been given the inputs",
            comment_by:"Test111",
            comment_date:"20/09/2022"
          },{
            comment:"Front end team has been given the inputs",
            comment_by:"Test111",
            comment_date:"20/09/2022"
          },{
            comment:"Front end team has been given the inputs",
            comment_by:"Test111",
            comment_date:"20/09/2022"
          },{
            comment:"Front end team has been given the inputs",
            comment_by:"Test111",
            comment_date:"20/09/2022"
          },{
            comment:"Front end team has been given the inputs",
            comment_by:"Test111",
            comment_date:"20/09/2022"
          }],'priority':"Normal High",'assignee':"Test1",'status':"Resolved"},
          { 'updated_by':"Test","updated_date":'10/12/2022',  'comment':[{
            comment:"Front end team has been given the inputs",
            comment_by:"Test2",
            comment_date:"20/10/2022"
          }],'priority':"Severity Low",'assignee':"Test2",'status':"Open"},
          { 'updated_by':"Test","updated_date":'10/12/2022',  'comment':[{
          comment:"Front end team has been given the inputs",
          comment_by:"Test3",
          comment_date:"20/09/2022"
        }],'priority':"Severity Low",'assignee':"Test3",'status':"New"},
          {'updated_by':"Test","updated_date":'10/12/2022',  'comment':[{
          comment:"Front end team has been given the inputs",
          comment_by:"Test4",
          comment_date:"20/08/2022"
        }],'priority':"Normal High",'assignee':"Test4",'status':"Reopen"}
        ]
       
        this.updateAlarm = this.fb.group({
          ticketId:[],
          assignee:[''],
          priority:[''],
          status:[''],
          fileAttachment:[''],
          description:['']
           })
           this.updateAlarm.controls['ticketId'].setValue(this.formData.ticketId)
           this.updateAlarm.controls['status'].setValue(this.formData.status)
           this.updateAlarm.controls['priority'].setValue(this.formData.priority)
           this.updateAlarm.controls['assignee'].setValue(this.formData.assignee)
           this.updateAlarm.controls['ticketId'].disable()
       
     }
      
  announceSortChange(sortState: Sort) {
    if (sortState.direction) {
      this._liveAnnouncer.announce(`Sorted ${sortState.direction}ending`);
    } else {
      this._liveAnnouncer.announce('Sorting cleared');
    }
  }
  
  highlight(row:any){
    this.selectedRowIndex=row.position;
    this.isViewComments=true
     this.updateAlarm.controls['status'].setValue(row.status)
     this.updateAlarm.controls['priority'].setValue(row.priority)
     this.updateAlarm.controls['assignee'].setValue(row.assignee)
      this.updateAlarm.controls['assignee'].disable()
      this.updateAlarm.controls['status'].disable()
      this.updateAlarm.controls['priority'].disable() 
      console.log('ress',row)
      this.rowdata  = row
  }
  addComment(){
    console.log("Test",this.comment)
  }
  closeUpdatehistory(val:any){
    if(val == "h1"){
      this.isView = false
      this.isViewComments=false

    }else{
      this.isViewComments=false
    }
  }
     openTicket(){
        this.isView = true
     }
     handleChange(event :any) {
      this.file = event.target.files[0];
      this.fileName = true;   
    }
    keyFunc(x:any) {
      this.count = this.maxlength - x.target.value.length
    }
      postabortData(){
        this.plantService.saveRaiseAlaram(this.formData.value).subscribe(res=>{ 
          this.toastr.success('Raise Alarm Save Successfully')
        })
 
      }
  }