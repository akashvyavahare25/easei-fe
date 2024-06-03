//@ts-nocheck
import { Component, ElementRef, Inject, OnInit, ViewChild } from '@angular/core';
import {EmailValidator, FormBuilder, FormControl, Validators} from '@angular/forms';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import {AfterViewInit} from '@angular/core';
import {MatSort, Sort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import {LiveAnnouncer} from '@angular/cdk/a11y';
import { MatOption } from '@angular/material/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSelect } from '@angular/material/select';
import { PlantServiceService} from '../../../services/plants/plant-service.service'
import * as moment from 'moment'
var jsonata = require('jsonata'); 
import { ActivatedRoute } from '@angular/router';
import { RaiseAlarmPreviewDialogComponent } from '../raise-alarm-preview-dialog/raise-alarm-preview-dialog.component';
import { DataService } from '../../../data.service'
import { ToastrService } from 'ngx-toastr';
import FileSaver from 'file-saver';
interface Food {
  value: string;
  viewValue: string;
}

export interface PeriodicElement {
  ticketId: string;
  ticket_date: string;
  ticket_type: string;
  status: string;
  raised_by: string;
  bot_id: string;
  // knu_ip: string;
  table_no: string;
  alarm_id: string;
  component: string;
  target_tat: string;
  actual_tat:string;
  down_since: string;
  priority: string;
  assignee: string; 
}


let ELEMENT_DATA: PeriodicElement[]  = []
@Component({
  selector: 'app-alarm',
  templateUrl: './alarm.component.html',
  styleUrls: ['./alarm.component.scss']
})
export class AlarmComponent implements OnInit,AfterViewInit {/* 'knu_ip', */
   displayedColumns: string[] = ['ticketId', 'ticket_date', 'ticket_type','raised_by','bot_id',  'table_no', 'alarm_id','component',"target_tat","actual_tat",'down_since','priority','assignee','status'];
  dataSource :any =new MatTableDataSource();
  calendar ='7';
  priority='';
  status='';
  flag:Boolean=false
  allStatus = new FormControl();
  allPriority = new FormControl();
  allSelected = false;
  allSelected1 = false;
  flag:Boolean=false
  paramaterType:any
  startDate:any
  endDate:any
  plantsid:any
knuid:any
botstatus:any
botid:any
dataSource1:any=[]
maxDate=new Date()
  allPriorityList = [
    {
        key: 1, value: 'Normal High',
    },
    /* {
        key: 2, value: 'Medium',
    }, */
    {
        key: 2, value: 'Severity Low',
    },
];
allStatusList = [
    {
      key: 1, value: 'Resolved',
    },
    {
      key: 2, value: 'Open',
    },
    {
      key: 3, value: 'New',
    },
    {
      key: 4, value: 'Reopen',
    },
];
@ViewChild('select') select: MatSelect;
@ViewChild('select1') select1: MatSelect;

toggleAllSelection() {
  if (this.allSelected) {
    this.select.options.forEach((item: MatOption) => item.select());
  } else {
    this.select.options.forEach((item: MatOption) => item.deselect());
  }
}
optionClick() {
  let newStatus = true;
  this.select.options.forEach((item: MatOption) => {
    if (!item.selected) {
      newStatus = false;
    }
  });
  this.allSelected = newStatus;
} 

toggleAllSelection1() {
  if (this.allSelected1) {
    this.select1.options.forEach((item: MatOption) => item.select());
  } else {
    this.select1.options.forEach((item: MatOption) => item.deselect());
  }
}
optionClick1() {
  let newStatus = true;
  this.select1.options.forEach((item: MatOption) => {
    if (!item.selected) {
      newStatus = false;
    }
  });
  this.allSelected1 = newStatus;
} 
 
  reset() {
    this.calendar ='7';
    this.priority = '';
    this.status = '';
    // this.startDate='';
    // this.endDate=''
    this.getSummary()
    }

  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  
  ngAfterViewInit() {
  
  }
 
  announceSortChange(sortState: Sort) {
    if (sortState.direction) {
      this._liveAnnouncer.announce(`Sorted ${sortState.direction}ending`);
    } else {
      this._liveAnnouncer.announce('Sorting cleared');
    }
  }
  constructor(public dialog: MatDialog,private _liveAnnouncer: LiveAnnouncer,private plantServiceService:PlantServiceService,private route: ActivatedRoute,private toastr: ToastrService, private service: DataService,) { 
 
  this.route.params.subscribe(params => {
     
    if(!(_.isEmpty(params))){
    this.flag=true
    this.paramaterType = params['type']
    this.plantsid=params['plantid']
    this.knuid=params['knuid']
    this.botstatus=params['status']
    this.botid=params['botid']
    this.startDate=params['startdate']
    this.endDate=params['enddate']
    }
  })
  }
  ngOnInit() {
    this.dataSource1=[
    // {'ticketId':"Ticket101", 'ticket_date':"20/12/2022", 'ticket_type':"test",'raised_by':"akash",'bot_id':"bot101",'table_no':"table101", 'alarm_id':"007",'component':"XYZ","target_tat":"20","actual_tat":"20",'down_since':"12:30:23",'priority':"Normal High",'assignee':"Test1",'status':"Resolved"},
    // {'ticketId':"Ticket102", 'ticket_date':"20/12/2022", 'ticket_type':"test",'raised_by':"akash",'bot_id':"bot101",'table_no':"table101", 'alarm_id':"007",'component':"XYZ","target_tat":"20","actual_tat":"20",'down_since':"12:30:23",'priority':"Severity Low",'assignee':"Test2",'status':"Open"},
    // {'ticketId':"Ticket103", 'ticket_date':"20/12/2022", 'ticket_type':"test",'raised_by':"akash",'bot_id':"bot101",'table_no':"table101", 'alarm_id':"007",'component':"XYZ","target_tat":"20","actual_tat":"20",'down_since':"12:30:23",'priority':"Severity Low",'assignee':"Test3",'status':"New"},
    // {'ticketId':"Ticket104", 'ticket_date':"20/12/2022", 'ticket_type':"test",'raised_by':"akash",'bot_id':"bot101",'table_no':"table101", 'alarm_id':"007",'component':"XYZ","target_tat":"20","actual_tat":"20",'down_since':"12:30:23",'priority':"Normal High",'assignee':"Test4",'status':"Reopen"}
  ]

    if(this.flag){
      let filterpriority ='';
      let filterStatus=''
      if(this.priority.length>0){
        for(let i=0;i<this.priority.length;i++){
          if(this.priority.length===1||filterpriority===''){
            filterpriority=this.priority[i] 
          }else{
            filterpriority=filterpriority+","+this.priority[i] 
          }
         
        }
      }
      if(this.status.length>0){
        for(let i=0;i<this.status.length;i++){
          if(this.status.length===1||filterStatus===''){
            filterStatus=this.status[i]
          }else{
          filterStatus=filterStatus+","+this.status[i]
          }
        }
      }
      let params='&startdate='+this.startDate+'&'+'enddate='+this.endDate+'&botid='+this.botid+'&knuid='+this.knuid+'&botstatus='+this.botstatus+'&plant='+this.plantsid+'&paramaterType='+this.paramaterType+'&priority='+filterpriority+'&status='+filterStatus
      this.plantServiceService.getPlantAlarmSummary(params).subscribe(res=>{
        if(res && res.length > 0){
          this.dataSource=[]
          // this.dataSource=res.data
          this.dataSource= new MatTableDataSource(res.data); 
          this.dataSource.sort = this.sort;
          this.dataSource.paginator = this.paginator; 
        }
     })}else{
      this.endDate=moment().format("DD-MM-YYYY")
      this.startDate=moment().subtract(7, 'days').format("DD-MM-YYYY") 
        this.getSummary()
     }
  } 
  updateStatus(element:any){
  const dialogRef = this.dialog.open(RaiseAlarmPreviewDialogComponent, {   
   disableClose: true,
   data:{
         formData:element
     }
   })
  }
  getSummary(){
    let filterpriority ='';
    let filterStatus=''
    if(this.priority.length>0){
      for(let i=0;i<this.priority.length;i++){
        if(this.priority.length===1||filterpriority===''){
          filterpriority=this.priority[i] 
        }else{
          filterpriority=filterpriority+","+this.priority[i] 
        }
       
      }
    }
    if(this.status.length>0){
      for(let i=0;i<this.status.length;i++){
        if(this.status.length===1||filterStatus===''){
          filterStatus=this.status[i]
        }else{
        filterStatus=filterStatus+","+this.status[i]
        }
      }
    }
    let params='&startdate='+this.startDate+'&'+'enddate='+this.endDate+'&priority='+filterpriority+'&status='+filterStatus
    this.plantServiceService.getPlantAlarmSummary(params).subscribe(res=>{
      this.dataSource=[]
      // this.dataSource=res.data
      this.dataSource= new MatTableDataSource(res.data);
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
     })
  }
  selectedCustomStartDate(days){ 
    this.startDate=moment(days.value).format("DD-MM-YYYY")
      
    }
    selectedCustomEndDate(days){
    this.endDate=moment(days.value).format("DD-MM-YYYY") 
    this.getSummary()
    }

  filterByDate(date){
    
    this.startDate=moment().format("DD-MM-YYYY")
    this.endDate=moment().subtract(date, 'days').format("DD-MM-YYYY")
    this.getSummary()
  }
  filterByPriority(priority){ 
  //this.priority=priority
  this.getSummary()
  }
  filterByStatus(status){ 
   // this.status=status
    this.getSummary()
  }
  filterByData(){ 
    this.results =this.dataSource['filteredData'];
   /*  let temp=  this.results.map((user:any)=> {
         return user
      }); */ 
    let temp: any = [];
    if (this.results.length > 0) {
      for(let i=0;i < this.results.length;i++) {
        if (this.priority.length > 0 && this.status.length > 0) {
          for(let  j = 0; j <this.priority.length; j++) {
            if(this.results[i].priority == this.priority[j]) {
              for(let  k = 0; k <this.status.length; k++) {
                if(this.results[i].status == this.status[k]) {
                  temp[temp.length] = this.results[i];
                }
              }
            }
          }
        } else if (this.priority.length > 0 && this.status.length == 0) {
          for(let  j = 0; j <this.priority.length; j++) {
            if(this.results[i].priority == this.priority[j]) {
              temp[temp.length] = this.results[i];
            }
          }
        } else if (this.status.length > 0 && this.priority.length == 0) {
          for(let  j = 0; j <this.status.length; j++) {
            if(this.results[i].status == this.status[j]) {
              temp[temp.length] = this.results[i];
            }
          }
        } else {
          temp[temp.length] = this.results[i];
        }
      }
    }
    this.temp = temp 
    this.dataSource.filteredData = this.temp; 
  }
  foods: Food[] = [
    {value: 'steak-0', viewValue: 'Steak'},
    {value: 'pizza-1', viewValue: 'Pizza'},
    {value: 'tacos-2', viewValue: 'Tacos'},
  ];
  downloadPdf(){
    let formData = new FormData()
    let data = {
      data:this.dataSource.filteredData,
      column:['Ticket Id', 'Ticket Date', 'Ticket Type','Raised By','BOT ID', 'NCU IP', 'Table No.', 'Alarm Id','Component',"Target TAT/Actual TAT",'Down Since','Priority','Assignee','Status'],
      reporttitle:"Alarm",
      logo:localStorage.getItem('logo')?.toString() == null ?  '' : localStorage.getItem('logo')?.toString() 
    }
    console.log('data >>>>>>>>>>>>>>>>>>>',data)
    formData.set('json', JSON.stringify(data));
    this.service.generatePdf(formData).subscribe(resp => {
      let blob = new Blob([resp], { type: 'application/pdf' })
      FileSaver.saveAs(blob, 'alarm' + '.pdf')
      this.toastr.success('PDF Download Successfully')
    }, err => {
      this.toastr.error('Please try after sometime or check your internet connection')
    });
  }
  openDialog() {
    const dialogRef = this.dialog.open(DialogContentAlaramDialog); /* { width: '840px',height:'600px'} */
    dialogRef.afterClosed().subscribe((result:any) => { 
    });
  }


}
@Component({
  selector: 'alaram-dialog',
  templateUrl: 'alaram-dialog.html',
}) 

export class DialogContentAlaramDialog {
  fileName = false  
  bcuIdReset :any
  ncuIdReset:any
  plantIdReset:any
  NcuBcuJsonId: any
  plantId: any
  ncuId: any
  bcuId: any
  ncuList: any = []
  bcuList: any = []
  plantList: any = []
  componentList:any = []  
  impactList:any=['Severity High','Severity Low']
  priorityList:any=['Normal High',"Severity Low"]
  issueCategoryList:any=['Software','Hardware','Mechanical'] 
  issueTypeList:any=[]
  file: any;
  raisAlarm:any
  ncuDisable:boolean=false
  tableDisable:boolean=false
  issueTypeDisable:boolean=true
  issueDisable:boolean=false
  bcuDisable:boolean=true
  componentDisable:boolean=true
  constructor(private formBuilder: FormBuilder,private toastr: ToastrService,
    public dialogRef: MatDialogRef<DialogContentAlaramDialog>,@Inject(MAT_DIALOG_DATA) public data: any,  public dialog: MatDialog, private plantService: PlantServiceService) { }
    ngOnInit(): void { 
    this.plantService.getPlantHierachyData().subscribe(res => {
      this.NcuBcuJsonId = res
      this.getNcuBcuID(this.NcuBcuJsonId);
    })
    this.plantService.getAlaramComponent().subscribe(res =>{
      this.componentList = res.data;
    })
    this.plantService.getIssueType().subscribe(res =>{
      this.issueTypeList = res.data;
    })
    this.raisAlarm = this.formBuilder.group({
      plantId:['', Validators.required  ],
      ncuId:[''],
      tableId:[''],
      bcuId:['', Validators.required],
      component:['', Validators.required],
      assignee:[''],
      issue_cat:[''],
      issue_type:[''],
      issue:['',Validators.required],
      issue_desc:[''],
      impact:[''],
      impact_details:[''],
      priority:[''],
      sms:[''],
      email:[''],
      phoneCall:[''],
      webForm:[''],
      fileAttachment:['']
  });
  // this.raisAlarm.controls['tableId'].disable();
  // this.raisAlarm.controls['issue'].disable(); 
  }
  markFormGroupDirty(form) {
    (<any>Object).values(form.controls).forEach(control => {
      control.markAsDirty()
      control.updateValueAndValidity()
      if (control.controls) {
        this.markFormGroupDirty(control)
      }
    })
  }
  submitRaiseAlarm(){ 
    this.markFormGroupDirty(this.raisAlarm)
    if(this.raisAlarm.valid){
      let data:any = this.raisAlarm.value
      console.log('data',JSON.stringify(data))
      this.plantService.saveRaiseAlaram(data).subscribe(res=>{
        console.log("Responce",res)
        this.toastr.success('Raise Alarm Save Successfully')
        this.dialogRef.close();
      },
      (error) => {
        this.toastr.error(error.error) ; 
      })
    }else{
      this.toastr.error('Please Enter Required Fields')
    }

    // const dialogRef = this.dialog.open(RaiseAlarmPreviewDialogComponent, {
    //   data:{
    //     formData:this.raisAlarm //lift abort dialog form data on proceed
    //   }
    // })
  }
 
  selectNCU(event){
    if(event){ 
      this.ncuDisable = true
     } 
  }
  selectTable(value:any){
    // if(value){
    //  this.raisAlarm.controls['tableId'].enable()
    //   this.tableDisable = true
    //  } 
  }
  selectBCU(value:any){
    // if(value){
    //   this.bcuDisable = true
    //  } 
  }
  selectComponent(value:any){
    if(value){
      // this.componentDisable = true
     } 
  }
    handleChange(event :any) {
      this.file = event.target.files[0];
      this.fileName = true;   
    }

    selectIssueType(category:any){
      if(category)
      {
        // this.issueTypeDisable=true
      }
    } 

    selectIssue(issuetype:any){
      if(issuetype){
        this.raisAlarm.controls['issue'].enable();
      }
    }

    getNcuBcuID(data:any) {
      let plantsData: any = [];
      plantsData = jsonata("data[*]").evaluate(data);
      this.plantId = '' 
      let newData = Array.isArray(plantsData) ? plantsData : [plantsData];
      
      newData.forEach(element => {
         if (this.plantId == undefined || this.plantId == null || this.plantId == '') {
            this.plantList.push({
            name: element.name,
            id: element.id
          })
          }
      });
  
      let NcuData: any = []
      NcuData = jsonata("data[*].knu").evaluate(data);
      this.ncuId = ''
      NcuData.forEach(element => {
        if (this.ncuId == undefined || this.ncuId == null || this.ncuId == '') {
          this.ncuList.push({
            name: element.name,
            id: element.id
          })
        }
      });
      let bcuData: any = []
      bcuData = jsonata("data[*].knu[*].status[*].bot").evaluate(data);
      this.bcuId = ''
      bcuData.forEach(element => {
        if (this.bcuId == undefined || this.bcuId == null || this.bcuId == '') {
          this.bcuList.push({
            name: element.name,
            id: element.id
          })
        }
      });
  
    }
  
    selectPlantId(value: any) {
      if(value){ 
        this.ncuDisable = true
       }
      this.ncuList = []
      let arrayData: any = []
      let plantlistid: any = []
      let plantPredicateQuery = '*';
        plantlistid.push("id=" + "'" + value + "'"); 
    /*   if (plantlistid.length > 0) {
        plantPredicateQuery = plantlistid.join(" or ");
      } */
      arrayData = jsonata("data[" + plantlistid + "].knu").evaluate(this.NcuBcuJsonId)
      this.ncuId = ''
      arrayData.forEach(element => {
        if (this.ncuId == undefined || this.ncuId == null || this.ncuId == '') {
          this.ncuList.push({
            name: element.name,
            id: element.id
          })
        }
      });
    }
  
    selectNcuId(value: any) {
      // if(value){
      //   this.raisAlarm.controls['tableId'].enable()
      //    this.tableDisable = true
      //   } 

      this.bcuList = []
      let arrayData: any = []
      let knulistid: any = []
      let knuPredicateQuery = '*';
  /*     value.forEach(id => {
        knulistid.push("id=" + "'" + id + "'");
      }) */
      knulistid.push("id=" + "'" + value + "'"); 

      if (knulistid.length > 0) {
        knuPredicateQuery = knulistid.join(" or ");
      }
      arrayData = jsonata("data[*].knu[" + knuPredicateQuery + "].status[*].bot").evaluate(this.NcuBcuJsonId)
      this.bcuId = ''
      arrayData.forEach(element => {
        if (this.bcuId == undefined || this.bcuId == null || this.bcuId == '') {
          this.bcuList.push({
            name: element.name,
            id: element.id
          })
        }
      });
    }
}